import styled from "styled-components"

import CardBurger from "./CardBurger"
import { DataBurger } from "../../utils/DataBurger"

export default function MenuContains() {


  return (

    <MenuContainsStyle>
       
       { DataBurger.map((item) => 
             <CardBurger key={item.id} 
                         image={item.image} 
                         title={item.title} 
                         price={item.price}/> )}
       

    </MenuContainsStyle>


  )
}

const MenuContainsStyle = styled.div`


    background-color: lightgrey;
  padding: 10px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colonnes */
  gap: 20px; 
  height: 85vh; 
  overflow-y: auto; /* Ajoute une barre de défilement vertical si le contenu dépasse */
  box-sizing: border-box; 

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 colonnes pour les écrans moyens */
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 colonne pour les petits écrans */
  }



`
