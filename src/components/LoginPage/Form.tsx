import { useState } from "react"
import styled from "styled-components"


type FormType = {

    isInputClick: boolean,
    
}



export default function Form() {



    const [inputName, setInputName] = useState("")
    const [isInputClick, setIsInputClick] = useState(false)


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

          e.preventDefault()
    }



    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
          
          setInputName(e.target.value)

    }


    const changeBackground = () => {
        setIsInputClick(true)
  }



  return (

    <FormStyle action="submit" onSubmit={handleSubmit} isInputClick={isInputClick}>

           <input 
              type="text" 
              placeholder="...write your name..."
              required
              value={inputName}
              onChange={handleChange}
              onClick={changeBackground}
              />
           <button>Get in your account !</button>

    </FormStyle>

  )
}

const FormStyle = styled.form<FormType>`

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
        background-color:${props => props.isInputClick ? "green" : "lightgrey" };
        color:${props => props.isInputClick ? "orange" : "grey" };
        width:20.70rem;
        height:2rem;
        font-weight:bold;

        border:0.5px solid green;
        border-radius:5px;

        padding:0px 5px;
        text-align:center;

        cursor:pointer;
      }

     

`
