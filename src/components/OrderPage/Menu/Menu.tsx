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

      background-color:#B7B7B7;
      height:80vh;

     display:grid;
     grid-template-columns:25% 1fr;
      


      .leftSide {
         background-color:#536493;
         
      }

  


`
