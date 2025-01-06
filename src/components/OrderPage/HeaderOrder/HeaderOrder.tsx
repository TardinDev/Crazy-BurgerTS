import styled from "styled-components"
import CrazyBurger from "../../Reusable-ui/CrazyBurger";
import Profile from "./Profile";

type HeaderOrderType = {
    inputName?: string; // inputName peut être string ou undefined
  };

export default function HeaderOrder({inputName}: HeaderOrderType ) {


  return (

    <HeaderOrderStyle >

      <CrazyBurger imgWidth="4rem" imgHeight="3rem" label="8rem"/>

      <Profile inputName={inputName} />
   

     </HeaderOrderStyle>   
   
   
  )
}

const HeaderOrderStyle = styled.div`

         background-color:#fff;
         height:10vh;
         padding:1rem 1.5rem;
         border-top-left-radius:10px;
         border-top-right-radius:10px;

         display:flex;
         justify-content:space-between;
         align-items:center;
         


         h1 {
           font-size:1.5rem;

           span {
           color:#EB8317;
            }
         
         }

       


`
