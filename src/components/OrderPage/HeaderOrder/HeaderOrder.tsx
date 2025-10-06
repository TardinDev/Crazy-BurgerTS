import styled from "styled-components"
import CrazyBurger from "../../Reusable-ui/CrazyBurger";
import Profile from "./Profile";
import { ThemeToggle } from "../../Reusable-ui/ThemeToggle";

type HeaderOrderType = {
    inputName?: string; // inputName peut être string ou undefined
  };

export default function HeaderOrder({inputName}: HeaderOrderType ) {


  return (

    <HeaderOrderStyle >

      <CrazyBurger imgWidth="4rem" imgHeight="3rem" label="8rem"/>

      <HeaderActions>
        <ThemeToggle />
        <Profile inputName={inputName} />
      </HeaderActions>


     </HeaderOrderStyle>


  )
}

const HeaderOrderStyle = styled.div`
         background-color: ${(props) => props.theme.colors.background.primary};
         height: 10vh;
         padding: 1rem 1.5rem;
         border-top-left-radius: 10px;
         border-top-right-radius: 10px;
         display: flex;
         justify-content: space-between;
         align-items: center;
         transition: background-color ${(props) => props.theme.transitions.normal};

         h1 {
           font-size: 1.5rem;
           color: ${(props) => props.theme.colors.text.primary};

           span {
             color: #EB8317;
           }
         }

         @media (max-width: 768px) {
           padding: 0.8rem 1rem;
           height: auto;
           min-height: 10vh;
         }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`
