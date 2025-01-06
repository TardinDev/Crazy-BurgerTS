import { useContext } from "react";
import styled from "styled-components";
import orderContext from "../../../../context/orderContext"; 
import MenuContains from "./MenuContains/MenuContains";
import Admin from "./Admin/Admin";

export default function MenuRightSide() {

  const { isActiveBtn } = useContext(orderContext);

  return (
    <MenuRightSideStyle>
      <MenuContains />
      {isActiveBtn && <Admin />}
    </MenuRightSideStyle>
  );
}

const MenuRightSideStyle = styled.div`
  position: relative;
  overflow-y: hidden;
  display: grid;
`;
