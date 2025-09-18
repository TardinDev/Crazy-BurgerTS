import { useState, useEffect } from 'react';
import { Burger } from '../types';
import { validateBurger } from '../lib/utils';

interface BurgerEditData {
  name: string;
  image: string;
  price: string;
}

export const useBurgerEdit = (
  selectedBurger: Burger | null,
  onSaveChanges: (updatedBurger: Burger) => void
) => {
  const [formData, setFormData] = useState<BurgerEditData>({
    name: '',
    image: '',
    price: '',
  });

  useEffect(() => {
    if (selectedBurger) {
      setFormData({
        name: selectedBurger.title,
        image: selectedBurger.image,
        price: selectedBurger.price.toString(),
      });
    }
  }, [selectedBurger]);

  const updateField = (field: keyof BurgerEditData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = validateBurger({
    title: formData.name,
    image: formData.image,
    price: Number(formData.price),
  });

  const saveChanges = () => {
    if (!isFormValid || !selectedBurger) {
      alert('Remplir d\'abord tous les champs');
      return;
    }

    const updatedBurger: Burger = {
      id: selectedBurger.id,
      title: formData.name,
      image: formData.image,
      price: Number(formData.price),
    };

    onSaveChanges(updatedBurger);
  };

  return {
    formData,
    updateField,
    isFormValid,
    saveChanges,
  };
};