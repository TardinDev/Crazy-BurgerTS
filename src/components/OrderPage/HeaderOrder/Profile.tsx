import { BsPersonCircle } from "react-icons/bs"
import { Link } from "react-router-dom"
import styled from "styled-components"
import SwitchBtn from "../../Reusable-ui/SwitchBtn";


type ProfileType = {
  inputName?: string; // inputName peut être string ou undefined
};


export default function Profile({inputName}: ProfileType) {


  return (

     <ProfileStyle >

      <SwitchBtn/>

       <div>
          <h1> Hey, <span> {inputName} </span> </h1>
           <Link to="/" >disconnexion</Link>
       </div>

      <BsPersonCircle size={55} color="lightgrey" />
  
    </ProfileStyle>


  )
}


const ProfileStyle = styled.div`

   display:flex;
   align-items:center;
   gap:10px;
   padding-top:10px;




`
