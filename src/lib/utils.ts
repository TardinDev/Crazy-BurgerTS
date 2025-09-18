import { Burger } from '../types';

export const formatPrice = (price: number): string => {
  return `${price.toFixed(2)}€`;
};

export const generateId = (): number => {
  return Date.now() + Math.random() * 1000;
};

export const validateBurger = (burger: Partial<Burger>): boolean => {
  return !!(
    burger.title?.trim() &&
    burger.image?.trim() &&
    burger.price &&
    burger.price > 0
  );
};

export const filterBurgers = (burgers: Burger[], searchTerm: string): Burger[] => {
  return burgers.filter(burger =>
    burger.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};