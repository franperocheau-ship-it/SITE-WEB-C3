/* ─────────────────────────────────────────────────────────────────────────────
   jogging-print.js — Générateur du support de premier jet imprimable
   (Phase 2bis, §5.5). Remplace entièrement la zone de reformulation
   numérique de la Phase 2 initiale.

   Construit le DOM imprimable (page 1 : résultats + texte en réglure Seyès
   avec une ligne vide réglée entre chaque ligne de texte, pour la
   correction manuscrite intercalée ; page 2 : consigne, grille
   d'évaluation LSU, réglure pour la recopie manuscrite du 2ème jet) et
   déclenche window.print(), même mécanique que le bilan PDF / carnet
   d'auteur (racine cachée à l'écran, basculée en display:block via une
   classe sur <body>, cf. css/jogging-print.css).

   Utilisé par jogging.html (js/jogging-engine.js), dashboard-eleve.html
   (js/jogging-student-space.js) et synthese-joggings-enseignant.html —
   toujours à partir d'un objet de données déjà résolu par l'appelant
   (aucune lecture Supabase ici, ce module ne fait que du rendu).

   Génération individuelle uniquement (§5.5) ; l'impression groupée pour
   une classe entière (§5.9, Phase 2ter) n'est pas dans ce périmètre.
   ───────────────────────────────────────────────────────────────────────────── */

const JoggingPrint = (() => {
  const ALL_CODES = ['C', 'H', 'A', 'M', 'P', 'I', 'O', 'N', 'S'];
  const FEU_PICTO = { vert: '✔', orange: '~', rouge: '✖', blanc: '–' };
  const LOGO_SRC = 'assets/proficiamuspetit.png?v=9';

  // Intitulés raccourcis pour tenir sur une seule ligne dans un tableau
  // compact (§ tableau ≤ 1/4 de la page) — sens inchangé, cf. procédure
  // de test pour la version complète de chaque critère.
  const EVAL_CRITERES = [
    'Respect de la consigne et du sujet',
    'Cohérence et organisation',
    'Richesse du vocabulaire',
    'Correction de la langue',
    'Orthographe',
    'Ponctuation',
    'Soin et lisibilité'
  ];
  // Wording officiel LSU (livret scolaire unique), de gauche à droite.
  const EVAL_NIVEAUX = ['Maîtrise insuffisante', 'Maîtrise fragile', 'Maîtrise satisfaisante', 'Très bonne maîtrise'];
  const SEYES_LINE_COUNT = 14;

  // Géométrie de la zone de texte en réglure Seyès (page 1), à tenir en
  // phase avec .jpr-seyes-text dans css/jogging-print.css : largeur de page
  // A4 (210mm) moins les marges @page (15mm × 2), moins le padding gauche
  // du bloc réglé (la marge rouge n'a plus de décalage propre depuis
  // l'alignement sur la tuile C — point 6), moins une marge droite de
  // sécurité.
  const SEYES_TEXT_FONT = "14pt 'Nunito Sans', system-ui, sans-serif";
  const SEYES_TEXT_WIDTH_MM = 210 - 15 - 15 - 4 - 3;
  const MM_TO_PX = 96 / 25.4;

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function feuxRowHtml(feux) {
    return ALL_CODES.map(code => {
      const state = feux ? (feux[code] || 'blanc') : 'blanc';
      return `
        <div class="jpr-feu jpr-feu--${state}">
          <span class="jpr-feu-letter">${code}</span>
          <span class="jpr-feu-icon">${FEU_PICTO[state]}</span>
        </div>`;
    }).join('');
  }

  /* Découpe <text> en lignes qui tiennent dans <maxWidthPx>, mesurées avec
     la police réellement utilisée à l'impression (canvas 2D, plus fiable
     qu'une estimation au nombre de caractères). Les retours à la ligne
     tapés par l'élève sont respectés comme coupures forcées. */
  function wrapTextToLines(text, maxWidthPx, font) {
    let ctx = wrapTextToLines._ctx;
    if (!ctx) {
      ctx = document.createElement('canvas').getContext('2d');
      wrapTextToLines._ctx = ctx;
    }
    ctx.font = font;

    const lines = [];
    text.split('\n').forEach(paragraph => {
      const words = paragraph.split(/\s+/).filter(Boolean);
      if (words.length === 0) { lines.push(''); return; }
      let current = '';
      words.forEach(word => {
        const candidate = current ? current + ' ' + word : word;
        if (current && ctx.measureText(candidate).width > maxWidthPx) {
          lines.push(current);
          current = word;
        } else {
          current = candidate;
        }
      });
      if (current) lines.push(current);
    });
    return lines;
  }

  /* Alternance ligne de texte / ligne vide réglée : l'espace entre deux
     lignes de texte est une ligne Seyès entièrement vierge, où
     l'enseignant corrige à la main directement au-dessus de la ligne
     concernée (§5.5, corrigé suite retour visuel papier). */
  function seyesTextHtml(text) {
    const maxWidthPx = SEYES_TEXT_WIDTH_MM * MM_TO_PX;
    const lines = wrapTextToLines(text, maxWidthPx, SEYES_TEXT_FONT);
    return lines.map(line => `
        <div class="jpr-seyes-text-line">${escapeHtml(line)}</div>
        <div class="jpr-seyes-blank-line"></div>`).join('');
  }

  function evalGridHtml() {
    const headerCells = EVAL_NIVEAUX.map(n => `<th>${escapeHtml(n)}</th>`).join('');
    const rows = EVAL_CRITERES.map(label => `
        <tr>
          <td class="jpr-eval-label-cell">${escapeHtml(label)}</td>
          ${EVAL_NIVEAUX.map(() => `<td class="jpr-eval-box-cell"><span class="jpr-eval-box"></span></td>`).join('')}
        </tr>`).join('');
    return `
      <table class="jpr-eval-table">
        <thead><tr><th></th>${headerCells}</tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  }

  function seyesLinesHtml() {
    let html = '';
    for (let i = 0; i < SEYES_LINE_COUNT; i++) html += '<div class="jpr-seyes-line"></div>';
    return html;
  }

  /* data : { studentName, joggingTitle, consigne, text, feux }
     breakBeforeFirstPage : force un saut de page avant la page 1 — utilisé
     par generateBatch() pour séparer les élèves entre eux (§5.9), jamais
     nécessaire pour le tout premier élève de l'impression. */
  function buildSheetHtml(data, breakBeforeFirstPage) {
    const firstPageBreakCls = breakBeforeFirstPage ? ' jpr-page-break' : '';
    return `
      <div class="jpr-page${firstPageBreakCls}">
        <div class="jpr-header">
          <div>
            <img src="${LOGO_SRC}" alt="Proficiamus" class="jpr-logo">
            <div class="jpr-header-sub">Premier jet — ${escapeHtml(data.joggingTitle)}</div>
          </div>
          <div class="jpr-header-name">${escapeHtml(data.studentName)}</div>
        </div>
        <div class="jpr-feux-row">${feuxRowHtml(data.feux)}</div>
        <div class="jpr-seyes-text">${seyesTextHtml(data.text)}</div>
        <div class="jpr-comment-space"></div>
      </div>

      <div class="jpr-page jpr-page-break">
        <div class="jpr-header">
          <div>
            <img src="${LOGO_SRC}" alt="Proficiamus" class="jpr-logo">
            <div class="jpr-header-sub">2ème jet</div>
          </div>
          <div class="jpr-header-name">${escapeHtml(data.studentName)}</div>
        </div>
        <div class="jpr-consigne"><strong>Consigne :</strong> ${escapeHtml(data.consigne)}</div>
        ${evalGridHtml()}
        <div class="jpr-seyes">${seyesLinesHtml()}</div>
      </div>`;
  }

  /* data : { studentName, joggingTitle, consigne, text, feux } */
  function generate(data) {
    const root = document.getElementById('jog-print-root');
    if (!root || !data || !data.text) return;

    root.innerHTML = buildSheetHtml(data, false);
    document.body.classList.add('printing-jog-premier-jet');
    window.print();
    document.body.classList.remove('printing-jog-premier-jet');
  }

  /* dataList : [{ studentName, joggingTitle, consigne, text, feux }, ...],
     déjà triée par l'appelant (display_name, §5.9). Impression groupée
     pour une classe entière (Phase 2ter) : un seul fichier PDF, un élève
     après l'autre, saut de page entre chacun — réutilise buildSheetHtml()
     ci-dessus (même construction que l'impression individuelle), jamais
     dupliquée. */
  function generateBatch(dataList) {
    const root = document.getElementById('jog-print-root');
    if (!root || !dataList || dataList.length === 0) return;

    root.innerHTML = dataList
      .map((data, i) => buildSheetHtml(data, i > 0))
      .join('');
    document.body.classList.add('printing-jog-premier-jet');
    window.print();
    document.body.classList.remove('printing-jog-premier-jet');
  }

  return { generate, generateBatch };
})();
