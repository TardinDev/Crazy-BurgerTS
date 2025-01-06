import styled from "styled-components";

type AdminButtonType = {

    onClick:() => void
    disabled: boolean; 

}


export default function Btn({onClick, disabled}: AdminButtonType) {

  return (
    <ButtonContainer  >
      <button onClick={onClick} disabled={disabled}> add New Burger</button>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;


  button {
    background-color:lightgrey;     
    color: white; 
    padding: 0.75rem 1.5rem;
    font-size: 1.1rem;
    font-weight: bold;
    border: none;
    border-radius: 10px; 
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
      background-color: #ff9d3d; /* Couleur de fond au survol */
      transform: translateY(-2px); /* Effet de survol */
    }

    &:active {
      background-color: #00712D; /* Couleur lorsqu'il est cliqué */
      transform: translateY(1px); /* Effet lors du clic */
    }
  }
`;
