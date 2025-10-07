import React, { useMemo, useCallback } from 'react';
import { FaEuroSign, FaCamera, FaCheckCircle } from 'react-icons/fa';
import { FaBurger } from 'react-icons/fa6';
import styled, { keyframes } from 'styled-components';
import { Button } from './Button';
import { useBurgerForm } from '../../hooks/useBurgerForm';

const TabContain: React.FC = () => {
  const { formData, updateField, submitBurger, errors, isSubmitting } = useBurgerForm();

  // Validation visuelle pour chaque champ
  const fieldValidation = useMemo(() => ({
    name: formData.name.length > 0 && !errors.name,
    image: formData.image.length > 0 && !errors.image,
    price: formData.price.length > 0 && !errors.price
  }), [formData, errors]);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  // Optimisation des handlers
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('name', e.target.value);
  }, [updateField]);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('image', e.target.value);
  }, [updateField]);

  const handlePriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('price', e.target.value);
  }, [updateField]);

  return (
    <TabContainStyle>
      <div className="img-Input">
        <ImagePreview>
          {formData.image ? (
            <img src={formData.image} alt={formData.name || 'Burger preview'} />
          ) : (
            <h2>Aucune image</h2>
          )}
          {fieldValidation.image && <ValidIcon><FaCheckCircle size={20} /></ValidIcon>}
        </ImagePreview>

        <div className="inputBlock">
          <InputWrapper $isValid={fieldValidation.name} $hasError={!!errors.name}>
            <FaBurger size={25} color="grey" />
            <input
              type="text"
              placeholder="Nom du burger"
              value={formData.name}
              onChange={handleNameChange}
              required
              aria-label="Nom du burger"
            />
            {fieldValidation.name && <FaCheckCircle size={18} color="#10b981" />}
          </InputWrapper>

          <InputWrapper $isValid={fieldValidation.image} $hasError={!!errors.image}>
            <FaCamera size={25} color="grey" />
            <input
              type="url"
              placeholder="URL de l'image"
              value={formData.image}
              onChange={handleImageChange}
              required
              aria-label="URL de l'image"
            />
            {fieldValidation.image && <FaCheckCircle size={18} color="#10b981" />}
          </InputWrapper>

          <InputWrapper $isValid={fieldValidation.price} $hasError={!!errors.price}>
            <FaEuroSign size={25} color="grey" />
            <input
              type="number"
              placeholder="Prix"
              value={formData.price}
              onChange={handlePriceChange}
              required
              step="0.01"
              min="0"
              aria-label="Prix du burger"
            />
            {fieldValidation.price && <FaCheckCircle size={18} color="#10b981" />}
          </InputWrapper>
        </div>
      </div>

      <div className="Btn">
        <Button
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          disabled={hasErrors}
          onClick={submitBurger}
          isFullWidth
        >
          {isSubmitting ? 'Ajout en cours...' : 'Ajouter au Menu'}
        </Button>
        {hasErrors && (
          <ErrorList>
            {Object.entries(errors).map(([field, error]) => (
              <ErrorItem key={field}>• {error}</ErrorItem>
            ))}
          </ErrorList>
        )}
      </div>
    </TabContainStyle>
  );
};

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const checkmark = keyframes`
  0% {
    transform: scale(0) rotate(45deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(45deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
`;

const TabContainStyle = styled.div`
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 0;

  .img-Input {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .inputBlock {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
  }

  .Btn {
    margin-top: 8px;
  }

  @media (max-width: 768px) {
    gap: 16px;

    .img-Input {
      flex-direction: column;
      gap: 16px;
    }
  }
`;

const ImagePreview = styled.div`
  position: relative;
  width: 180px;
  height: 120px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 3px solid #ffa500;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(255, 165, 0, 0.25);
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 12px 32px rgba(255, 165, 0, 0.35);
    }
  }

  h2 {
    font-size: 16px;
    font-weight: 600;
    color: #94a3b8;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 2px dashed #cbd5e1;
    border-radius: 16px;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    margin: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      border-color: #ffa500;
      background: linear-gradient(135deg, #fff5e6 0%, #ffe4c0 100%);
      color: #ff8c00;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(255, 165, 0, 0.2);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 140px;
  }
`;

const ValidIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: white;
  border-radius: 50%;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  animation: ${checkmark} 0.4s ease;

  svg {
    color: #10b981;
    display: block;
  }
`;

const InputWrapper = styled.div<{ $isValid: boolean; $hasError: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 2px solid ${props => props.$hasError ? '#ef4444' : props.$isValid ? '#10b981' : '#e2e8f0'};
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;

  svg:first-child {
    flex-shrink: 0;
    transition: all 0.3s ease;
  }

  svg:last-child {
    animation: ${checkmark} 0.4s ease;
  }

  &:hover {
    border-color: ${props => props.$hasError ? '#dc2626' : props.$isValid ? '#059669' : '#ffa500'};
    box-shadow: 0 4px 16px ${props => props.$hasError ? 'rgba(239, 68, 68, 0.15)' : props.$isValid ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 165, 0, 0.15)'};

    svg:first-child {
      color: ${props => props.$hasError ? '#dc2626' : props.$isValid ? '#059669' : '#ffa500'} !important;
      transform: scale(1.1);
    }
  }

  &:focus-within {
    border-color: ${props => props.$hasError ? '#dc2626' : props.$isValid ? '#059669' : '#ff8c00'};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(239, 68, 68, 0.1)' : props.$isValid ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 165, 0, 0.1)'};
    background: #ffffff;

    svg:first-child {
      color: ${props => props.$hasError ? '#dc2626' : props.$isValid ? '#059669' : '#ff8c00'} !important;
    }
  }

  input {
    border: none;
    outline: none;
    font-size: 15px;
    flex: 1;
    padding: 0;
    background: transparent;
    color: #1e293b;
    font-weight: 500;

    &::placeholder {
      color: #94a3b8;
      font-weight: 400;
    }
  }
`;

const ErrorList = styled.div`
  margin-top: 12px;
  padding: 14px 16px;
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border: 1px solid #fecaca;
  border-radius: 8px;
  animation: ${pulse} 1.5s ease-in-out;
`;

const ErrorItem = styled.div`
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 6px;
  font-weight: 500;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default TabContain;
