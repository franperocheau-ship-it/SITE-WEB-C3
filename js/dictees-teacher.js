/* ─────────────────────────────────────────────────────────────────────────────
   dictees-teacher.js — Accès aux données du module Dictées préparées côté
   enseignant. Dépend de : supabase-client.js (window.lfmDb), js/utils.js
   (sortByTitleNumber).

   Utilisé par dictees-enseignant.html. Pas d'Edge Function : les
   lectures/écritures passent directement par le SDK Supabase, protégées par
   RLS (voir supabase/migrations/20260726120000_dictees.sql).
   ───────────────────────────────────────────────────────────────────────────── */

const lfmDicteesTeacher = (() => {
  const db = window.lfmDb;

  /* Liste des dictées assignées à une classe (via dictee_classes, cf.
     migration 20260924100000 — une dictée peut désormais être distribuée à
     plusieurs classes), avec le nombre de mots (pour l'affichage de la carte
     enseignant) — pas les mots eux-mêmes, chargés à la demande à l'ouverture
     du formulaire d'édition — et `class_ids` : TOUTES les classes assignées
     à chaque dictée (pas seulement `classId`), pour les pastilles de la
     liste enseignante. */
  async function getClassDictees(classId) {
    const { data: links, error: linkErr } = await db.from('dictee_classes')
      .select('dictee_id').eq('class_id', classId);
    if (linkErr) throw linkErr;
    const ids = [...new Set((links || []).map(l => l.dictee_id))];
    if (ids.length === 0) return [];

    const { data: dictees, error } = await db.from('dictees').select('*')
      .in('id', ids)
      .order('created_at', { ascending: false });
    if (error) throw error;

    const [motsRes, allLinksRes] = await Promise.all([
      db.from('dictee_mots').select('dictee_id').in('dictee_id', ids),
      db.from('dictee_classes').select('dictee_id, class_id').in('dictee_id', ids)
    ]);
    if (motsRes.error) throw motsRes.error;
    if (allLinksRes.error) throw allLinksRes.error;

    const countMap = {};
    (motsRes.data || []).forEach(m => { countMap[m.dictee_id] = (countMap[m.dictee_id] || 0) + 1; });

    const classIdsByDictee = {};
    (allLinksRes.data || []).forEach(l => {
      (classIdsByDictee[l.dictee_id] = classIdsByDictee[l.dictee_id] || []).push(l.class_id);
    });

    const withCounts = (dictees || []).map(d => ({
      ...d,
      mot_count: countMap[d.id] || 0,
      class_ids: classIdsByDictee[d.id] || []
    }));
    return sortByTitleNumber(withCounts);
  }

  /* Dictée complète (pour édition), avec ses mots triés par ordre, ainsi que
     les 4 collections du volet Orthographe grammaticale (§2 du cahier des
     charges) — chargées en parallèle, aucune n'est requise (une dictée peut
     n'avoir aucun exercice grammatical). Texte à trous et trous de
     conjugaison sont deux exercices indépendants depuis la migration
     20260908100000 (tables séparées, comme transformation/classification),
     même si leur mécanique de saisie (clic sur un mot de la phrase) reste
     très proche côté formulaire. */
  async function getDictee(dicteeId) {
    const { data: dictee, error } = await db.from('dictees').select('*')
      .eq('id', dicteeId).single();
    if (error) throw error;

    const { data: classLinks, error: classErr } = await db.from('dictee_classes')
      .select('class_id').eq('dictee_id', dicteeId);
    if (classErr) throw classErr;
    dictee.class_ids = (classLinks || []).map(l => l.class_id);

    const { data: mots, error: motsErr } = await db.from('dictee_mots').select('*')
      .eq('dictee_id', dicteeId).order('ordre', { ascending: true });
    if (motsErr) throw motsErr;

    const [trous, trousConjugaison, transformations, extraMots] = await Promise.all([
      getTrous(dicteeId),
      getTrousConjugaison(dicteeId),
      getTransformations(dicteeId),
      getGramExtraMots(dicteeId)
    ]);

    return { dictee, mots: mots || [], trous, trousConjugaison, transformations, extraMots };
  }

  /**
   * Crée une dictée et ses mots/exercices grammaticaux en une opération.
   * `classIds` : classes destinataires (dictee_classes, cf. migration
   * 20260924100000 — une dictée peut être distribuée à plusieurs classes ;
   * non vide, validé côté formulaire). `mots` : [{ contenu, niveau,
   * nature_grammaticale }] — l'ordre est déduit de la position dans le
   * tableau (correspond à l'ordre de saisie dans la zone de texte).
   * `trous`/`transformations`/`extraMots` : voir §2/§1 des fonctions
   * replaceX ci-dessous. `inclutLexicale`/`inclutGrammaticale` : volets
   * proposés à l'élève pour cette dictée (colonnes `dictees.inclut_lexicale`/
   * `inclut_grammaticale`, défaut true en base — validé côté formulaire
   * pour qu'au moins l'un des deux reste actif). `emoji` : illustration de
   * la carte (dictees-catalogue.html/dictees-enseignant.html), choisie dans
   * une palette fixe côté formulaire — colonne `dictees.emoji`, défaut 📖 en
   * base (cf. supabase/migrations/20260910100000_dictees_emoji.sql).
   *
   * Ne touche plus `points_grammaticaux` (champ retiré de l'interface —
   * présentation jugée trop dense pour son utilité, retour utilisateur) :
   * la colonne existe toujours en base et d'éventuelles valeurs antérieures
   * sont conservées telles quelles, mais plus jamais lues/écrites/affichées
   * par le client (voir aussi dictees-catalogue.html, épuré de même).
   *
   * `dictees.class_id` (mono-classe, hérité du modèle précédent) n'est plus
   * écrit ici : reste NULL pour toute dictée créée depuis cette migration,
   * dictee_classes étant désormais la seule source de vérité pour la
   * visibilité élève (voir aussi getOrphanDictees/reassignDictee plus bas).
   */
  async function createDictee(classIds, teacherId, titre, emoji, mots, trous, trousConjugaison, transformations, extraMots, inclutLexicale, inclutGrammaticale) {
    const { data: dictee, error } = await db.from('dictees').insert({
      teacher_id: teacherId,
      titre: titre.trim(),
      emoji: emoji || '📖',
      inclut_lexicale: inclutLexicale,
      inclut_grammaticale: inclutGrammaticale
    }).select().single();
    if (error) throw error;

    await Promise.all([
      replaceDicteeClasses(dictee.id, classIds),
      replaceMots(dictee.id, mots),
      replaceTrous(dictee.id, trous),
      replaceTrousConjugaison(dictee.id, trousConjugaison),
      replaceTransformations(dictee.id, transformations),
      replaceGramExtraMots(dictee.id, extraMots)
    ]);
    return dictee;
  }

  async function updateDictee(dicteeId, classIds, titre, emoji, mots, trous, trousConjugaison, transformations, extraMots, inclutLexicale, inclutGrammaticale) {
    const { error } = await db.from('dictees').update({
      titre: titre.trim(),
      emoji: emoji || '📖',
      inclut_lexicale: inclutLexicale,
      inclut_grammaticale: inclutGrammaticale,
      updated_at: new Date().toISOString()
    }).eq('id', dicteeId);
    if (error) throw error;

    await Promise.all([
      replaceDicteeClasses(dicteeId, classIds),
      replaceMots(dicteeId, mots),
      replaceTrous(dicteeId, trous),
      replaceTrousConjugaison(dicteeId, trousConjugaison),
      replaceTransformations(dicteeId, transformations),
      replaceGramExtraMots(dicteeId, extraMots)
    ]);
  }

  /* Remplace intégralement les classes destinataires d'une dictée (même
     patron delete-then-reinsert que replaceMots) — le formulaire enseignant
     ressaisit l'ensemble des cases cochées à chaque enregistrement. */
  async function replaceDicteeClasses(dicteeId, classIds) {
    const { error: delErr } = await db.from('dictee_classes').delete().eq('dictee_id', dicteeId);
    if (delErr) throw delErr;

    if (!classIds || classIds.length === 0) return;
    const rows = classIds.map(classId => ({ dictee_id: dicteeId, class_id: classId }));
    const { error: insErr } = await db.from('dictee_classes').insert(rows);
    if (insErr) throw insErr;
  }

  /* Remplace intégralement la liste des mots d'une dictée (le formulaire
     enseignant ressaisit la liste entière à chaque modification — plus
     simple et plus sûr qu'un diff fin, et cohérent avec la zone de texte
     unique en points-virgules côté saisie). `nature_grammaticale` est
     optionnel (volet classification, §3). */
  async function replaceMots(dicteeId, mots) {
    const { error: delErr } = await db.from('dictee_mots').delete().eq('dictee_id', dicteeId);
    if (delErr) throw delErr;

    if (!mots || mots.length === 0) return;
    const rows = mots.map((m, i) => ({
      dictee_id: dicteeId,
      contenu: m.contenu.trim(),
      niveau: m.niveau,
      nature_grammaticale: m.nature_grammaticale || null,
      ordre: i
    }));
    const { error: insErr } = await db.from('dictee_mots').insert(rows);
    if (insErr) throw insErr;
  }

  /* Texte à trous (§1) : une phrase par item, `tags` = mots sélectionnés dans
     cette phrase, chacun avec sa position (index dans phrase.split(/\s+/)) et
     sa réponse attendue — un seul mot attendu par trou, aucun indice de
     règle ni réponse alternative (exercice volontairement simplifié, voir
     js/dictees-engine.js/validateTrou pour la correction tolérante côté
     élève). Même delete-then-reinsert que replaceMots ; le delete sur
     dictee_trous cascade sur dictee_trous_mots. */
  async function replaceTrous(dicteeId, trous) {
    const { error: delErr } = await db.from('dictee_trous').delete().eq('dictee_id', dicteeId);
    if (delErr) throw delErr;

    if (!trous || trous.length === 0) return;

    const trouRows = trous.map((t, i) => ({
      dictee_id: dicteeId,
      phrase: t.phrase.trim(),
      niveau: t.niveau,
      ordre: i
    }));
    const { data: insertedTrous, error: insErr } = await db.from('dictee_trous').insert(trouRows).select();
    if (insErr) throw insErr;

    const motRows = [];
    insertedTrous.forEach((row, i) => {
      (trous[i].tags || []).forEach(tag => {
        motRows.push({
          trou_id: row.id,
          mot_attendu: tag.mot_attendu.trim(),
          position: tag.position
        });
      });
    });
    if (motRows.length > 0) {
      const { error: motsErr } = await db.from('dictee_trous_mots').insert(motRows);
      if (motsErr) throw motsErr;
    }
  }

  async function getTrous(dicteeId) {
    const { data, error } = await db.from('dictee_trous')
      .select('*, dictee_trous_mots(*)')
      .eq('dictee_id', dicteeId).order('ordre', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  /* Trous de conjugaison — exercice indépendant du texte à trous classique
     (scindé de celui-ci, cf. supabase/migrations/20260908100000), même forme
     de table (dictee_trous_conjugaison/dictee_trous_conjugaison_mots miroir
     de dictee_trous/dictee_trous_mots) sans discriminant `type` puisque
     toutes les phrases de cette table sont de la conjugaison par
     construction. `infinitif`/`temps` sont de simples métadonnées
     d'affichage (l'infinitif est montré en clair côté élève) ; `mot_attendu`
     reste la réponse unique, saisie par l'enseignant (pas de conjugueur
     automatique).

     `positionFin` (optionnel) : verbe pronominal ("se lève") où le pronom
     réfléchi et le verbe forment un seul trou sur 2 positions consécutives
     — cf. supabase/migrations/20260909100000. Absent/null pour un trou d'un
     seul mot (cas le plus courant, comportement inchangé). */
  async function replaceTrousConjugaison(dicteeId, trous) {
    const { error: delErr } = await db.from('dictee_trous_conjugaison').delete().eq('dictee_id', dicteeId);
    if (delErr) throw delErr;

    if (!trous || trous.length === 0) return;

    const trouRows = trous.map((t, i) => ({
      dictee_id: dicteeId,
      phrase: t.phrase.trim(),
      niveau: t.niveau,
      ordre: i
    }));
    const { data: insertedTrous, error: insErr } = await db.from('dictee_trous_conjugaison').insert(trouRows).select();
    if (insErr) throw insErr;

    const motRows = [];
    insertedTrous.forEach((row, i) => {
      (trous[i].tags || []).forEach(tag => {
        motRows.push({
          trou_id: row.id,
          mot_attendu: tag.mot_attendu.trim(),
          position: tag.position,
          position_fin: tag.positionFin != null ? tag.positionFin : null,
          infinitif: tag.infinitif.trim(),
          temps: tag.temps
        });
      });
    });
    if (motRows.length > 0) {
      const { error: motsErr } = await db.from('dictee_trous_conjugaison_mots').insert(motRows);
      if (motsErr) throw motsErr;
    }
  }

  async function getTrousConjugaison(dicteeId) {
    const { data, error } = await db.from('dictee_trous_conjugaison')
      .select('*, dictee_trous_conjugaison_mots(*)')
      .eq('dictee_id', dicteeId).order('ordre', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  /* Transformation de phrase (§2). */
  async function replaceTransformations(dicteeId, transformations) {
    const { error: delErr } = await db.from('dictee_transformations').delete().eq('dictee_id', dicteeId);
    if (delErr) throw delErr;

    if (!transformations || transformations.length === 0) return;
    const rows = transformations.map((t, i) => ({
      dictee_id: dicteeId,
      phrase_depart: t.phrase_depart.trim(),
      type_transformation: t.type_transformation,
      phrase_attendue: t.phrase_attendue.trim(),
      phrase_attendue_alt: t.phrase_attendue_alt || [],
      ordre: i
    }));
    const { error: insErr } = await db.from('dictee_transformations').insert(rows);
    if (insErr) throw insErr;
  }

  async function getTransformations(dicteeId) {
    const { data, error } = await db.from('dictee_transformations').select('*')
      .eq('dictee_id', dicteeId).order('ordre', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  /* Mots supplémentaires de classification (§3) — n'existent que pour cet
     exercice, jamais fusionnés dans dictee_mots. */
  async function replaceGramExtraMots(dicteeId, extraMots) {
    const { error: delErr } = await db.from('dictee_gram_extra_mots').delete().eq('dictee_id', dicteeId);
    if (delErr) throw delErr;

    if (!extraMots || extraMots.length === 0) return;
    const rows = extraMots.map((m, i) => ({
      dictee_id: dicteeId,
      contenu: m.contenu.trim(),
      nature_grammaticale: m.nature_grammaticale,
      ordre: i
    }));
    const { error: insErr } = await db.from('dictee_gram_extra_mots').insert(rows);
    if (insErr) throw insErr;
  }

  async function getGramExtraMots(dicteeId) {
    const { data, error } = await db.from('dictee_gram_extra_mots').select('*')
      .eq('dictee_id', dicteeId).order('ordre', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async function deleteDictee(dicteeId) {
    const { error } = await db.from('dictees').delete().eq('id', dicteeId);
    if (error) throw error;
  }

  /* Dictées orphelines (aucune ligne dans dictee_classes) — survivent à une
     suppression de fin d'année (voir 20260902100000_fin_annee_suppression.sql)
     quand la (ou les) classe(s) qui les portaient ont été supprimées
     (dictee_classes.class_id en ON DELETE CASCADE). Depuis la migration
     20260924100000 (distribution multi-classes), ce n'est plus
     `dictees.class_id IS NULL` qui définit une orpheline — cette colonne
     n'est plus jamais écrite — mais l'absence de toute ligne dans
     dictee_classes ; une dictée qui perd une classe parmi plusieurs reste
     visible via les autres, sans passer par ce flux. RLS scope déjà sur
     teacher_id = auth.uid(), inutile de le repasser en paramètre. */
  async function getOrphanDictees() {
    const { data: dictees, error } = await db.from('dictees')
      .select('id, titre, created_at')
      .order('created_at', { ascending: false });
    if (error) throw error;
    if (!dictees || dictees.length === 0) return [];

    const ids = dictees.map(d => d.id);
    const { data: links, error: linkErr } = await db.from('dictee_classes')
      .select('dictee_id').in('dictee_id', ids);
    if (linkErr) throw linkErr;
    const assigned = new Set((links || []).map(l => l.dictee_id));

    return sortByTitleNumber(dictees.filter(d => !assigned.has(d.id)));
  }

  async function reassignDictee(dicteeId, classId) {
    const { error } = await db.from('dictee_classes')
      .insert({ dictee_id: dicteeId, class_id: classId });
    if (error) throw error;
  }

  /* Ordre pédagogique (0 → 0.5 → 1), pas l'ordre numérique des codes
     exercice (1 reste la Dictée de mots pour compatibilité historique — 2
     est délibérément inutilisé, cf. js/dictees-engine.js). Partagé par
     resultats-dictees-enseignant.html pour libeller les pastilles lexicales. */
  const LEX_EXERCICES = [0, 3, 1];

  /**
   * Rapport de résultats de la classe — structure "une dictée → qui l'a
   * faite → avec quel résultat", calculée à la volée (pas de table
   * précalculée). Remplace l'ancien duo getClassDicteeStats/getClassGramStats
   * (moyennes globales + "mots les plus ratés" + "élèves à suivre" séparés,
   * jugé confus — retour utilisateur) par la vue simple à deux temps attendue
   * côté page : liste des dictées, puis au clic la liste des élèves avec
   * leurs résultats lexicaux (dictee_results, un par palier 0/0.5/1 tenté,
   * pastilles bleues) et grammatical par type (dictee_gram_results,
   * pastilles jaunes) — plus aucun agrégat de classe intermédiaire.
   *
   * `perDictee` ne contient QUE les dictées ayant au moins un résultat
   * (lexical OU grammatical), triées comme getClassDictees (created_at
   * desc). `students` : triés par nom, un élève par entrée dès qu'il a au
   * moins un résultat sur CETTE dictée ; `lexByExercice` = dernière
   * tentative par palier lexical (0/3/1, null si jamais tenté — retour
   * utilisateur : les 3 doivent s'afficher indépendamment, pas bloqués tant
   * que les 3 n'ont pas été faits) ; `gramByType` = dernière tentative par
   * type classification/trous/trous_conjugaison/transformation (null si
   * jamais tenté) — la page n'affiche une pastille que pour les
   * paliers/types réellement tentés ; `niveau` = niveau AFFICHÉ (1/2/3, null
   * si aucune session complète) de cet élève sur cette dictée — la ligne la
   * plus récente (dictee_results OU dictee_gram_results confondues) marquée
   * `session_complete = true` (posé côté client par js/dictees-engine.js/
   * isFullSessionComplete quand TOUS les exercices actifs de la dictée à ce
   * niveau sont terminés, cf. migration 20260914110000) — écrase une session
   * complète antérieure à un autre niveau, jamais cumulé ; une dictée
   * commencée mais pas terminée ne compte pour aucun niveau. Remplace
   * l'ancien calcul "dernière tentative GRAMMATICALE, tous types confondus"
   * (gramLatestByStudentDictee), qui ne marchait pas pour une dictée
   * purement lexicale et ne reflétait pas vraiment une session complète —
   * même correction que dashboard-eleve.html/DicteesStudentSpace
   * (completeSessionLatest là-bas). `freqLine` = retour "erreurs les
   * plus fréquentes" (js/dictees-word-stats.js) sur les tentatives
   * lexicales de CET élève pour CETTE dictée, fusionné aux wrong_items de
   * l'exercice "Texte à trous" (seul exercice grammatical à avoir un suivi
   * mot-par-mot, cf. migration 20260914100000 — classification/trous_
   * conjugaison/transformation restent hors périmètre), toutes tentatives
   * confondues (pas seulement la dernière — reflète la difficulté réelle du
   * mot pour lui), chaîne vide si aucune erreur. `perDictee[].avgMissed` =
   * nombre moyen de mots ratés par résultat lexical, tous élèves confondus,
   * pour CETTE dictée (null si aucun résultat lexical — ne compte pas les
   * wrong_items grammaticaux, cf. DicteesWordStats.averageMissedCount).
   */
  async function getClassDicteeReport(classId) {
    const dictees = await getClassDictees(classId);
    const students = await lfmTeacher.getStudents(classId);
    const authIds = students.map(s => s.auth_user_id).filter(Boolean);
    const dicteeIds = dictees.map(d => d.id);
    const studentById = new Map(students.map(s => [s.auth_user_id, s]));

    let lexResults = [], gramResults = [], mots = [];
    if (dicteeIds.length > 0 && authIds.length > 0) {
      const [lexRes, gramRes] = await Promise.all([
        db.from('dictee_results').select('*')
          .in('dictee_id', dicteeIds).in('student_id', authIds).limit(5000),
        db.from('dictee_gram_results').select('*')
          .in('dictee_id', dicteeIds).in('student_id', authIds).limit(5000)
      ]);
      if (lexRes.error) throw lexRes.error;
      if (gramRes.error) throw gramRes.error;
      lexResults = lexRes.data || [];
      gramResults = gramRes.data || [];
    }
    if (dicteeIds.length > 0) {
      const { data: motsData, error: motsErr } = await db.from('dictee_mots')
        .select('id, contenu').in('dictee_id', dicteeIds);
      if (motsErr) throw motsErr;
      mots = motsData || [];
    }
    const motById = new Map(mots.map(m => [m.id, m.contenu]));

    const TYPES = ['classification', 'trous', 'trous_conjugaison', 'transformation'];

    /* Dernière tentative par clé — un élève peut refaire un même exercice
       plusieurs fois, on n'affiche que la plus récente. */
    const lexLatest = new Map();
    lexResults.forEach(r => {
      const k = `${r.student_id}|${r.dictee_id}|${r.exercice}`;
      const prev = lexLatest.get(k);
      if (!prev || new Date(r.completed_at) > new Date(prev.completed_at)) lexLatest.set(k, r);
    });
    const gramLatest = new Map();
    gramResults.forEach(r => {
      const k = `${r.student_id}|${r.dictee_id}|${r.type}`;
      const prev = gramLatest.get(k);
      if (!prev || new Date(r.completed_at) > new Date(prev.completed_at)) gramLatest.set(k, r);
    });

    /* Session complète la plus récente par élève|dictée (lexical ET
       grammatical confondus) — source du niveau AFFICHÉ (une seule pastille
       par carte, cf. JSDoc ci-dessus), même logique que dashboard-eleve.html/
       DicteesStudentSpace (completeSessionLatest). */
    const completeSessionLatestByStudentDictee = new Map();
    [...lexResults, ...gramResults].forEach(r => {
      if (!r.session_complete || r.niveau == null) return;
      const k = `${r.student_id}|${r.dictee_id}`;
      const prev = completeSessionLatestByStudentDictee.get(k);
      if (!prev || new Date(r.completed_at) > new Date(prev.completed_at)) completeSessionLatestByStudentDictee.set(k, r);
    });

    const perDictee = dictees
      .map(d => {
        const dicteeLexResults = lexResults.filter(r => r.dictee_id === d.id);
        const studentIds = new Set([
          ...dicteeLexResults.map(r => r.student_id),
          ...gramResults.filter(r => r.dictee_id === d.id).map(r => r.student_id)
        ]);
        if (studentIds.size === 0) return null;

        const studentsList = [...studentIds].map(studentId => {
          const lexByExercice = {};
          LEX_EXERCICES.forEach(ex => {
            const r = lexLatest.get(`${studentId}|${d.id}|${ex}`);
            lexByExercice[ex] = r ? Math.round((r.score / r.total) * 100) : null;
          });
          const gramByType = {};
          TYPES.forEach(type => {
            const r = gramLatest.get(`${studentId}|${d.id}|${type}`);
            gramByType[type] = r ? Math.round((r.score / r.total) * 100) : null;
          });
          const studentLexResults = dicteeLexResults.filter(r => r.student_id === studentId);
          /* wrong_items ('trous' uniquement, cf. migration 20260914100000)
             fusionné aux mots lexicaux ratés — même élève, même dictée,
             toutes tentatives confondues comme studentLexResults ci-dessus. */
          const studentTrousResults = gramResults.filter(r => r.dictee_id === d.id && r.student_id === studentId && r.type === 'trous');
          const freqLine = DicteesWordStats.formatLine(DicteesWordStats.mergeTallies(
            DicteesWordStats.tally(studentLexResults, motById),
            DicteesWordStats.tallyText(studentTrousResults, 'wrong_items')
          ));
          const completeRow = completeSessionLatestByStudentDictee.get(`${studentId}|${d.id}`);
          const niveau = completeRow ? completeRow.niveau : null;
          return {
            student: studentById.get(studentId) || { display_name: 'Élève inconnu' },
            lexByExercice,
            gramByType,
            freqLine,
            niveau
          };
        }).sort((a, b) => a.student.display_name.localeCompare(b.student.display_name, 'fr'));

        return { id: d.id, titre: d.titre, students: studentsList, avgMissed: DicteesWordStats.averageMissedCount(dicteeLexResults) };
      })
      .filter(Boolean);

    return { perDictee };
  }

  return {
    getClassDictees, getDictee, createDictee, updateDictee, deleteDictee,
    getClassDicteeReport, getOrphanDictees, reassignDictee
  };
})();
