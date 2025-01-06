import { createContext } from "react";

type Burger = {
  id: number;
  title: string;
  image: string;
  price: number;

};

// Définition du type du contexte
type orderContextType = {
  isActiveBtn: boolean;
  setIsActiveBtn: (value: boolean) => void;
  burgers: Burger[]; // Déclare burgers comme un tableau de Burger
  setBurgers: React.Dispatch<React.SetStateAction<Burger[]>>; // Ajout de setBurgers
  handleAddBurger: (newBurger: Burger) => void;
  basket: Burger[]; // Ajout de l'état du panier
  addToBasket: (burger: Burger) => void; // Fonction pour ajouter un burger au panier
  removeFromBasket: (id: number) => void; // Fonction pour supprimer un burger du panier

};

// Création du contexte avec des valeurs par défaut
const orderContext = createContext<orderContextType>({
  isActiveBtn: false,
  setIsActiveBtn: () => {},
  burgers: [], // Initialisation par défaut de burgers avec un tableau vide
  setBurgers: () => {}, // Ajout de setBurgers avec une fonction par défaut
  handleAddBurger: () => {},
  basket: [], // Initialisation par défaut
  addToBasket: () => {},
  removeFromBasket: () => {}, // Ajout de la fonction par défaut

});

export default orderContext;
