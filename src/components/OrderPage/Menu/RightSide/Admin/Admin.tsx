import React, { useState } from "react";
import styled from "styled-components";
import AdminTabs from "./AdminTabs";
import AdminContains from "./AdminContains";
import { Burger } from "../../../../../types";

type AdminType = {
  selectedBurger: Burger | null; // Modifier le type pour correspondre à BurgerType

};

const Admin: React.FC<AdminType> = ({ selectedBurger }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isActiveTab, setIsActiveTab] = useState<string>("button");

  // Fonction pour gérer la collapse
  const handleCollapsed = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  // Fonction pour gérer l'activation d'un onglet
  const handleTab = (id: string): void => {
    setIsActiveTab(id);
  };

  return (
    <AdminStyle>
      <AdminTabs onClick={handleCollapsed} isCollapsed={isCollapsed} handleTab={handleTab} />
      {isCollapsed && <AdminContains isActiveTab={isActiveTab} selectedBurger={selectedBurger} />}
    </AdminStyle>
  );
};

const AdminStyle = styled.div`
  background-color: blue;
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default Admin;