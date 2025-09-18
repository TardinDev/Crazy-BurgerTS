import React, { useContext } from "react";
import styled from "styled-components";
import CardBurger from "./CardBurger";
import orderContext from "../../../../../context/orderContext";
import { Burger } from "../../../../../types";

type MenuContainsType = {
  onSelectBurger: (burger: Burger) => void;
  burgers?: Burger[];
};

const MenuContains: React.FC<MenuContainsType> = ({ onSelectBurger, burgers: propBurgers }) => {
  const { burgers: contextBurgers, removeBurger } = useContext(orderContext);

  // Utiliser les burgers passés en props (filtrés) ou ceux du contexte
  const burgers = propBurgers || contextBurgers; 

  const handleDeleteBurger = (id: number) => {
    removeBurger(id); 
  };

  return (
    <MenuContainsStyle>
      {burgers.length > 0 ? (
        burgers.map((item) => (
          <CardBurger
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            onClick={() => onSelectBurger(item)}
            onDelete={() => handleDeleteBurger(item.id)} 
          />
        ))
      ) : (
        <EmptyMessage>
          <h3>Aucun burger trouvé... <br /> Essayez d'autres critères de recherche!</h3>
        </EmptyMessage>
      )}
    </MenuContainsStyle>
  );
};


const MenuContainsStyle = styled.div`
  background-color: lightgrey;
  padding: 10px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  box-sizing: border-box;
  overflow-y: scroll;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyMessage = styled.div`
  grid-column: span 3;
  text-align: center;
  font-size: 3rem;
  color: gray;
  padding: 20px;
`;

export default MenuContains;
