import styled from "styled-components";



type TabProps = {

    onClick:() => void, 
    label:string, 
    icon: React.ReactNode; // L'icône, typée comme ReactNode pour accepter n'importe quel composant JSX
}

export default function Tab({onClick, label, icon}: TabProps) {


  return (

    <TabStyle onClick={onClick}>
      <h3 >{label}</h3>
      <span>{icon}</span>
      
    </TabStyle>

  )
}

const TabStyle = styled.div`


   
      background-color:#fff;
      border-radius:2px;
      cursor:pointer;
      padding:3px 10px;

      display:flex;
      align-items:center;
      gap:5px;


     h3 {
     
       color:#686D76;
     }

     
    


`
