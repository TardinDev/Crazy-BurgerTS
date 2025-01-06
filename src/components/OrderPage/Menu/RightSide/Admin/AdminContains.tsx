import styled from "styled-components"
import AdminContainWelcome from "./AdminContainWelcome";
import TabContain from "../../../../Reusable-ui/TabContain";


type AdminContainsType = {

     isActiveTab:string;
}


export default function AdminContains({isActiveTab}:AdminContainsType) {


  return (

      <AdminContainsStyle className="adminContain">
           {isActiveTab === "button" && <AdminContainWelcome /> }
           {isActiveTab === "new" &&   <TabContain />}
           {isActiveTab === "change" && <h1>Push to Change your Card for news data Burgers</h1>}
      </AdminContainsStyle>

  )
}

const AdminContainsStyle = styled.div`

     
      
     height:250px;
     background-color:grey;
 


`
