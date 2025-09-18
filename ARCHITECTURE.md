# Architecture React - Crazy Burger TS

## 🏛️ Principes Architecturaux

### 1. **Séparation des Responsabilités**
- **Composants** : Logique de présentation uniquement
- **Hooks** : Logique métier réutilisable
- **Context** : Gestion d'état globale
- **Utils** : Fonctions utilitaires pures

### 2. **Philosophie React Respectée**

#### ✅ **Composition over Inheritance**
```tsx
// ✅ Bon - Composition
<Layout>
  <HeaderOrder />
  <Menu />
</Layout>

// ❌ Évité - Héritage
class OrderPage extends BasePage
```

#### ✅ **Unidirectional Data Flow**
```tsx
// State remonte, actions descendent
const { formData, updateField } = useBurgerForm();
<Input value={formData.name} onChange={(value) => updateField('name', value)} />
```

#### ✅ **Single Responsibility Principle**
```tsx
// Chaque composant a une seule responsabilité
const OrderPage = () => <Layout><HeaderOrder /><Menu /></Layout>;
const HeaderOrder = ({ inputName }) => <Header>{inputName}</Header>;
```

### 3. **Patterns Utilisés**

#### **Custom Hooks Pattern**
```tsx
// Encapsulation de la logique métier
const useBurgerForm = () => {
  const [formData, setFormData] = useState();
  const submitBurger = () => { /* logique */ };
  return { formData, submitBurger };
};
```

#### **Provider Pattern**
```tsx
// Contexte global au niveau app
<OrderProvider>
  <App />
</OrderProvider>
```

#### **Compound Components**
```tsx
// Composants composés flexibles
<Input
  icon={<FaBurger />}
  placeholder="Burger name"
  onChange={handleChange}
/>
```

#### **Error Boundary Pattern**
```tsx
// Gestion globale des erreurs
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

## 📁 Structure des Dossiers

```
src/
├── components/
│   ├── Layout/          # Composants de mise en page
│   ├── LoginPage/       # Page de connexion
│   ├── OrderPage/       # Page de commande
│   └── Reusable-ui/     # Composants UI réutilisables
├── context/             # Context API + Providers
├── hooks/               # Custom hooks (logique métier)
├── types/               # Types TypeScript
├── constants/           # Données statiques
└── lib/                 # Utilitaires purs
```

## 🔄 Flow de Données

```
OrderProvider (État global)
     ↓
OrderPage (Container)
     ↓
Menu (Présentation)
     ↓
useBurgerForm (Logique métier)
     ↓
TabContain (Composant contrôlé)
```

## 🎯 Bonnes Pratiques Appliquées

### **1. Composants Fonctionnels**
- Utilisation exclusive des function components
- Hooks pour la gestion d'état
- Props typées avec TypeScript

### **2. État Local vs Global**
- État local : Formulaires, UI temporaire
- État global : Données partagées (burgers, panier)

### **3. Performance**
- Composants purs (mémoization implicite)
- Éviter les re-renders inutiles
- Hooks optimisés

### **4. Testabilité**
- Logique métier séparée dans les hooks
- Composants purs faciles à tester
- Props explicites

## 🚀 Extensibilité

L'architecture permet facilement :
- ✅ Ajouter de nouveaux composants
- ✅ Créer de nouveaux hooks métier
- ✅ Étendre le contexte global
- ✅ Intégrer de nouvelles pages
- ✅ Modifier le styling sans impact fonctionnel