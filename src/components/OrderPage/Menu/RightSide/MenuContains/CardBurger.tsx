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
  background: ${(props) => props.theme.colors.background.primary};
  border-radius: 12px;
  width: 11rem;
  padding: 0.75rem;
  box-shadow: ${(props) => props.theme.shadows.md};
  border: 2px solid ${(props) => props.theme.colors.border.light};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${(props) => props.theme.colors.background.secondary};
    transform: translateY(-4px) scale(1.02);
    box-shadow: ${(props) => props.theme.shadows.xl};
    border-color: ${(props) => props.theme.colors.primary};
  }

  .delete-icon {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    color: ${(props) => props.theme.colors.error};
    background: ${(props) => props.theme.colors.background.primary};
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${(props) => props.theme.shadows.md};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid ${(props) => props.theme.colors.error};

    &:hover {
      background: ${(props) => props.theme.colors.error};
      color: ${(props) => props.theme.colors.text.white};
      transform: scale(1.15);
      box-shadow: ${(props) => props.theme.shadows.lg};
    }

    svg {
      font-size: 0.9rem;
    }
  }

  img {
    width: 100%;
    height: 7rem;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    border: 2px solid ${(props) => props.theme.colors.border.medium};
    transition: border-color 0.3s ease;
  }

  &:hover img {
    border-color: ${(props) => props.theme.colors.primary};
  }

  h2 {
    font-size: 1rem;
    margin-bottom: 0.3rem;
    color: ${(props) => props.theme.colors.text.primary};
    text-align: center;
    line-height: 1.3;
    height: 2.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${(props) => props.theme.fontWeight.semibold};
  }

  .price-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 0.5rem;

    .price {
      font-size: 1rem;
      color: ${(props) => props.theme.colors.text.primary};
      font-weight: ${(props) => props.theme.fontWeight.bold};
    }

    .add-btn {
      display: flex;
      align-items: center;
      background: linear-gradient(135deg, ${(props) => props.theme.colors.primary} 0%, ${(props) => props.theme.colors.primaryDark} 100%);
      color: ${(props) => props.theme.colors.text.white};
      border: none;
      padding: 0.4rem 0.8rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: ${(props) => props.theme.fontWeight.semibold};
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: ${(props) => props.theme.shadows.sm};

      &:hover {
        background: linear-gradient(135deg, ${(props) => props.theme.colors.primaryLight} 0%, ${(props) => props.theme.colors.primary} 100%);
        transform: translateY(-2px);
        box-shadow: ${(props) => props.theme.shadows.md};
      }

      &:active {
        transform: translateY(0);
      }

      svg {
        margin-left: 0.3rem;
      }
    }
  }
`;

export default CardBurger;