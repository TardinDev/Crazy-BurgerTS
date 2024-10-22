import styled from "styled-components";

export default function AdminContainWelcome() {
  return (
    <AdminContainWelcomeStyle>
      <h1>Welcome to the Admin Management</h1>
      <h3>
        Click on <span>New</span> to add a new Card Burger
      </h3>
      <h3>
        Or <span>Change</span> to modify a Card
      </h3>
    </AdminContainWelcomeStyle>
  );
}

const AdminContainWelcomeStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1c1c3c; 
  padding: 1rem 5rem;
  height:100%;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  
  font-family: 'Playfair Display', serif; /* Utilisation d'une police élégante */

  h1 {
    color: #eb8317;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-align: center;
    transition: transform 0.3s ease-in-out; /* Ajout de la transition pour le zoom */
  }

  h3 {
    color: #ffffff;
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    text-align: center;
    transition: transform 0.3s ease-in-out; /* Ajout de la transition pour le zoom */

    span {
      color: #eb8317;
      font-weight: bold;
      transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
      cursor: pointer;

      &:hover {
        color: #ffbd73;
        transform: scale(1.1); /* Effet de zoom sur le texte */
      }
    }
  }

  /* Zoom sur le texte lorsque le conteneur est survolé */
  &:hover h1 {
    transform: scale(1.1); /* Zoom sur le titre */
  }

  &:hover h3 {
    transform: scale(1.05); /* Zoom sur les sous-titres */
  }

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Effet d'ombre supplémentaire */
  }
`;
