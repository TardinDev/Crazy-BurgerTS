import { FaCircle } from "react-icons/fa"
import styled from "styled-components"



export default function SwitchBtn() {


  return (

      <SwitchBtnStyle>

          <h1> Active Admin Mode </h1>
          <FaCircle size={35} color="lightgrey"/>

      </SwitchBtnStyle>

  )

}

const SwitchBtnStyle = styled.div`

    background-color:#000;
   
    border:2px solid lightgrey;
    border-radius:20px;
    padding: 0.3rem 0.5rem;
    text-align:center;
    cursor:pointer;

    display:flex;
    align-items:center;
    gap:10px;


    

    h1 {
      color:lightgrey;
    }

`
