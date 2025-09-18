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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(248, 250, 254, 0.98);
  backdrop-filter: blur(10px);
  padding: 8px;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FloatingSearchButton = styled.button<{ isOpen: boolean }>`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 200;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: #333;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  ${({ isOpen }) => isOpen && `
    background: #333;
  `}
`;