import React, { useContext } from "react";
import styled from "styled-components";
import AdminContainWelcome from "./AdminContainWelcome";
import TabContain from "../../../../Reusable-ui/TabContain";
import ChangeBurgerForm from "../../../../Reusable-ui/ChangeBurgerForm";
import { Burger } from "../../../../../types";
import orderContext from "../../../../../context/orderContext";


type AdminContainsType = {
  isActiveTab: string;
  selectedBurger: Burger | null; 
};

const AdminContains: React.FC<AdminContainsType> = ({ isActiveTab, selectedBurger }) => {

  const { updateBurger } = useContext(orderContext);

  const handleSaveChanges = (updatedBurger: Burger) => {
    console.log("Burger modifié :", updatedBurger);
    updateBurger(updatedBurger); // Mettre à jour le burger dans le contexte
  };

  return (
    <AdminContainsStyle className="adminContain">
      {isActiveTab === "button" && <AdminContainWelcome />}
      {isActiveTab === "new"    && <TabContain />}
      {isActiveTab === "change" && <ChangeBurgerForm
                                        selectedBurger={selectedBurger}
                                        onSaveChanges={handleSaveChanges}
                                           /> }
    </AdminContainsStyle>

  );
};

const AdminContainsStyle = styled.div`
  height: 250px;
  background-color: grey;
`;

export default AdminContains;