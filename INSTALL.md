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

## Structure du projet