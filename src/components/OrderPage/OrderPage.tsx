import { useParams } from "react-router-dom";
import styled from "styled-components";
import HeaderOrder from "./HeaderOrder";
import Menu from "./Menu";




export default function OrderPage() {

    const {inputName} = useParams();


  return (

    <OrderPageStyle>

      <HeaderOrder inputName={inputName}/>

      <Menu/>
       

    </OrderPageStyle>


  )
}

const OrderPageStyle = styled.div`

     background-color:#EB8317;
     height:100vh;
     padding:2rem 4.5rem;

     display:flex;
     flex-direction:column;

     box-sizing: border-box; 
 
    
  
     
  

     

`
