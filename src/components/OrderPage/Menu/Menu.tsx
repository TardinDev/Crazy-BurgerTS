import styled from "styled-components"
import MenuRightSide from "./RightSide/MenuRightSide"
import LeftSide from "./LeftSide/LeftSide"



export default function Menu() {

  return (

    <MenuStyle>

      <LeftSide/>
      <MenuRightSide /> 

    </MenuStyle>

  )
}

const MenuStyle = styled.div`
  background-color: #B7B7B7;
  flex: 1;
  display: grid;
  grid-template-columns: 25% 1fr;
  overflow: hidden;

  .leftSide {
    background-color: #536493;
  }
`
