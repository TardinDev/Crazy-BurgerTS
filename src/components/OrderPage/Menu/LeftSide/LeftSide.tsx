import styled from "styled-components";
import BasketSummary from "./BasketSummary";

export default function LeftSide() {
  return (
    <LeftSideStyle>
      <BasketSummary />
      <div className="footer">
        <span>
          Order food by <strong>Tardin Dev</strong>
        </span>
      </div>
    </LeftSideStyle>
  );
}

const LeftSideStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f8f9fa;
  gap: 16px;
  padding: 16px;

  .footer {
    background-color: #000;
    color: orange;
    font-size: 1rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border-radius: 8px;
    margin-top: auto;

    strong {
      font-weight: bold;
    }
  }

  @media (max-width: 768px) {
    padding: 8px;

    .footer {
      font-size: 0.9rem;
      padding: 12px;
    }
  }
`;
