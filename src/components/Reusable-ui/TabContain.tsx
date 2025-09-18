import React from 'react';
import { FaEuroSign, FaCamera } from 'react-icons/fa';
import { FaBurger } from 'react-icons/fa6';
import styled from 'styled-components';
import { Button } from './Button';
import { useBurgerForm } from '../../hooks/useBurgerForm';

const TabContain: React.FC = () => {
  const { formData, updateField, submitBurger, errors, isSubmitting } = useBurgerForm();

  return (
    <TabContainStyle>
      <div className="img-Input">
        {formData.image ? (
          <img src={formData.image} alt={formData.name} />
        ) : (
          <h2>No image yet!</h2>
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
        <Button
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          disabled={Object.keys(errors).length > 0}
          onClick={submitBurger}
          isFullWidth
        >
          Ajouter au Menu
        </Button>
        {Object.keys(errors).length > 0 && (
          <ErrorList>
            {Object.entries(errors).map(([field, error]) => (
              <ErrorItem key={field}>{error}</ErrorItem>
            ))}
          </ErrorList>
        )}
      </div>
    </TabContainStyle>
  );
};

// Styles pour TabContain (inchangés)
const TabContainStyle = styled.div`
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  padding: 1rem 5rem;

  .img-Input {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  img {
    width: 15rem;
    height: 10rem;
    object-fit: cover;
    border: 1px solid orange;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  h2 {
    font-size: 30px;
    font-weight: bold;
    color: lightgrey;
    width: 15rem;
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid lightgrey;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
      background-color: grey;
      transform: scale(1.05);
    }
  }

  .inputBlock {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .iconInput {
      display: flex;
      align-items: center;
      gap: 2px;
      padding: 10px;
      background-color: #fff;
      border: 1px solid grey;
      border-radius: 5px;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        border-color: orange;
        box-shadow: 0 0 10px rgba(235, 131, 23, 0.5);
      }

      input {
        border: none;
        outline: none;
        font-size: 1rem;
        flex: 1;
        padding: 0.1rem;
      }
    }
  }

  .Btn {
    margin-left: -8rem;
  }
`;

const ErrorList = styled.div`
  margin-top: 12px;
  padding: 12px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
`;

const ErrorItem = styled.div`
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default TabContain;
