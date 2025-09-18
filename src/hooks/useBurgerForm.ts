import { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { Burger } from '../types';
import orderContext from '../context/orderContext';
import { generateId } from '../lib/utils';
import { createBurgerValidator, useFormValidation } from '../utils/validation';

interface BurgerFormData {
  name: string;
  image: string;
  price: string;
}

export const useBurgerForm = () => {
  const [formData, setFormData] = useState<BurgerFormData>({
    name: '',
    image: '',
    price: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleAddBurger } = useContext(orderContext);

  // Validation avec le système robuste
  const validator = createBurgerValidator();
  const { errors, validateAll, clearErrors } = useFormValidation(validator);

  const updateField = (field: keyof BurgerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur du champ quand l'utilisateur tape
    if (errors[field]) {
      clearErrors();
    }
  };

  const resetForm = () => {
    setFormData({ name: '', image: '', price: '' });
    clearErrors();
  };

  const submitBurger = async () => {
    const validationData = {
      title: formData.name,
      image: formData.image,
      price: Number(formData.price),
    };

    if (!validateAll(validationData)) {
      return; // Les erreurs sont affichées automatiquement
    }

    setIsSubmitting(true);
    try {
      // Simuler une légère latence pour démontrer le loading
      await new Promise(resolve => setTimeout(resolve, 500));

      const newBurger: Burger = {
        id: generateId(),
        title: formData.name,
        image: formData.image,
        price: Number(formData.price),
      };

      handleAddBurger(newBurger);
      resetForm();
      toast.success(`Burger "${formData.name}" ajouté avec succès !`);
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    updateField,
    resetForm,
    submitBurger,
    errors,
    isSubmitting,
  };
};