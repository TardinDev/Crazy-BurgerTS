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
  background: ${({ theme }) => theme.colors.background.muted};
  flex: 1;
  display: grid;
  grid-template-columns: 25% 1fr;
  overflow: hidden;
  transition: background ${({ theme }) => theme.transitions.normal};

  @media (max-width: 1024px) {
    grid-template-columns: 30% 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`
