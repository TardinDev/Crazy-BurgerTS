import { useContext } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import styled from "styled-components";
import orderContext from "../../../../../context/orderContext";

const comingSoonImage = "https://picsum.photos/200/150?grayscale"; // Image générée par Picsum

type CardBurgerType = {

  image: string;
  title: string;
  price: number;
  id:number;
  onDelete: (id: number) => void; // Ajout de la prop `onDelete`

};

export default function CardBurger({ id, image, title, price, onDelete }: CardBurgerType) {
  // Utilisation du contexte dans le composant
  const { isActiveBtn } = useContext(orderContext);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = comingSoonImage;
  };

  

  return (
    <CardBurgerStyle>
      {/* Affichage conditionnel du bouton de suppression */}
      {isActiveBtn && (
        <button className="delete-btn" onClick={() => onDelete(id)}>
          <FaTimes size={16} />
        </button>
      )}
      <img src={image} alt={title} onError={handleImageError} />
      <h2>{title}</h2>
      <div className="price-btn">
        <span className="price">{price.toFixed(2)} €</span>
        <button className="add-btn">
          Add <FaPlus size={20} />
        </button>
      </div>
    </CardBurgerStyle>
  );
}

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

  .delete-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: #C62E2E;
    color: white;
    border: none;
    border-radius: 50%;
    padding: 0.3rem;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s ease-in-out;
    
    &:hover {
      background-color: #ff6668;
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
