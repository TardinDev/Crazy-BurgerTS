import styled from "styled-components"
import cbLogo from "../../../public/logo-orange.png"


type CrazyBurgerType = {

    imgWidth:string,
    imgHeight:string,
    label:string
}


export default function CrazyBurger({imgWidth, imgHeight, label}: CrazyBurgerType) {


  return (

      <CrazyBurgerStyle imgWidth={imgWidth} imgHeight={imgHeight} label={label}  >

        <h1>Crazy</h1>
          <img src={cbLogo} alt="burgerimage"/>
        <h1>Burger</h1>

      </CrazyBurgerStyle>

  )
}

const CrazyBurgerStyle = styled.div<CrazyBurgerType>`


      background-color:#fff;
      display:flex;
      align-items:center;
      gap:10px;

      h1 {
        font-Size:${props => props.label};
        color:#EB8317;
      }

      img {
        width:${props => props.imgWidth};
        height:${props => props.imgHeight};
        
      }


`
