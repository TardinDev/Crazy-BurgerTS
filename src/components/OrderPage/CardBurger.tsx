import { FaPlus } from "react-icons/fa";
import imgBurger from "../../../public/imageBurger.png";
import styled from "styled-components";

export default function CardBurger() {
  return (
    <CardBurgerStyle>
      <img src={imgBurger} alt="Delicious Burger" />
      <h2>Burger Title</h2>

      <div className="price-btn">
        <span className="price">$12.99</span>
        <button className="add-btn">
          Add <FaPlus size={20} />
        </button>
      </div>
    </CardBurgerStyle>
  );
}

const CardBurgerStyle = styled.div`
  background-color: #f5f5f5;
  border-radius: 12px;
  width: 18rem;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
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
      background-color: #FF9D3D;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: #FFBD73;
      }

      svg {
        margin-left: 0.5rem;
      }
    }
  }
`;
