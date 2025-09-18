import React, { useContext } from 'react';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import styled from 'styled-components';
import orderContext from '../../../../context/orderContext';
import { formatPrice } from '../../../../lib/utils';
import { Card } from '../../../Reusable-ui/Card';
import { Button } from '../../../Reusable-ui/Button';
import { Badge } from '../../../Reusable-ui/Badge';

export const BasketSummary: React.FC = () => {
  const { basket, removeFromBasket, updateBasketItemQuantity, clearBasket } = useContext(orderContext);

  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% de taxes
  const total = subtotal + tax;

  if (totalItems === 0) {
    return (
      <Card padding="lg" shadow="md">
        <EmptyBasket>
          <FaShoppingCart size={48} color="#ccc" />
          <p>Votre panier est vide</p>
          <small>Ajoutez des burgers pour commencer</small>
        </EmptyBasket>
      </Card>
    );
  }

  return (
    <BasketContainer>
      <Card padding="lg" shadow="md" fullHeight={true}>
        <BasketContent>
          <SummaryHeader>
            <FaShoppingCart size={20} />
            <span>Panier</span>
            <Badge variant="primary" size="sm">
              {totalItems} article{totalItems > 1 ? 's' : ''}
            </Badge>
            {basket.length > 0 && (
              <Button
                variant="danger"
                size="sm"
                onClick={clearBasket}
              >
                Vider
              </Button>
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
                    <FaMinus size={8} />
                  </QuantityButton>
                  <QuantityDisplay>{item.quantity}</QuantityDisplay>
                  <QuantityButton
                    onClick={() => updateBasketItemQuantity(item.id, item.quantity + 1)}
                  >
                    <FaPlus size={8} />
                  </QuantityButton>
                </QuantityControls>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromBasket(item.id)}
                  rightIcon={<FaTrash size={10} />}
                />
              </BasketItem>
            ))}
          </BasketItems>

          <BasketFooter>
            <Divider />

            <TotalSection>
              <FinalTotal>
                <span>Total:</span>
                <span>{formatPrice(total)}</span>
              </FinalTotal>
            </TotalSection>

            <Button
              variant="primary"
              size="md"
              isFullWidth
            >
              Commander
            </Button>
          </BasketFooter>
        </BasketContent>
      </Card>
    </BasketContainer>
  );
};


const BasketContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
`;

const BasketContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
`;

const BasketFooter = styled.div`
  flex-shrink: 0;
  padding-top: 8px;
`;

const EmptyBasket = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #64748b;
  background: #f8fafe;
  border-radius: 8px;
  margin: 8px 0;

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
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
  font-weight: 600;
  color: #1e293b;
  font-size: 16px;

  span {
    flex: 1;
  }
`;


const BasketItems = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 8px;
  padding: 4px 0;
  min-height: 0;

  /* Style de la scrollbar pour une meilleure UX */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const BasketItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 4px;
  margin: 2px 0;
  background: #000000;
  border-radius: 4px;
  border: 1px solid #333333;
  transition: all 0.2s ease;

  &:hover {
    background: #1a1a1a;
    box-shadow: 0 1px 3px rgba(255, 255, 255, 0.1);
  }
`;

const ItemImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
`;

const ItemDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.div`
  font-weight: 500;
  color: #ffffff;
  font-size: 12px;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
`;

const ItemPrice = styled.div`
  color: #cccccc;
  font-size: 10px;
  margin-bottom: 1px;
`;

const ItemTotal = styled.div`
  color: #ffa500;
  font-weight: 600;
  font-size: 12px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
`;

const QuantityButton = styled.button`
  background: #333333;
  border: 1px solid #555555;
  border-radius: 3px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ffffff;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #444444;
    color: #ffa500;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 20px;
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  color: #ffffff;
`;


const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #e2e8f0;
  margin: 8px 0;
`;

const TotalSection = styled.div`
  margin-bottom: 12px;
  padding: 8px 12px;
  background: #f6f9fc;
  border-radius: 6px;
`;


const FinalTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 16px;
  color: #1e293b;
  padding-top: 8px;
  border-top: 1px solid #e2e8f0;
`;


export default BasketSummary;