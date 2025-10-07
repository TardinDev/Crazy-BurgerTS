import { BsPersonCircle } from "react-icons/bs"
import { Link } from "react-router-dom"
import styled from "styled-components"


type ProfileType = {
  inputName?: string;
};


export default function Profile({inputName}: ProfileType) {
  return (
     <ProfileStyle>
       <div className="user-info">
          <h1> Hey, <span> {inputName} </span> </h1>
          <Link to="/" >Déconnexion</Link>
       </div>

       <BsPersonCircle size={55} color="lightgrey" />
    </ProfileStyle>
  )
}


const ProfileStyle = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-end;
   gap: 12px;

   .user-info {
     display: flex;
     flex-direction: column;
     gap: 4px;

     h1 {
       margin: 0;
       font-size: 18px;
       font-weight: 600;
       color: #1e293b;
       line-height: 1.2;

       span {
         color: #ffa500;
         font-weight: 700;
       }
     }

     a {
       font-size: 13px;
       color: #64748b;
       text-decoration: none;
       transition: color 0.3s ease;

       &:hover {
         color: #ffa500;
       }
     }
   }

   svg {
     flex-shrink: 0;
   }

   @media (max-width: 768px) {
     gap: 10px;

     .user-info h1 {
       font-size: 16px;
     }

     .user-info a {
       font-size: 12px;
     }
   }

   @media (max-width: 480px) {
     gap: 8px;

     .user-info h1 {
       font-size: 14px;
     }

     .user-info a {
       font-size: 11px;
     }
   }
`
