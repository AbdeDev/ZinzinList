# Zinzin list 

Un **dashboard** permettant d'afficher une liste d'utilisateurs avec un **scroll infini**, **une recherche dynamique** et **la suppression des utilisateurs**.

## 🚀 Fonctionnalités

✔️ **Affichage des utilisateurs via une API externe** (`randomuser.me`)  
✔️ **Scroll infini** pour charger automatiquement les utilisateurs  
✔️ **Recherche dynamique** pour filtrer les utilisateurs  
✔️ **Suppression d’un utilisateur en temps réel**  
✔️ **Optimisation des performances et des requêtes avec React Query**  
✔️ **Design épuré et minimaliste en noir & blanc**  

---

## 📦 **Technologies utilisées**

- **React**
- **Tailwind CSS + shadcn/ui**
- **React Query (Tanstack Query)** (gestion des requêtes API)
- **Framer Motion** (animations)
- **React Intersection Observer** (scroll infini)

---

## 🔧 **Installation et lancement**

### **1️⃣ Cloner le projet**
```sh 
git clone https://github.com/AbdeDev/ZinzinList.git
cd zinzin-list
```

### **2️⃣ Installer les dépendances**
```sh 
pnpm install
```

### **3️⃣ Lancer le projet en mode développement**
```sh
pnpm run dev ou pnpm dev
Le projet sera disponible sur http://localhost:5173 (ou un autre port si déjà occupé).
```
```sh
🔗 Structure du projet
📂 src
 ┣ 📂 components
 ┃ ┣ 📜 UserList.tsx     # Liste des utilisateurs avec scroll infini
 ┃ ┣ 📜 UserCard.tsx     # Carte d’un utilisateur
 ┃ ┣ 📜 UI/              # Composants réutilisables de shadcn/ui (boutons, input...)
 ┣ 📂 types
 ┃ ┣ 📜 user.ts          # Définition du type User
 ┣ 📂 hooks
 ┃ ┣ 📜 useUsers.ts      # Gestion des appels API avec React Query
 ┣ 📜 main.tsx           # Point d’entrée de l’application
 ┣ 📜 App.tsx            # Composant principal de l’application
 ┣ 📜 index.html         # Template HTML
 ┣ 📜 vite.config.ts     # Configuration Vite
 ┣ 📜 tailwind.config.js # Configuration Tailwind
 ┣ 📜 tsconfig.json      # Configuration TypeScript
 ┣ 📜 package.json       # Dépendances et scripts
 ┣ 📜 README.md          # Documentation
```
```sh
🔄 Explication des fonctionnalités
🎯 Scroll Infini
Utilisation de react-intersection-observer
Chargement automatique lorsque l’utilisateur atteint le bas de la liste
🔍 Recherche en temps réel
Filtrage instantané via un useState()
Mise à jour automatique sans rechargement
❌ Suppression d’un utilisateur
Mise à jour immédiate du cache avec React Query
Pas besoin de re-fetch, les données restent synchronisées
```
```sh
🏆 Crédits
Projet réalisé par @abdramane Diarra (AbdeDev). 🚀
```


