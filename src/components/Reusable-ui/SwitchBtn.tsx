import { useContext } from "react";
import { FaCircle } from "react-icons/fa";
import styled from "styled-components";
import orderContext from "../../context/orderContext";

type SwitchBtnType = {
  isActiveBtn: boolean;
};

export default function SwitchBtn() {

  const { isActiveBtn, setIsActiveBtn } = useContext(orderContext);

  const handleSwitchBtn = () => {
    setIsActiveBtn(!isActiveBtn); 
  };

  return (
    <SwitchBtnStyle isActiveBtn={isActiveBtn} onClick={handleSwitchBtn}>
      <div className="circle">
        <FaCircle size={35} color={isActiveBtn ? "#EB8317" : "lightgrey"} />
      </div>
      <h1>{isActiveBtn ? "Disable Btn Mode" : "Active Btn Mode"}</h1>
    </SwitchBtnStyle>
  );
}

const SwitchBtnStyle = styled.div<SwitchBtnType>`
  display: flex;
  justify-content: space-between;
 
  align-items: center;
  background-color: #000;
  border: 2px solid ${(props) => (props.isActiveBtn ? "lightgrey" : "#EB8317")};
  border-radius: 18px;
  width: 16.8rem;
  padding: 0.3rem 0rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  .circle {
    position: absolute;
    top: 50%;
    left: ${(props) => (props.isActiveBtn ? "calc(100% - 45px)" : "10px")};
    transform: translateY(-50%);
    transition: left 0.5s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h1 {
    color: ${(props) => (props.isActiveBtn ? "#EB8317" : "lightgrey")};
    transition: color 0.3s ease;
    margin-left: 20px;
    text-align: ${(props) => (props.isActiveBtn ? "left" : "right")};
    width: 100%;
    padding-right: 35px;
  }
`;
