import styled from "styled-components"


type AdminContainsType = {

     isActiveTab:string;
}


export default function AdminContains({isActiveTab}:AdminContainsType) {


  return (

      <AdminContainsStyle className="adminContain">
           {isActiveTab === "button" && <h1>this button open and close</h1> }
           {isActiveTab === "new" &&   <h1>Add a new menu </h1>}
           {isActiveTab === "change" && <h1>change menu here </h1>}
      </AdminContainsStyle>

  )
}

const AdminContainsStyle = styled.div`

     
      
     height:250px;
 


`
