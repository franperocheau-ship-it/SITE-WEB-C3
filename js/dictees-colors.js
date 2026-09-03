/* ─────────────────────────────────────────────────────────────────────────────
   dictees-colors.js — Couleur de pastille pour un point grammatical de dictée
   préparée (saisie libre enseignante, pas de liste figée).

   Une couleur est attribuée par hash déterministe du libellé (normalisé :
   minuscule, sans accents, espaces réduits) parmi une palette de 6 couleurs
   dérivées des tokens existants (styles.css / level-select.css) — un même
   libellé garde toujours la même couleur d'une dictée à l'autre, sans
   mapping manuel à entretenir.

   Repris par dictees-enseignant.html pour les pastilles de classes
   destinataires d'une dictée (dictee_classes, cf. migration 20260924100000)
   — même logique de couleur déterministe, appliquée au nom de la classe
   plutôt qu'à un point grammatical.
   ───────────────────────────────────────────────────────────────────────────── */

const DicteesColors = (() => {
  const PALETTE = [
    'var(--color-niveau-cm1)', // turquoise
    'var(--color-niveau-cm2)', // bleu
    'var(--color-brand-gold)',
    'var(--color-brand-navy)',
    'var(--ls-color-4)',      // terracotta
    'var(--ls-color-5)'       // violet
  ];

  function normalize(str) {
    return (str || '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ');
  }

  /* Hash simple (djb2-like) — suffisant ici : pas de garantie cryptographique
     nécessaire, seulement une répartition stable et déterministe. */
  function colorFor(label) {
    const s = normalize(label);
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
    return PALETTE[h % PALETTE.length];
  }

  return { colorFor };
})();
