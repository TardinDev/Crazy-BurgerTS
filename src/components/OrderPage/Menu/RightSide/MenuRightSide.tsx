import { useContext, useState } from "react";
import styled from "styled-components";
import orderContext from "../../../../context/orderContext";
import MenuContains from "./MenuContains/MenuContains";
import Admin from "./Admin/Admin";
import BurgerSearch from "./BurgerSearch";
import { Burger } from "../../../../types";

export default function MenuRightSide() {
  const { isActiveBtn, burgers } = useContext(orderContext);
  const [selectedBurger, setSelectedBurger] = useState<Burger | null>(null);
  const [filteredBurgers, setFilteredBurgers] = useState<Burger[]>(burgers);

  const handleSelectBurger = (burger: Burger) => {
    setSelectedBurger(burger);
  };

  const handleFilteredBurgers = (filtered: Burger[]) => {
    setFilteredBurgers(filtered);
  };

  return (
    <MenuRightSideStyle>
      {!isActiveBtn && (
        <BurgerSearch onFilteredBurgers={handleFilteredBurgers} />
      )}
      <MenuContains
        onSelectBurger={handleSelectBurger}
        burgers={filteredBurgers}
      />
      {isActiveBtn && <Admin selectedBurger={selectedBurger} />}
    </MenuRightSideStyle>
  );
}

const MenuRightSideStyle = styled.div`
  position: relative;
  overflow-y: hidden;
  display: grid;
`;