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
  max-height: 100%;
  background-color: #eb8317;
  gap: 12px;
  padding: 16px;
  overflow: hidden;
  border: 3px solid white;
  border-radius: 12px;

  .footer {
    background-color: #000;
    color: orange;
    font-size: 0.75rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 8px;
    border-radius: 6px;
    flex-shrink: 0;
    min-height: 32px;
    max-height: 32px;
    margin-top: auto;

    strong {
      font-weight: bold;
    }
  }

  @media (max-width: 768px) {
    padding: 8px;
    gap: 8px;

    .footer {
      font-size: 0.7rem;
      padding: 4px 6px;
      min-height: 28px;
      max-height: 28px;
    }
  }
`;
