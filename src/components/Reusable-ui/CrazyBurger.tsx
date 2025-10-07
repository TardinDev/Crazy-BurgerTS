import React from "react";
import styled from "styled-components";

type CrazyBurgerType = {
  imgWidth: string;
  imgHeight: string;
  label: string;
};

const CrazyBurger: React.FC<CrazyBurgerType> = ({ imgWidth, imgHeight, label }) => {
  return (
    <CrazyBurgerStyle $imgWidth={imgWidth} $imgHeight={imgHeight} $label={label}>
      <h1>Crazy</h1>
      <img src="/images/logo-orange.png" alt="burgerimage" />
      <h1>Burger</h1>
    </CrazyBurgerStyle>
  );
};

const CrazyBurgerStyle = styled.div<{ $imgWidth: string; $imgHeight: string; $label: string }>`
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;

  h1 {
    font-size: ${props => props.$label};
    color: #EB8317;
  }

  img {
    width: ${props => props.$imgWidth};
    height: ${props => props.$imgHeight};
  }
`;

export default CrazyBurger;
