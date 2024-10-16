import { useState } from "react"




export default function LoginPage() {


    const [inputName, setInputName] = useState("")



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

          e.preventDefault()
    }



    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
          
          setInputName(e.target.value)

    }




  return (

    <div>

        <h1>Crazy-burger</h1>



        <form action="submit" onSubmit={handleSubmit}>
           <input 
              type="text" 
              placeholder="write your name"
              required
              value={inputName}
              onChange={handleChange}/>
           <button>get in your account</button>
        </form>

    </div>

  )
}
