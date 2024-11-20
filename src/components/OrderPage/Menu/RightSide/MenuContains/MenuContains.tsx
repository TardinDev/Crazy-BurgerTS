import styled from "styled-components";
import { useContext } from "react";
import orderContext from "../../../../../context/orderContext";
import CardBurger from "./CardBurger";

export default function MenuContains() {
  const { burgers, setBurgers } = useContext(orderContext);

  // Fonction pour supprimer un burger
  const handleDelete = (id: number) => {
    const updatedBurgers = burgers.filter((burger) => burger.id !== id);
    setBurgers(updatedBurgers); // Mettre à jour l'état via setBurgers
  };

  return (
    <MenuContainsStyle>
      {burgers.length > 0 ? 
        (burgers.map((item) => (
          <CardBurger
            id={item.id}
            key={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            onDelete={handleDelete} // Passez handleDelete ici
        />
      ))) 

      : <EmptyMessage>
            <h3> No Burgers... <br/> add one please !  </h3>
        </EmptyMessage>
    
    }
    
    </MenuContainsStyle>
  );
}

const MenuContainsStyle = styled.div`
  background-color: lightgrey;
  padding: 10px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colonnes */
  gap: 20px;
  box-sizing: border-box;
  overflow-y: scroll;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 colonnes pour les écrans moyens */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 colonne pour les petits écrans */
  }
`;

const EmptyMessage = styled.div`
  grid-column: span 3; /* Occupe tout l'espace dans la grille */
  text-align: center;
  font-size: 3rem;
  color: gray;
  padding: 20px;
`;
