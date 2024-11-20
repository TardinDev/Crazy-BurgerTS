import styled from "styled-components";

export default function LeftSide() {
  const items = [
    {
      name: "Burger",
      price: "15€",
      image: "https://via.placeholder.com/150/FF5733/FFFFFF?text=Burger",
    },
    {
      name: "Fries",
      price: "5€",
      image: "https://via.placeholder.com/150/FFC300/FFFFFF?text=Fries",
    },
    {
      name: "Drink",
      price: "3€",
      image: "https://via.placeholder.com/150/DAF7A6/000000?text=Drink",
    },
  ];

  return (
    <LeftSideStyle>
      <div className="total">
        <h3>Total</h3>
        <span>23€</span>
      </div>
      <div className="list">
        {items.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-content">
              <h4>{item.name}</h4>
              <p>{item.price}</p>
            </div>
            <img src={item.image} alt={item.name} />
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
    height: 20%;
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
    flex-direction: column; /* Disposition verticale des cartes */
    gap: 20px;
    padding: 20px;
    background-color: #fff;
    height: 70%;
    overflow-y: auto;

    .card {
      display: flex; /* Aligne les éléments horizontalement */
      justify-content: space-between; /* Sépare le contenu et l'image */
      align-items: center;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: scale(1.02); /* Zoom léger au survol */
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
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

      img {
        width: 80px; /* Taille fixe pour l'image */
        height: 80px;
        object-fit: cover;
        border-left: 2px solid #f1f1f1; /* Séparation entre l'image et le contenu */
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

  /* Responsivité */
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
