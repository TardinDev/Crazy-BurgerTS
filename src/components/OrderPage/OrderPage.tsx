import { useParams } from "react-router-dom";
import styled from "styled-components";
import HeaderOrder from "./HeaderOrder";
import Menu from "./Menu";
import { useState } from "react";
import orderContext from "../../context/orderContext";



export default function OrderPage() {

  const { inputName } = useParams<{ inputName: string }>(); 

  const [isActiveBtn, setIsActiveBtn] = useState<boolean>(false);

  const orderContextValue = {
    isActiveBtn,
    setIsActiveBtn,
  };

  return (
    <OrderPageStyle>
      <orderContext.Provider value={orderContextValue}>
        <HeaderOrder inputName={inputName || "Guest"} /> 
        <Menu />
      </orderContext.Provider>
    </OrderPageStyle>
  );
}


// Styles du composant OrderPage
const OrderPageStyle = styled.div`
  background-color: #eb8317;
  height: 100vh;
  padding: 2rem 4.5rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;
