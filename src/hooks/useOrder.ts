import { useState } from 'react';
import toast from 'react-hot-toast';
import { Burger, BasketItem } from '../types';
import { BURGER_DATA } from '../constants/burgers';
import { useLocalStorage } from './useLocalStorage';

export const useOrder = () => {
  const [isActiveBtn, setIsActiveBtn] = useState<boolean>(false);
  const [burgers, setBurgers] = useLocalStorage<Burger[]>('crazy-burger-menu', BURGER_DATA);
  const [basket, setBasket] = useLocalStorage<BasketItem[]>('crazy-burger-cart', []);

  const handleAddBurger = (newBurger: Burger) => {
    setBurgers(prev => [...prev, newBurger]);
  };

  const addToBasket = (burger: Burger) => {
    setBasket(prev => {
      const existingItem = prev.find(item => item.id === burger.id);

      if (existingItem) {
        // Si le burger existe déjà, augmenter la quantité
        return prev.map(item =>
          item.id === burger.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Sinon, ajouter un nouvel item avec quantité 1
        const newBasketItem: BasketItem = {
          ...burger,
          quantity: 1,
          addedAt: new Date().toISOString(),
        };
        return [...prev, newBasketItem];
      }
    });
    toast.success(`${burger.title} ajouté au panier !`);
  };

  const removeFromBasket = (id: number) => {
    const item = basket.find(b => b.id === id);
    setBasket(prev => prev.filter(item => item.id !== id));
    if (item) {
      toast.success(`${item.title} retiré du panier`);
    }
  };

  const updateBasketItemQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromBasket(id);
      return;
    }

    setBasket(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearBasket = () => {
    setBasket([]);
    toast.success('Panier vidé !');
  };

  const removeBurger = (id: number) => {
    const burger = burgers.find(b => b.id === id);
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${burger?.title}" ?`)) {
      setBurgers(prev => prev.filter(burger => burger.id !== id));
      toast.success(`${burger?.title} supprimé du menu`);
    }
  };

  const updateBurger = (updatedBurger: Burger) => {
    setBurgers(prev =>
      prev.map(burger =>
        burger.id === updatedBurger.id ? updatedBurger : burger
      )
    );
    toast.success(`${updatedBurger.title} modifié avec succès !`);
  };

  return {
    isActiveBtn,
    setIsActiveBtn,
    burgers,
    setBurgers,
    handleAddBurger,
    basket,
    addToBasket,
    removeFromBasket,
    updateBasketItemQuantity,
    clearBasket,
    removeBurger,
    updateBurger,
  };
};