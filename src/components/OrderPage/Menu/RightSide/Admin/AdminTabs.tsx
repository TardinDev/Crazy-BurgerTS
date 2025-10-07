import React, { useCallback } from "react";
import styled from "styled-components";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { GiHamburger } from "react-icons/gi";
import { FaPen } from "react-icons/fa6";
import Tab from "./Tab";

type AdminTabsType = {
  isCollapsed: boolean;
  onClick: () => void;
  handleTab: (id: string) => void;
  activeTab: string;
};

export default function AdminTabs({ isCollapsed, onClick, handleTab, activeTab }: AdminTabsType) {
  // Optimisation avec useCallback pour les handlers
  const handleNewTab = useCallback(() => handleTab("new"), [handleTab]);
  const handleChangeTab = useCallback(() => handleTab("change"), [handleTab]);

  return (
    <AdminTabsStyle>
      <Tab
        label={isCollapsed ? "Fermer" : "Ouvrir"}
        onClick={onClick}
        icon={isCollapsed ? <FaArrowDown size={22} color="#64748b" /> : <FaArrowUp size={22} color="#ffa500" />}
        isActive={false}
        variant="toggle"
      />

      <Tab
        label="Nouveau"
        onClick={handleNewTab}
        icon={<GiHamburger size={24} color="#10b981" />}
        isActive={activeTab === "new"}
        variant="action"
      />

      <Tab
        label="Modifier"
        onClick={handleChangeTab}
        icon={<FaPen size={20} color="#3b82f6" />}
        isActive={activeTab === "change"}
        variant="action"
      />
    </AdminTabsStyle>
  );
}

const AdminTabsStyle = styled.div`
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 24px;
  position: relative;
  border-bottom: 1px solid rgba(255, 165, 0, 0.15);

  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    background: rgba(255, 165, 0, 0.4);
    border-radius: 2px;
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  &:hover::before {
    width: 50px;
    opacity: 0.8;
    background: rgba(255, 165, 0, 0.6);
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    gap: 8px;

    &::before {
      width: 35px;
    }
  }
`;
