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
          Add <FaPlus size={12} />
        </button>
      </div>
    </CardBurgerStyle>
  );
};

const CardBurgerStyle = styled.div`
  position: relative;
  background-color: #f6f9fc;
  border-radius: 8px;
  width: 11rem;
  padding: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    background-color: #f0f6fb;
    transform: scale(1.03);
  }

  .delete-icon {
    position: absolute;
    top: 6px;
    right: 6px;
    cursor: pointer;
    color: #ff0000;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;

    &:hover {
      background-color: rgba(255, 0, 0, 0.8);
      color: white;
      transform: scale(1.1);
    }

    svg {
      font-size: 0.8rem;
    }
  }

  img {
    width: 100%;
    height: 7rem;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: 1rem;
    margin-bottom: 0.3rem;
    color: #333;
    text-align: center;
    line-height: 1.3;
    height: 2.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .price-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 0.5rem;

    .price {
      font-size: 1rem;
      color: #555;
      font-weight: 600;
    }

    .add-btn {
      display: flex;
      align-items: center;
      background-color: #eb8317;
      color: white;
      border: none;
      padding: 0.3rem 0.6rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.8rem;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: #ffbd73;
      }

      svg {
        margin-left: 0.3rem;
      }
    }
  }
`;

export default CardBurger;