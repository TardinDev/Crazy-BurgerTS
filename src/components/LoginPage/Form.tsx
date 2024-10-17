import { useState } from "react"
import styled from "styled-components"



export default function Form() {



    const [inputName, setInputName] = useState("")



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

          e.preventDefault()
    }



    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
          
          setInputName(e.target.value)

    }


  return (

    <FormStyle action="submit" onSubmit={handleSubmit}>

           <input 
              type="text" 
              placeholder="...write your name..."
              required
              value={inputName}
              onChange={handleChange}/>
           <button>get in your account</button>

    </FormStyle>

  )
}

const FormStyle = styled.form`

      display:flex;
      flex-direction:column;
      gap:10px;

      input {
        width:20rem;
        height:2rem;

        border:0.5px solid orange;
        border-radius:5px;

        padding:0px 5px;
        text-align:center;
      }

      button {
        width:20.70rem;
        height:2rem;

        border:0.5px solid green;
        border-radius:5px;

        padding:0px 5px;
        text-align:center;
      }

     

`
