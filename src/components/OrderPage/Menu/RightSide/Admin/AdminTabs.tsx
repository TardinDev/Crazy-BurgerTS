import styled from "styled-components";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { GiHamburger } from "react-icons/gi";
import { FaPen } from "react-icons/fa6";
import Tab from "./Tab";

type AdminTabsType = {
  isCollapsed: boolean;
  onClick: () => void;
  handleTab: (id: string) => void; 
};

export default function AdminTabs({ isCollapsed, onClick, handleTab }: AdminTabsType) {
  return (
    <AdminTabsStyle>
      <Tab
        label={isCollapsed ? "Close" : "Open"}
        onClick={onClick}
        icon={isCollapsed ? <FaArrowDown size={25} color="#686D76" /> : <FaArrowUp size={25} color="orange" />}
      />

      <Tab
        label="New"
        onClick={() => handleTab("new")} 
        icon={<GiHamburger size={25} color="#686D76" />}
      />

      <Tab
        label="Change"
        onClick={() => handleTab("change")} 
        icon={<FaPen size={25} color="#686D76" />}
      />
    </AdminTabsStyle>
  );
}

const AdminTabsStyle = styled.div`
  background-color: lightgrey;
  border: 1px solid lightgrey;
  display: flex;
  align-items: center;
  gap: 2px;
`;
