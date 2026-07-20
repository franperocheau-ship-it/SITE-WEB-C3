/* ─────────────────────────────────────────────────────────────────────────────
   jogging-class-settings.js — Personnalisation par classe + verrouillage en
   parcours guidé, côté élève (Phase 4, §5.8).

   Dépend de : supabase-client.js (window.lfmDb), js/guided-access.js
   (lfmGuidedAccess, pour classes.mode_acces — un élève n'a pas d'accès RLS
   direct à `classes`, voir js/guided-access.js et la migration Phase 4),
   js/jogging-data.js (JOGGING_DATA, JOGGING_LIST, TEMPS_IMPOSE_LABEL_BY_VALUE).

   Utilisé par redaction.html (catalogue) et jogging.html (écran d'un
   jogging). Repli permanent sur le catalogue statique + accès libre en cas
   d'erreur/absence de session (même philosophie que lfmGuidedAccess :
   jamais de blocage par défaut côté client — le blocage réel est de toute
   façon garanti côté RLS, voir is_jogging_locked_for_student()).
   ───────────────────────────────────────────────────────────────────────────── */

const JoggingClassSettings = (() => {
  let _cache = null; // { mode: 'libre'|'guide', settingsByJoggingId: Map }

  function applySettings(jog, row) {
    if (!row) return jog;
    const tempsLabel = row.temps_impose != null
      ? (TEMPS_IMPOSE_LABEL_BY_VALUE[row.temps_impose] || jog.tempsImpose)
      : jog.tempsImpose;
    return {
      ...jog,
      title: row.titre != null ? row.titre : jog.title,
      consigne: row.consigne != null ? row.consigne : jog.consigne,
      tempsImpose: tempsLabel,
      niveau: row.niveau != null ? row.niveau : jog.niveau,
      duree: row.duree_estimee != null ? row.duree_estimee : jog.duree,
      competence: row.competence != null ? row.competence : jog.competence
    };
  }

  function isLocked(mode, row) {
    return mode === 'guide' && !!(row && row.locked === true);
  }

  async function load() {
    if (_cache) return _cache;

    let mode = 'libre';
    try {
      if (typeof lfmGuidedAccess !== 'undefined') {
        const access = await lfmGuidedAccess.get();
        mode = access.mode;
      }
    } catch (e) {
      // repli 'libre' — voir en-tête
    }

    const settingsByJoggingId = new Map();
    try {
      if (window.lfmDb) {
        const { data } = await window.lfmDb.from('jogging_class_settings').select('*').limit(2000);
        (data || []).forEach(row => settingsByJoggingId.set(row.jogging_id, row));
      }
    } catch (e) {
      // repli : catalogue par défaut partout, rien de verrouillé
    }

    _cache = { mode, settingsByJoggingId };
    return _cache;
  }

  /** Jogging fusionné (perso appliquée) + état verrouillé, pour un id donné. */
  async function resolve(joggingId) {
    const base = (typeof JOGGING_DATA !== 'undefined') ? JOGGING_DATA[joggingId] : null;
    if (!base) return null;
    const { mode, settingsByJoggingId } = await load();
    const row = settingsByJoggingId.get(joggingId) || null;
    return { jogging: applySettings(base, row), locked: isLocked(mode, row) };
  }

  /** Liste complète (15) fusionnée + état verrouillé, pour redaction.html. */
  async function resolveAll() {
    const list = (typeof JOGGING_LIST !== 'undefined') ? JOGGING_LIST : [];
    const { mode, settingsByJoggingId } = await load();
    return list.map(jog => {
      const row = settingsByJoggingId.get(jog.id) || null;
      return { jogging: applySettings(jog, row), locked: isLocked(mode, row) };
    });
  }

  return { resolve, resolveAll };
})();
