// Utilitaires de validation avancés
import { useState } from 'react';

export interface ValidationRule<T> {
  validate: (value: T) => boolean;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validateur générique pour les formulaires
 */
export class FormValidator<T extends Record<string, any>> {
  private rules: Partial<Record<keyof T, ValidationRule<any>[]>> = {};

  addRule<K extends keyof T>(field: K, rule: ValidationRule<T[K]>) {
    if (!this.rules[field]) {
      this.rules[field] = [];
    }
    this.rules[field]!.push(rule);
    return this;
  }

  validate(data: T): ValidationResult {
    const errors: string[] = [];

    for (const [field, rules] of Object.entries(this.rules)) {
      const value = data[field as keyof T];
      for (const rule of rules as ValidationRule<any>[]) {
        if (!rule.validate(value)) {
          errors.push(`${field}: ${rule.message}`);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

// Règles de validation prédéfinies
export const ValidationRules = {
  required: <T>(message = 'Ce champ est requis'): ValidationRule<T> => ({
    validate: (value) => {
      if (value === undefined || value === null) return false;
      if (typeof value === 'string') return value.trim() !== '';
      return true;
    },
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule<string> => ({
    validate: (value) => !!value && value.length >= min,
    message: message || `Minimum ${min} caractères requis`,
  }),

  maxLength: (max: number, message?: string): ValidationRule<string> => ({
    validate: (value) => !value || value.length <= max,
    message: message || `Maximum ${max} caractères autorisés`,
  }),

  email: (message = 'Email invalide'): ValidationRule<string> => ({
    validate: (value) =>
      !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),

  min: (min: number, message?: string): ValidationRule<number> => ({
    validate: (value) => value >= min,
    message: message || `La valeur doit être supérieure ou égale à ${min}`,
  }),

  max: (max: number, message?: string): ValidationRule<number> => ({
    validate: (value) => value <= max,
    message: message || `La valeur doit être inférieure ou égale à ${max}`,
  }),

  url: (message = 'URL invalide'): ValidationRule<string> => ({
    validate: (value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message,
  }),

  pattern: (regex: RegExp, message: string): ValidationRule<string> => ({
    validate: (value) => !value || regex.test(value),
    message,
  }),

  custom: <T>(
    validator: (value: T) => boolean,
    message: string
  ): ValidationRule<T> => ({
    validate: validator,
    message,
  }),
};

// Validation spécifique pour les burgers
export const createBurgerValidator = () => {
  return new FormValidator<{
    title: string;
    price: number;
    image: string;
    description?: string;
  }>()
    .addRule('title', ValidationRules.required('Le nom du burger est requis'))
    .addRule('title', ValidationRules.minLength(2, 'Le nom doit faire au moins 2 caractères'))
    .addRule('title', ValidationRules.maxLength(50, 'Le nom ne peut pas dépasser 50 caractères'))
    .addRule('price', ValidationRules.required('Le prix est requis'))
    .addRule('price', ValidationRules.min(0.01, 'Le prix doit être positif'))
    .addRule('price', ValidationRules.max(100, 'Le prix ne peut pas dépasser 100€'))
    .addRule('image', ValidationRules.required('L\'image est requise'))
    .addRule('image', ValidationRules.url('L\'URL de l\'image est invalide'))
    .addRule(
      'description',
      ValidationRules.maxLength(200, 'La description ne peut pas dépasser 200 caractères') as ValidationRule<string | undefined>
    );
};

// Validation pour les utilisateurs
export const createUserValidator = () => {
  return new FormValidator<{
    username: string;
    email: string;
    password: string;
  }>()
    .addRule('username', ValidationRules.required('Le nom d\'utilisateur est requis'))
    .addRule('username', ValidationRules.minLength(3, 'Au moins 3 caractères'))
    .addRule('username', ValidationRules.maxLength(20, 'Maximum 20 caractères'))
    .addRule('username', ValidationRules.pattern(
      /^[a-zA-Z0-9_]+$/,
      'Seuls les lettres, chiffres et underscore sont autorisés'
    ))
    .addRule('email', ValidationRules.required('L\'email est requis'))
    .addRule('email', ValidationRules.email())
    .addRule('password', ValidationRules.required('Le mot de passe est requis'))
    .addRule('password', ValidationRules.minLength(8, 'Au moins 8 caractères'))
    .addRule('password', ValidationRules.pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Doit contenir au moins une minuscule, une majuscule et un chiffre'
    ));
};

// Utilitaire pour valider en temps réel
export const useFormValidation = <T extends Record<string, any>>(
  validator: FormValidator<T>
) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: keyof T, value: any) => {
    // Créer un objet temporaire pour valider seulement ce champ
    const result = validator.validate({ [field]: value } as T);

    const fieldErrors = result.errors.filter(error =>
      error.startsWith(`${String(field)}:`)
    );

    setErrors(prev => ({
      ...prev,
      [field]: fieldErrors.length > 0 ? fieldErrors[0].split(': ')[1] : '',
    }));

    return fieldErrors.length === 0;
  };

  const validateAll = (data: T) => {
    const result = validator.validate(data);
    const errorMap: Record<string, string> = {};

    result.errors.forEach(error => {
      const [field, message] = error.split(': ');
      errorMap[field] = message;
    });

    setErrors(errorMap);
    return result.isValid;
  };

  const clearErrors = () => setErrors({});

  return {
    errors,
    validateField,
    validateAll,
    clearErrors,
  };
};