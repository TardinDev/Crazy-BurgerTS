import React, { useContext, useState } from "react";
import { FaEuroSign, FaCamera, FaBullhorn } from "react-icons/fa";
import { GrCubes } from "react-icons/gr";
import styled from "styled-components";
import Btn from "./Btn";
import orderContext from "../../context/orderContext";
import { FaBurger } from "react-icons/fa6";



// Définition du type pour les props de TabContain
type BurgerType = {
  id: number;
  image: string;
  title: string;
  price: number;

};

// Définition du composant TabContain avec TypeScript
const TabContain: React.FC = () => {
  const [burgerName, setBurgerName] = useState<string>("");
  const [burgerImage, setBurgerImage] = useState<string>("");
  const [burgerPrice, setBurgerPrice] = useState<string>("");

  // Récupérer handleAddBurger et addToBasket depuis le contexte
  const { handleAddBurger, addToBasket } = useContext(orderContext);

  // Vérifie que tous les champs sont remplis
  const isFormComplete = burgerName.trim() !== "" && burgerImage.trim() !== "" && burgerPrice.trim() !== "";

  // Fonction pour créer et ajouter un nouveau burger
  const handleAddNewBurger = () => {
    if (!isFormComplete) {
      alert("Remplir d'abord tous les champs");
      return; // Arrête l'exécution si le formulaire est incomplet
    }

    alert("You gonna add a New Burger...");

    const newBurger: BurgerType = {
      id: Date.now(),
      title: burgerName,
      image: burgerImage,
      price: Number(burgerPrice),
    };

    // Ajouter le burger à la liste des burgers
    handleAddBurger(newBurger);

    // Ajouter le burger au panier
    addToBasket(newBurger);

    // Réinitialiser les champs
    setBurgerName("");
    setBurgerImage("");
    setBurgerPrice("");
  };

  return (
    <TabContainStyle>
      <div className="img-Input">
        {burgerImage ? (
          <img src={burgerImage} alt={burgerName} />
        ) : (
          <h2>No image yet!</h2>
        )}

        <div className="inputBlock">
          <div className="iconInput">
            <FaBurger size={25} color="grey" />
            <input
              type="text"
              placeholder="Burger's name!"
              value={burgerName}
              onChange={(e) => setBurgerName(e.target.value)}
              required
            />
          </div>

          <div className="iconInput">
            <FaCamera size={25} color="grey" />
            <input
              type="url"
              placeholder="Enter image URL"
              value={burgerImage}
              onChange={(e) => setBurgerImage(e.target.value)}
              required
            />
          </div>

          <div className="lastInputBlock">
            <div className="iconInput">
              <FaEuroSign size={25} color="grey" />
              <input
                type="number"
                placeholder="Price"
                value={burgerPrice}
                onChange={(e) => setBurgerPrice(e.target.value)}
                required
              />
            </div>

            <div className="iconInput">
              <GrCubes size={20} color="grey" />
              <select>
                <option value="with_ad">En Stock</option>
                <option value="ad_free">Shortage</option>
              </select>
            </div>

            <div className="iconInput">
              <FaBullhorn size={20} color="grey" />
              <select>
                <option value="with_ad">Avec pub</option>
                <option value="ad_free">Sans pub</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="Btn">
        {/* Désactiver le bouton si les champs ne sont pas remplis */}
        <Btn onClick={handleAddNewBurger} disabled={!isFormComplete} />
      </div>
    </TabContainStyle>
  );
};

// Styles pour TabContain
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

      input,
      select {
        border: none;
        outline: none;
        font-size: 1rem;
        flex: 1;
        padding: 0.1rem;
      }

      select {
        background-color: #fff;
        border-radius: 5px;
        padding: 0.1rem;
        cursor: pointer;
      }
    }

    .lastInputBlock {
      display: flex;
      gap: 10px;
      justify-content: space-between;
    }
  }

  .Btn {
    margin-left: -8rem;
  }
`;

export default TabContain;