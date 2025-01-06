import styled from "styled-components";
import { useState } from "react";
import AdminTabs from "./AdminTabs";
import AdminContains from "./AdminContains";


export default function Admin() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isActiveTab, setIsActiveTab] = useState<string>("button");

  // Fonction pour gérer la collapse
  const handleCollapsed = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  // Fonction pour gérer l'activation d'un onglet avec id typé
  const handleTab = (id: string): void => {
    setIsActiveTab(id); 
  };

  return (
    <AdminStyle>
      <AdminTabs onClick={handleCollapsed} isCollapsed={isCollapsed} handleTab={handleTab} />
      {isCollapsed && <AdminContains isActiveTab={isActiveTab} />} 
    </AdminStyle>
  );
}

const AdminStyle = styled.div`
  background-color: blue;
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  right: 0;
`;
