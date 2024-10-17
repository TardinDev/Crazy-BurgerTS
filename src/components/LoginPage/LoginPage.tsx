import { useState } from "react"
import CrazyBurger from "../Reusable-ui/CrazyBurger"
import styled from "styled-components"




export default function LoginPage() {


    const [inputName, setInputName] = useState("")



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

          e.preventDefault()
    }



    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
          
          setInputName(e.target.value)

    }




  return (

    <LoginPageStyle>

        <CrazyBurger imgWidth="10rem" imgHeight="8rem" label="8rem"/>


        <form action="submit" onSubmit={handleSubmit}>
           <input 
              type="text" 
              placeholder="write your name"
              required
              value={inputName}
              onChange={handleChange}/>
           <button>get in your account</button>
        </form>

    </LoginPageStyle>

  )
}


const LoginPageStyle = styled.div`

     background-color:#EB8317;
     height:100vh;

     


`