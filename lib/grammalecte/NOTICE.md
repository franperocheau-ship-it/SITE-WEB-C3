# Grammalecte — provenance et modifications

**Moteur :** Grammalecte (correcteur grammatical français), par Olivier R.
**Site officiel :** https://grammalecte.net — licence **GPL 3.0** (voir `LICENSE.txt`).

## Origine exacte des fichiers de ce dossier

Le site officiel ne distribue plus de build JS autonome pour navigateur depuis
plusieurs années (seuls LibreOffice/OpenOffice, Thunderbird et un CLI/serveur
Python sont proposés au téléchargement ; l'ancien module Firefox lié depuis
grammalecte.net renvoie désormais vers une archive Wayback Machine — build
mort). Les fichiers ci-dessous proviennent donc du portage JS **maintenu par
Algoo** (`Grammalecte-by-algoo`), packagé pour l'extension de navigateur
Chrome, à jour du moteur Grammalecte **v2.3.1** :

> Source : https://github.com/algoo/grammalecte-packages
> Fichier : `chrome-grammalecte-fr-v2.3.1.zip`
> Récupéré le 19 juillet 2026.

Seuls les fichiers du **moteur de correction** (`graphspell/`, `fr/`,
`text.js`) ont été extraits de cette archive — rien de spécifique à
l'extension (manifest, background, panneaux, menus contextuels) n'a été
repris.

## Fichiers volontairement exclus

- `fr/textformatter.js`, `fr/conj_generator.js`, `fr/gc_test.txt`,
  `fr/tests_data.json` : non utilisés par `gc_engine.parse()`.
- `graphspell/_dictionaries/fr-classic.json` et `fr-reform.json` : seul
  `fr-allvars.json` est chargé par `gc_engine.js` (nom codé en dur dans le
  moteur, `dDefaultDictionaries` / `SpellChecker`) — les deux autres
  variantes ne sont jamais utilisées, inutile de les servir.
- `graphspell/dic_merger.js` : outil de build, sans usage à l'exécution.

## Fichiers modifiés

**Aucun fichier du moteur n'a été modifié.** `graphspell/*.js`, `fr/*.js`
(hors `gc-worker.js`) et `text.js` sont strictement identiques à l'archive
source.

## Fichier ajouté (pas un fichier d'origine)

`gc-worker.js` est **écrit pour ce projet**, pas un fichier Grammalecte
renommé. Il remplace le `gce_worker.js` de l'extension Chrome (qui gère des
dizaines de commandes liées au panneau de l'extension — conjugueur,
dictionnaire personnel, éditeur lexical — inutiles ici) par une version
réduite au strict nécessaire pour ce module : initialiser le moteur et
analyser un texte (grammaire + orthographe + suggestions), voir le
commentaire en tête de ce fichier.

## Mise à jour du moteur

Pour mettre à jour vers une version plus récente : télécharger la nouvelle
`chrome-grammalecte-fr-vX.Y.Z.zip` sur le dépôt algoo/grammalecte-packages,
répéter l'extraction ci-dessus, et mettre à jour `GRAMMALECTE_VERSION` dans
`gc-worker.js` (utilisé pour la colonne `grammalecte_version` en base,
§3.13 du cahier des charges).
