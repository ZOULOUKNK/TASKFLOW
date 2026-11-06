# TaskFlow — Guide d'Installation

## Prérequis

- **Node.js** 20.19+ ou 22.12+ (exigé par Vite 8) → [nodejs.org](https://nodejs.org)
- **npm** v9+ (inclus avec Node.js)
- **Git** pour le versionnement

Vérifiez votre version : `node -v` et `npm -v`

## Installation & Lancement

```bash
# 1. Cloner le dépôt
git clone https://github.com/ZOULOUKNK/TASKFLOW.git
cd TASKFLOW

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

L'application est disponible sur **http://localhost:5173**

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement avec hot-reload |
| `npm run build` | Compile pour la production dans `dist/` |
| `npm run preview` | Prévisualise le build de production |
| `npm test` | Lance les tests (Vitest) |

## Structure du projet

```
TASKFLOW/
├── index.html              # Page HTML (police Inter)
├── vite.config.js          # Vite + React + Tailwind CSS 4 + config des tests
└── src/
    ├── main.jsx            # Point d'entrée React
    ├── App.jsx             # Mise en page, filtres, mode édition
    ├── index.css           # Import Tailwind, thème et styles de base
    ├── hooks/useTasks.js   # Tâches + sauvegarde dans localStorage
    └── components/         # Stats, TaskForm, FilterBar, TaskList
```

Les tâches sont enregistrées dans le navigateur (`localStorage`) : elles ne sont pas partagées entre appareils.
