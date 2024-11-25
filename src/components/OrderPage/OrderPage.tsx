import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useState } from "react";
import orderContext from "../../context/orderContext";
import {DataBurger} from "../../utils/DataBurger";

import HeaderOrder from "./HeaderOrder/HeaderOrder";
import Menu from "./Menu/Menu";

type Burger = {
  id: number;
  title: string;
  image: string;
  price: number;
};


export default function OrderPage() {

  const { inputName } = useParams<{ inputName: string }>(); 

  const [isActiveBtn, setIsActiveBtn] = useState<boolean>(false);

  const [basket, setBasket] = useState<Burger[]>([]); // État pour gérer le panier


  // État pour gérer la liste des burgers
  const [burgers, setBurgers] = useState<Burger[]>([...DataBurger ]);

  // Fonction pour ajouter un nouveau burger
  const handleAddBurger = (newBurger: Burger) => {
    setBurgers((prevBurgers) => [...prevBurgers, newBurger]);
  };

    // Fonction pour supprimer un burger
    const handleDeleteBurger = (id: number) => {
      setBurgers((prevBurgers) => prevBurgers.filter((burger) => burger.id !== id));
    };

    const addToBasket = (burger: Burger) => {
      setBasket((prevBasket) => [...prevBasket, burger]); // Ajout au panier
    };

    const removeFromBasket = (id: number) => {
      setBasket((prevBasket) => prevBasket.filter((burger) => burger.id !== id));
    };


  const orderContextValue = {

    isActiveBtn,
  setIsActiveBtn,
  burgers,
  setBurgers, 
  handleAddBurger,
  handleDeleteBurger,
  basket,
  addToBasket,
  removeFromBasket, // Ajouter la fonction de suppression


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


const OrderPageStyle = styled.div`
  background-color: #eb8317;
  height: 100vh;
  padding: 2rem 4.5rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;
