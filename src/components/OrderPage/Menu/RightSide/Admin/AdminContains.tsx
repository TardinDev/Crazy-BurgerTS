import React, { useContext, useCallback, useMemo } from "react";
import styled, { keyframes } from "styled-components";
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

  // Optimisation avec useCallback
  const handleSaveChanges = useCallback((updatedBurger: Burger) => {
    console.log("Burger modifié :", updatedBurger);
    updateBurger(updatedBurger);
  }, [updateBurger]);

  // Mémorisation du contenu pour éviter les re-renders inutiles
  const currentContent = useMemo(() => {
    switch (isActiveTab) {
      case "button":
        return <AdminContainWelcome />;
      case "new":
        return <TabContain />;
      case "change":
        return (
          <ChangeBurgerForm
            selectedBurger={selectedBurger}
            onSaveChanges={handleSaveChanges}
          />
        );
      default:
        return <AdminContainWelcome />;
    }
  }, [isActiveTab, selectedBurger, handleSaveChanges]);

  return (
    <AdminContainsStyle className="adminContain" key={isActiveTab}>
      {currentContent}
    </AdminContainsStyle>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AdminContainsStyle = styled.div`
  min-height: 280px;
  max-height: 400px;
  background: rgba(15, 23, 42, 0.6);
  overflow-y: auto;
  padding: 24px;
  animation: ${fadeIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(30, 41, 59, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #ffa500 0%, #ff8c00 100%);
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #ff8c00 0%, #ff7700 100%);
    box-shadow: 0 0 6px rgba(255, 165, 0, 0.5);
  }

  /* Smooth scroll behavior */
  scroll-behavior: smooth;

  @media (max-width: 768px) {
    padding: 16px;
    max-height: 350px;
    min-height: 240px;
  }
`;

export default AdminContains;