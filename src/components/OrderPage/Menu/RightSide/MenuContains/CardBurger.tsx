import React, { useContext } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import styled from "styled-components";
import orderContext from "../../../../../context/orderContext";

type CardBurgerType = {
  id: number;
  image: string;
  title: string;
  price: number;
  onClick: () => void;
  onDelete: () => void;
};

const CardBurger: React.FC<CardBurgerType> = ({ id, image, title, price, onClick, onDelete }) => {

  const { isActiveBtn } = useContext(orderContext);
  const { addToBasket } = useContext(orderContext);

  const handleAddToBasket = (e: React.MouseEvent) => {
    e.stopPropagation();
    const burger = { id, image, title, price };
    addToBasket(burger);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <CardBurgerStyle onClick={onClick}>

      {isActiveBtn && 
        <div className="delete-icon" onClick={handleDelete}>
          <FaTimes />
        </div>  }

      <img src={image} alt={title} />
      <h2>{title}</h2>
      <div className="price-btn">
        <span className="price">{price.toFixed(2)} €</span>
        <button className="add-btn" onClick={handleAddToBasket}>
          Add <FaPlus size={20} />
        </button>
      </div>
    </CardBurgerStyle>
  );
};

const CardBurgerStyle = styled.div`
  position: relative;
  background-color: #f5f5f5;
  border-radius: 12px;
  width: 15rem;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  .delete-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: #ff0000;
    background-color: rgba(255, 255, 255, 0.8); 
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
    transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;

    &:hover {
      background-color: rgba(255, 0, 0, 0.8); 
      color: white;
      transform: scale(1.1);
    }

    svg {
      font-size: 1.2rem;
    }
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .price-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 1rem;

    .price {
      font-size: 1.25rem;
      color: #555;
    }

    .add-btn {
      display: flex;
      align-items: center;
      background-color: #eb8317;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: #ffbd73;
      }

      svg {
        margin-left: 0.5rem;
      }
    }
  }
`;

export default CardBurger;