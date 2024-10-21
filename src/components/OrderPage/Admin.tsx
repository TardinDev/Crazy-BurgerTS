import styled from "styled-components";
import AdminTabs from "./AdminTabs";
import AdminContains from "./AdminContains";
import { useState } from "react";





export default function Admin() {

  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleCollapsed = () => {

        setIsCollapsed(!isCollapsed)
  }


  return (

    <AdminStyle>

     
      <AdminTabs onClick={handleCollapsed}/>

      {isCollapsed && <AdminContains/> }

    </AdminStyle>

  );

}

const AdminStyle = styled.div`


  background-color:blue;
  position: absolute; 
  z-index:2;
  bottom:0;
  left:0;
  right:0;


 
`
