import React from 'react';
import { FaEuroSign, FaCamera } from 'react-icons/fa';
import { FaBurger } from 'react-icons/fa6';
import styled from 'styled-components';
import Btn from './Btn';
import { Burger } from '../../types';
import { useBurgerEdit } from '../../hooks/useBurgerEdit';

type ChangeBurgerFormProps = {
  selectedBurger: Burger | null;
  onSaveChanges: (updatedBurger: Burger) => void;
};

const ChangeBurgerForm: React.FC<ChangeBurgerFormProps> = ({
  selectedBurger,
  onSaveChanges,
}) => {
  const { formData, updateField, isFormValid, saveChanges } = useBurgerEdit(
    selectedBurger,
    onSaveChanges
  );

  return (
    <ChangeBurgerFormStyle>
      <div className="img-Input">
        {formData.image ? (
          <img src={formData.image} alt={formData.name} />
        ) : (
          <h2>Click on Burger!</h2>
        )}

        <div className="inputBlock">
          <div className="iconInput">
            <FaBurger size={25} color="grey" />
            <input
              type="text"
              placeholder="Burger's name!"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              required
            />
          </div>

          <div className="iconInput">
            <FaCamera size={25} color="grey" />
            <input
              type="url"
              placeholder="Enter image URL"
              value={formData.image}
              onChange={(e) => updateField('image', e.target.value)}
              required
            />
          </div>

          <div className="iconInput">
            <FaEuroSign size={25} color="grey" />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => updateField('price', e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="Btn">
        <Btn onClick={saveChanges} disabled={!isFormValid} label="Save Change">
          Save Changes
        </Btn>
      </div>
    </ChangeBurgerFormStyle>
  );
};


const ChangeBurgerFormStyle = styled.div`
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

  img {
    width: 180px;
    height: 120px;
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
    width: 180px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 2px dashed rgba(255, 165, 0, 0.3);
    border-radius: 16px;
    background: rgba(30, 41, 59, 0.5);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      border-color: #ffa500;
      background: rgba(255, 165, 0, 0.1);
      color: #ffa500;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(255, 165, 0, 0.2);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .inputBlock {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;

    .iconInput {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      background: rgba(30, 41, 59, 0.6);
      border: 2px solid rgba(255, 165, 0, 0.2);
      border-radius: 12px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

      svg {
        flex-shrink: 0;
        color: #94a3b8;
        transition: all 0.3s ease;
      }

      &:hover {
        border-color: #ffa500;
        box-shadow: 0 4px 16px rgba(255, 165, 0, 0.25);

        svg {
          color: #ffa500;
          transform: scale(1.1);
        }
      }

      &:focus-within {
        border-color: #ff8c00;
        box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.15);
        background: rgba(30, 41, 59, 0.8);

        svg {
          color: #ff8c00;
        }
      }

      input {
        border: none;
        outline: none;
        font-size: 15px;
        flex: 1;
        padding: 0;
        background: transparent;
        color: #e2e8f0;
        font-weight: 500;

        &::placeholder {
          color: #64748b;
          font-weight: 400;
        }
      }
    }
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

    img, h2 {
      width: 100%;
      height: 140px;
    }
  }
`;

export default ChangeBurgerForm;
