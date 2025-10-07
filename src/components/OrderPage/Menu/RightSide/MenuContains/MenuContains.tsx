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
  background: ${(props) => props.theme.colors.background.muted};
  padding: 12px 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  box-sizing: border-box;
  overflow-y: auto;
  height: 100%;
  align-content: start;
  transition: background ${(props) => props.theme.transitions.normal};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.background.secondary};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.primary};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.primaryDark};
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.text.secondary};
  padding: 40px 20px;

  h3 {
    margin: 0;
    font-weight: ${(props) => props.theme.fontWeight.medium};
    line-height: 1.4;
    color: ${(props) => props.theme.colors.text.muted};
  }
`;

export default MenuContains;
