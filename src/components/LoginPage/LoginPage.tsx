import CrazyBurger from "../Reusable-ui/CrazyBurger"
import styled from "styled-components"
import Form from "./Form"




export default function LoginPage() {


  return (

    <LoginPageStyle>

        <CrazyBurger imgWidth="12rem" imgHeight="10rem" label="8rem" />

        <Form />
       

    </LoginPageStyle>

  )
}


const LoginPageStyle = styled.div`

     background-color:#fff;
     height:100vh;

     display:flex;
     flex-direction:column;
     justify-content:center;
     align-items:center;
     gap:50px;




`