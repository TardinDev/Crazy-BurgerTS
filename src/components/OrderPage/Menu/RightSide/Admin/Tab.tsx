import React from "react";
import styled from "styled-components";

type TabProps = {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  variant?: "toggle" | "action";
};

export default function Tab({ onClick, label, icon, isActive = false, variant = "action" }: TabProps) {
  return (
    <TabStyle
      onClick={onClick}
      $isActive={isActive}
      $variant={variant}
      role="button"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <h3>{label}</h3>
      <span>{icon}</span>
    </TabStyle>
  );
}

const TabStyle = styled.div<{ $isActive: boolean; $variant: "toggle" | "action" }>`
  background: ${props => props.$isActive
    ? 'linear-gradient(135deg, #fff5e6 0%, #ffe4c0 100%)'
    : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'};
  border-radius: 12px;
  cursor: pointer;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid ${props => props.$isActive ? '#ffa500' : 'transparent'};
  box-shadow: ${props => props.$isActive
    ? '0 4px 16px rgba(255, 165, 0, 0.25)'
    : '0 2px 8px rgba(0, 0, 0, 0.08)'};
  position: relative;
  overflow: hidden;
  min-width: 120px;
  justify-content: center;
  user-select: none;

  /* Focus styles for accessibility */
  &:focus-visible {
    outline: 2px solid #ffa500;
    outline-offset: 2px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 165, 0, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-3px);
    border-color: #ffa500;
    box-shadow: 0 6px 20px rgba(255, 165, 0, 0.3);

    &::before {
      left: 100%;
    }

    h3 {
      color: #ff8c00;
    }

    svg {
      color: #ffa500 !important;
      transform: scale(1.1);
    }
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 3px 12px rgba(255, 165, 0, 0.2);
  }

  h3 {
    color: ${props => props.$isActive ? '#ff8c00' : '#475569'};
    font-size: 14px;
    font-weight: 600;
    margin: 0;
    letter-spacing: 0.3px;
    transition: color 0.3s ease;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;

    svg {
      transition: all 0.3s ease;
      filter: ${props => props.$isActive ? 'brightness(1.1)' : 'none'};
    }
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    min-width: 100px;

    h3 {
      font-size: 13px;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
`
