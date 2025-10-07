import { useContext, useState } from "react";
import styled from "styled-components";
import { FaSearch, FaTimes } from "react-icons/fa";
import orderContext from "../../../../context/orderContext";
import MenuContains from "./MenuContains/MenuContains";
import Admin from "./Admin/Admin";
import BurgerSearch from "./BurgerSearch";
import { Burger } from "../../../../types";

export default function MenuRightSide() {
  const { isActiveBtn, burgers } = useContext(orderContext);
  const [selectedBurger, setSelectedBurger] = useState<Burger | null>(null);
  const [filteredBurgers, setFilteredBurgers] = useState<Burger[]>(burgers);
  const [showSearch, setShowSearch] = useState(false);

  const handleSelectBurger = (burger: Burger) => {
    setSelectedBurger(burger);
  };

  const handleFilteredBurgers = (filtered: Burger[]) => {
    setFilteredBurgers(filtered);
  };

  return (
    <MenuRightSideStyle>
      {!isActiveBtn && showSearch && (
        <SearchWrapper>
          <BurgerSearch onFilteredBurgers={handleFilteredBurgers} />
        </SearchWrapper>
      )}

      {!isActiveBtn && (
        <FloatingSearchButton
          onClick={() => setShowSearch(!showSearch)}
          isOpen={showSearch}
        >
          {showSearch ? <FaTimes size={14} /> : <FaSearch size={14} />}
          <span>{showSearch ? 'Fermer' : 'Rechercher'}</span>
        </FloatingSearchButton>
      )}

      <MenuContainerWrapper>
        <MenuContains
          onSelectBurger={handleSelectBurger}
          burgers={filteredBurgers}
        />
      </MenuContainerWrapper>
      {isActiveBtn && <Admin selectedBurger={selectedBurger} />}
    </MenuRightSideStyle>
  );
}

const MenuRightSideStyle = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MenuContainerWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const SearchWrapper = styled.div`
  position: relative;
  z-index: 100;
  background: transparent;
  padding: 12px;
  animation: slideDown 0.3s ease-out;
  flex-shrink: 0;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FloatingSearchButton = styled.button<{ isOpen: boolean }>`
  position: ${({ isOpen }) => isOpen ? 'relative' : 'absolute'};
  top: ${({ isOpen }) => isOpen ? '0' : '16px'};
  right: ${({ isOpen }) => isOpen ? '0' : '16px'};
  z-index: 200;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary} 0%, ${(props) => props.theme.colors.primaryDark} 100%);
  color: ${(props) => props.theme.colors.text.white};
  border: 2px solid ${({ isOpen, theme }) => isOpen ? theme.colors.primaryDark : 'transparent'};
  border-radius: 25px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: ${(props) => props.theme.shadows.md};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  margin: ${({ isOpen }) => isOpen ? '12px 12px 0 12px' : '0'};
  align-self: ${({ isOpen }) => isOpen ? 'flex-end' : 'auto'};

  &:hover {
    background: linear-gradient(135deg, ${(props) => props.theme.colors.primaryLight} 0%, ${(props) => props.theme.colors.primary} 100%);
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.lg};
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  svg {
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
  }
`;