import React, { useContext } from 'react';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import styled from 'styled-components';
import orderContext from '../../../../context/orderContext';
import { formatPrice } from '../../../../lib/utils';

export const BasketSummary: React.FC = () => {
  const { basket, removeFromBasket, updateBasketItemQuantity, clearBasket } = useContext(orderContext);

  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% de taxes
  const total = subtotal + tax;

  if (totalItems === 0) {
    return (
      <SummaryContainer>
        <EmptyBasket>
          <FaShoppingCart size={48} color="#ccc" />
          <p>Votre panier est vide</p>
          <small>Ajoutez des burgers pour commencer</small>
        </EmptyBasket>
      </SummaryContainer>
    );
  }

  return (
    <SummaryContainer>
      <SummaryHeader>
        <FaShoppingCart size={20} />
        <span>Panier ({totalItems} article{totalItems > 1 ? 's' : ''})</span>
        {basket.length > 0 && (
          <ClearBasketButton onClick={clearBasket} title="Vider le panier">
            Vider
          </ClearBasketButton>
        )}
      </SummaryHeader>

      <BasketItems>
        {basket.map((item) => (
          <BasketItem key={item.id}>
            <ItemImage src={item.image} alt={item.title} />
            <ItemDetails>
              <ItemName>{item.title}</ItemName>
              <ItemPrice>{formatPrice(item.price)} × {item.quantity}</ItemPrice>
              <ItemTotal>{formatPrice(item.price * item.quantity)}</ItemTotal>
            </ItemDetails>
            <QuantityControls>
              <QuantityButton
                onClick={() => updateBasketItemQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <FaMinus size={10} />
              </QuantityButton>
              <QuantityDisplay>{item.quantity}</QuantityDisplay>
              <QuantityButton
                onClick={() => updateBasketItemQuantity(item.id, item.quantity + 1)}
              >
                <FaPlus size={10} />
              </QuantityButton>
            </QuantityControls>
            <RemoveButton
              onClick={() => removeFromBasket(item.id)}
              title="Retirer du panier"
            >
              <FaTrash size={12} />
            </RemoveButton>
          </BasketItem>
        ))}
      </BasketItems>

      <Divider />

      <TotalSection>
        <TotalLine>
          <span>Sous-total:</span>
          <span>{formatPrice(subtotal)}</span>
        </TotalLine>
        <TotalLine>
          <span>Taxes (10%):</span>
          <span>{formatPrice(tax)}</span>
        </TotalLine>
        <FinalTotal>
          <span>Total:</span>
          <span>{formatPrice(total)}</span>
        </FinalTotal>
      </TotalSection>

      <CheckoutButton>
        Commander {formatPrice(total)}
      </CheckoutButton>
    </SummaryContainer>
  );
};

const SummaryContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid #f1f5f9;
`;

const EmptyBasket = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #64748b;

  p {
    margin: 16px 0 8px;
    font-size: 18px;
    font-weight: 500;
  }

  small {
    font-size: 14px;
    color: #94a3b8;
  }
`;

const SummaryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-weight: 600;
  color: #1e293b;
  font-size: 16px;

  span {
    flex: 1;
  }
`;

const ClearBasketButton = styled.button`
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #fecaca;
  }
`;

const BasketItems = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 16px;
`;

const BasketItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: 500;
  color: #1e293b;
  font-size: 14px;
  margin-bottom: 2px;
`;

const ItemPrice = styled.div`
  color: #64748b;
  font-size: 12px;
  margin-bottom: 2px;
`;

const ItemTotal = styled.div`
  color: #eb8317;
  font-weight: 600;
  font-size: 14px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
`;

const QuantityButton = styled.button`
  background: #f1f5f9;
  border: none;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #e2e8f0;
    color: #1e293b;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 24px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  color: #1e293b;
`;

const RemoveButton = styled.button`
  background: #fee2e2;
  border: none;
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  color: #dc2626;
  transition: all 0.2s ease;

  &:hover {
    background: #fecaca;
    transform: scale(1.05);
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #e2e8f0;
  margin: 16px 0;
`;

const TotalSection = styled.div`
  margin-bottom: 20px;
`;

const TotalLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #64748b;
  font-size: 14px;
`;

const FinalTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 18px;
  color: #1e293b;
  padding-top: 8px;
  border-top: 2px solid #e2e8f0;
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: #eb8317;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #d4741a;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(235, 131, 23, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default BasketSummary;