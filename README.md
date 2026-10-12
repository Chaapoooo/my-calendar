# My Calendar

Une webapp de calendrier personnel, actuellement en cours de développement. Le projet utilise Vite et TypeScript ; les données restent locales, sans compte ni synchronisation.

## Démarrer en développement

Prérequis : Node.js et npm.

```sh
npm install
npm run dev
```

Ouvre dans ton navigateur l’adresse locale affichée par Vite. Le serveur actualise la page lors de l’enregistrement des fichiers.

## Vérifier la version de production

```sh
npm run build
```

Les fichiers générés sont placés dans `dist/`.

## Structure

```text
index.html
src/
  main.ts          # Point d’entrée et structure de la page
  style.css        # Mise en page et styles
  assets/
    calendar.ts    # Fonctions liées au calendrier
```