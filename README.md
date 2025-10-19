# 🍔 Crazy Burger TS

Application React TypeScript moderne pour la gestion de commandes de burgers avec interface administrateur et mode clair/sombre.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Fonctionnalités

### 🎨 Interface Utilisateur

- **Mode clair/sombre** : Basculez entre les thèmes avec un bouton toggle
- **Design responsive** : Interface adaptée à tous les écrans
- **Animations fluides** : Intégration de Framer Motion pour des transitions élégantes
- **Composants réutilisables** : Bibliothèque de composants UI personnalisés

### 🛒 Gestion des commandes

- **Panier interactif** : Ajout, modification et suppression de produits
- **Recherche de produits** : Barre de recherche pour filtrer les burgers
- **Résumé de commande** : Vue détaillée du panier avec calcul du total
- **Badges visuels** : Indicateurs pour les nouveautés et promotions

### 🔐 Administration

- **Panel d'administration** : Interface dédiée pour gérer les produits
- **CRUD complet** : Créer, lire, modifier et supprimer des burgers
- **Prévisualisation d'images** : Aperçu des images lors de l'ajout/modification
- **Système d'onglets** : Navigation intuitive dans le panel admin

### 🛡️ Qualité du code

- **TypeScript strict** : Typage complet pour une meilleure maintenabilité
- **Error Boundary** : Gestion d'erreurs avec composant de fallback
- **Hot Toast** : Notifications utilisateur pour les actions importantes
- **Skeleton loading** : États de chargement pour une meilleure UX

## 🏗️ Architecture

```text
src/
├── components/
│   ├── LoginPage/           # Authentification utilisateur
│   │   ├── LoginPage.tsx
│   │   └── Form.tsx
│   ├── OrderPage/           # Page principale de commande
│   │   ├── OrderPage.tsx
│   │   ├── HeaderOrder/     # En-tête avec profil
│   │   └── Menu/            # Menu et panier
│   │       ├── LeftSide/    # Panier et résumé
│   │       └── RightSide/   # Menu et admin
│   ├── Reusable-ui/         # Composants UI réutilisables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ...
│   └── Layout/              # Layout principal
├── context/                 # Context API
│   └── OrderProvider.tsx    # Gestion d'état globale
├── hooks/                   # Hooks personnalisés
├── types/                   # Définitions TypeScript
├── constants/               # Constantes et données
├── lib/                     # Utilitaires et helpers
└── assets/                  # Ressources statiques
```

## 🚀 Technologies

### Core

- **React 18** - Bibliothèque UI avec les dernières fonctionnalités
- **TypeScript 5.5** - Typage statique pour un code robuste
- **Vite** - Build tool ultra-rapide

### Styling & UI

- **Styled Components** - CSS-in-JS avec support du theming
- **Framer Motion** - Animations et transitions fluides
- **React Icons** - Bibliothèque d'icônes complète

### Routing & State

- **React Router DOM** - Navigation SPA
- **Context API** - Gestion d'état globale

### UX

- **React Hot Toast** - Notifications élégantes
- **Skeleton screens** - États de chargement

### Development

- **ESLint** - Linting du code
- **TypeScript ESLint** - Règles spécifiques TypeScript

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/TardinDev/Crazy-BurgerTS.git

# Naviguer dans le dossier
cd Crazy-BurgerTS

# Installer les dépendances
npm install
```

## 🎮 Scripts disponibles

```bash
# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la build de production
npm run preview

# Analyser le code avec ESLint
npm run lint
```

## 🎯 Bonnes Pratiques

### Architecture

- ✅ Architecture modulaire et scalable
- ✅ Séparation des responsabilités (UI, logique, données)
- ✅ Composants réutilisables et atomiques

### Code Quality

- ✅ Types TypeScript stricts
- ✅ Hooks personnalisés pour la logique métier
- ✅ Constantes centralisées
- ✅ Error handling complet

### Performance

- ✅ Lazy loading des composants
- ✅ Optimisation des re-renders
- ✅ Build optimisé avec Vite

### UX/UI

- ✅ Animations et transitions fluides
- ✅ Feedback visuel pour chaque action
- ✅ Design responsive et accessible

## 🎨 Thèmes

L'application supporte deux modes :

- **Mode clair** : Interface lumineuse et épurée
- **Mode sombre** : Interface sombre pour réduire la fatigue visuelle

Le mode est persisté dans le localStorage et bascule via le bouton toggle dans l'interface.

## 📝 Structure des données

### Product (Burger)

```typescript
interface Product {
  id: string;
  title: string;
  imageSource: string;
  price: number;
  isAvailable?: boolean;
  isAdvertised?: boolean;
  quantity?: number;
}
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

Ce projet est un projet éducatif.

## 👨‍💻 Auteur

**TardinDev** - [GitHub](https://github.com/TardinDev)

---

Fait avec ❤️ et TypeScript
