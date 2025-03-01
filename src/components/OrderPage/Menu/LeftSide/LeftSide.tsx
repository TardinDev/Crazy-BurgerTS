import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import orderContext from "../../../../context/orderContext";

export default function LeftSide() {
  const { basket, removeFromBasket } = useContext(orderContext); // Récupérer la liste du panier et la fonction pour retirer

  return (
    <LeftSideStyle>
      <div className="total">
        <h3>Total</h3>
        <span>
          {basket
            .reduce((total, item) => total + item.price, 0)
            .toFixed(2)}{" "}
          €
        </span>
      </div>
      <div className="list">
        {basket.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-content">
              <h4>{item.title}</h4>
              <p>{item.price.toFixed(2)} €</p>
            </div>
            <div className="image-wrapper">
              <img src={item.image} alt={item.title} />
              <div
                className="trash-icon"
                onClick={() => removeFromBasket(item.id)} // Appeler removeFromBasket avec l'ID
              >
                <FaTrashAlt />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
        <span>
          Order food by <strong>Tardin Dev</strong>
        </span>
      </div>
    </LeftSideStyle>
  );
}

const LeftSideStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f8f9fa;

  .total {
    background-color: #000;
    height: 10%;
    color: orange;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 2px solid orange;

    h3 {
      font-size: 1.8rem;
    }

    span {
      font-size: 2.5rem;
      font-weight: bold;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background-color: #fff;
    flex: 1;
    overflow-y: auto;

    .card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: scale(1.02);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }

      .card-content {
        flex: 1;
        padding: 10px;

        h4 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0;
        }

        p {
          font-size: 1.2rem;
          color: #555;
          margin: 5px 0 0 0;
        }
      }

      .image-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-left: 2px solid #f1f1f1;
          transition: opacity 0.3s ease;
        }

        .trash-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          color: red;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
          cursor: pointer;
        }

        &:hover img {
          opacity: 0.3;
        }

        &:hover .trash-icon {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.2);
        }
      }
    }
  }

  .footer {
    background-color: #000;
    height: 10%;
    color: orange;
    font-size: 1rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 2px solid orange;

    strong {
      font-weight: bold;
    }
  }

  @media (max-width: 768px) {
    .total {
      h3 {
        font-size: 1.5rem;
      }

      span {
        font-size: 2rem;
      }
    }

    .list .card-content h4 {
      font-size: 1.3rem;
    }

    .list .card-content p {
      font-size: 1rem;
    }

    .footer {
      font-size: 0.9rem;
    }
  }
`;
