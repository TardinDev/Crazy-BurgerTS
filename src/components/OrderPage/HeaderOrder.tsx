import styled from "styled-components"
import CrazyBurger from "../Reusable-ui/CrazyBurger"
import { Link } from "react-router-dom"



export default function HeaderOrder({inputName}: string) {


  return (

    <HeaderOrderStyle >

       <CrazyBurger imgWidth="4rem" imgHeight="3rem" label="2rem"/>

        <div className="rightSide">
           <h1> Hey, {inputName}</h1>
           <Link to="/" >disconnexion</Link>
        </div>
   

     </HeaderOrderStyle>   
   
   
  )
}

const HeaderOrderStyle = styled.div`

         background-color:#fff;
         padding:0rem 1rem;

         display:flex;
         justify-content:space-between;


         h1 {
           font-size:1.5rem;
         
         }


`
