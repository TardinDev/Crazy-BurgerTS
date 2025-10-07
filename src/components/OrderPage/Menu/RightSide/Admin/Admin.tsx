import React, { useState, useCallback, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import AdminTabs from "./AdminTabs";
import AdminContains from "./AdminContains";
import { Burger } from "../../../../../types";

type AdminType = {
  selectedBurger: Burger | null;
};

const Admin: React.FC<AdminType> = ({ selectedBurger }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isActiveTab, setIsActiveTab] = useState<string>("button");

  // Optimisation avec useCallback pour éviter les re-renders inutiles
  const handleCollapsed = useCallback((): void => {
    setIsCollapsed(prev => !prev);
  }, []);

  // Optimisation avec useCallback
  const handleTab = useCallback((id: string): void => {
    setIsActiveTab(id);
    if (!isCollapsed) {
      setIsCollapsed(true);
    }
  }, [isCollapsed]);

  // Mémorisation pour optimiser les performances
  const adminContent = useMemo(() => (
    isCollapsed && (
      <AdminContains
        isActiveTab={isActiveTab}
        selectedBurger={selectedBurger}
      />
    )
  ), [isCollapsed, isActiveTab, selectedBurger]);

  return (
    <AdminStyle $isCollapsed={isCollapsed}>
      <AdminTabs
        onClick={handleCollapsed}
        isCollapsed={isCollapsed}
        handleTab={handleTab}
        activeTab={isActiveTab}
      />
      {adminContent}
    </AdminStyle>
  );
};

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const AdminStyle = styled.div<{ $isCollapsed: boolean }>`
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  box-shadow: ${props => props.$isCollapsed
    ? '0 -6px 30px rgba(0, 0, 0, 0.4)'
    : '0 -4px 20px rgba(0, 0, 0, 0.3)'};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  animation: ${slideUp} 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 165, 0, 0.2);

  @media (max-width: 768px) {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
`;

export default Admin;