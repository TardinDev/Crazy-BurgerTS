import React, { useContext } from 'react';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus, FaClock, FaTag } from 'react-icons/fa';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import orderContext from '../../../../context/orderContext';
import { formatPrice } from '../../../../lib/utils';
import { Card } from '../../../Reusable-ui/Card';
import { Button } from '../../../Reusable-ui/Button';
import { Badge } from '../../../Reusable-ui/Badge';

export const BasketSummary: React.FC = () => {
  const { basket, removeFromBasket, updateBasketItemQuantity, clearBasket } = useContext(orderContext);
  const [promoCode, setPromoCode] = React.useState('');
  const [discount, setDiscount] = React.useState(0);

  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% de taxes
  const discountAmount = subtotal * discount;
  const total = subtotal + tax - discountAmount;
  const estimatedTime = totalItems * 3 + 10; // 3 min par item + 10 min de base

  const handleApplyPromo = () => {
    const validCodes: { [key: string]: number } = {
      'BURGER10': 0.1,
      'SUMMER20': 0.2,
      'WELCOME15': 0.15,
    };

    if (validCodes[promoCode.toUpperCase()]) {
      setDiscount(validCodes[promoCode.toUpperCase()]);
      toast.success(`Code promo "${promoCode.toUpperCase()}" appliqué ! -${validCodes[promoCode.toUpperCase()] * 100}%`, {
        icon: '🎉',
        duration: 4000,
      });
    } else {
      toast.error('Code promo invalide', {
        icon: '❌',
      });
    }
  };

  const handleRemoveItem = (id: string, title: string) => {
    removeFromBasket(id);
    toast.success(`"${title}" retiré du panier`, {
      icon: '🗑️',
    });
  };

  const handleClearBasket = () => {
    clearBasket();
    setDiscount(0);
    setPromoCode('');
    toast.success('Panier vidé', {
      icon: '🧹',
    });
  };

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

  // Auto-scroll vers le bas quand un nouvel item est ajouté
  const basketItemsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (basketItemsRef.current && basket.length > 0) {
      setTimeout(() => {
        basketItemsRef.current?.scrollTo({
          top: basketItemsRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [basket.length]);

  return (
    <BasketContainer>
      <Card padding="lg" shadow="md" fullHeight={true}>
        <BasketContent>
          <SummaryHeaderWrapper>
            <SummaryHeaderTop>
              <FaShoppingCart size={20} />
              <Badge variant="primary" size="sm">
                {totalItems} article{totalItems > 1 ? 's' : ''}
              </Badge>
              {basket.length > 0 && (
                <ClearButton
                  variant="danger"
                  size="sm"
                  onClick={handleClearBasket}
                >
                  Vider
                </ClearButton>
              )}
            </SummaryHeaderTop>
          </SummaryHeaderWrapper>

          <BasketItems ref={basketItemsRef}>
            <AnimatePresence mode="popLayout">
              {basket.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -50, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.8, transition: { duration: 0.2 } }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (offset.x > 100 || velocity.x > 500) {
                      handleRemoveItem(item.id, item.title);
                    }
                  }}
                >
                  <BasketItem>
                    <ItemImage src={item.image} alt={item.title} />
                    <ItemDetails>
                      <ItemName>{item.title}</ItemName>
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
                    <DeleteButtonWrapper>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id, item.title)}
                        rightIcon={<FaTrash size={10} />}
                      />
                    </DeleteButtonWrapper>
                  </BasketItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </BasketItems>

          <BasketFooter>
            <Divider />

            {/* Estimation de livraison */}
            <EstimationSection>
              <FaClock size={16} color="#ffa500" />
              <span>Temps estimé: <strong>{estimatedTime} min</strong></span>
            </EstimationSection>

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
  height: 100%;
`;

const BasketContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  max-height: 100%;
  overflow: hidden;
`;

const BasketFooter = styled.div`
  flex-shrink: 0;
  padding-top: 8px;
  background: ${({ theme }) => theme.colors.background.primary};
  position: sticky;
  bottom: 0;
  z-index: 10;
`;

const EmptyBasket = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
  background: linear-gradient(135deg, #f8fafe 0%, #e8f4f8 100%);
  border-radius: 16px;
  margin: 8px 0;
  border: 2px dashed #cbd5e1;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  svg {
    opacity: 0.5;
    animation: bounce 2s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  p {
    margin: 20px 0 8px;
    font-size: 20px;
    font-weight: 600;
    color: #475569;
  }

  small {
    font-size: 14px;
    color: #94a3b8;
  }
`;

const SummaryHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f1f5f9;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.background.primary};
  position: sticky;
  top: 0;
  z-index: 10;
  padding-top: 2px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
    padding-bottom: 8px;
  }
`;

const SummaryHeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
  flex-wrap: nowrap;

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    gap: 6px;
    font-size: 12px;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 480px) {
    font-size: 11px;
    gap: 4px;

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const ClearButton = styled(Button)`
  min-width: 80px;
  justify-content: center;
  white-space: nowrap;
  margin-left: auto;

  @media (max-width: 768px) {
    min-width: 70px;
  }

  @media (max-width: 480px) {
    min-width: 60px;
  }
`;


const BasketItems = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 8px;
  padding: 4px 8px 4px 0;
  min-height: 200px;
  max-height: 100%;
  scroll-behavior: smooth;

  /* Style de la scrollbar pour une meilleure UX */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    margin: 4px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #ffa500 0%, #ff8c00 100%);
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #ffb730 0%, #ffa500 100%);
  }

  /* Indicateur visuel qu'il y a plus de contenu */
  &::after {
    content: '';
    display: block;
    height: 4px;
  }

  @media (max-width: 1024px) {
    padding: 4px;
  }

  @media (max-width: 768px) {
    &::-webkit-scrollbar {
      width: 4px;
    }
    min-height: 150px;
  }
`;

const BasketItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas:
    "image details delete"
    "image controls delete";
  align-items: center;
  gap: 8px 6px;
  padding: 10px;
  margin: 5px 0;
  background: linear-gradient(135deg, #fff5e6 0%, #ffe4c0 50%, #ffcc80 100%);
  border-radius: 12px;
  border: 3px solid #ff8c00;
  box-shadow:
    0 6px 16px rgba(255, 140, 0, 0.35),
    0 0 0 2px rgba(255, 165, 0, 0.2),
    inset 0 2px 0 rgba(255, 255, 255, 0.7);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  font-weight: 600;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background: linear-gradient(180deg, #ff6600 0%, #ff4500 100%);
    box-shadow: 0 0 12px rgba(255, 102, 0, 0.8), 2px 0 6px rgba(255, 140, 0, 0.4);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(255, 140, 0, 0.15) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover {
    background: linear-gradient(135deg, #fff0d0 0%, #ffd080 50%, #ffb850 100%);
    border-color: #ff6600;
    box-shadow:
      0 8px 24px rgba(255, 102, 0, 0.45),
      0 0 0 4px rgba(255, 140, 0, 0.25),
      inset 0 2px 0 rgba(255, 255, 255, 0.8);
    transform: translateY(-3px) translateX(3px) scale(1.02);

    &::before {
      width: 6px;
      box-shadow: 0 0 16px rgba(255, 102, 0, 1), 3px 0 8px rgba(255, 140, 0, 0.6);
    }

    &::after {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-1px) translateX(1px) scale(1);
    box-shadow:
      0 4px 12px rgba(255, 140, 0, 0.35),
      0 0 0 2px rgba(255, 165, 0, 0.2),
      inset 0 2px 0 rgba(255, 255, 255, 0.7);
  }

  @media (max-width: 768px) {
    gap: 6px 5px;
    padding: 7px;
    margin: 4px 0;
    border-width: 2px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    margin: 3px 0;
  }
`;

const ItemImage = styled.img`
  grid-area: image;
  grid-row: 1 / 3;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
  border: 3px solid #ff8c00;
  transition: all 0.3s ease;
  box-shadow:
    0 3px 8px rgba(255, 140, 0, 0.5),
    0 0 0 2px rgba(255, 165, 0, 0.2),
    inset 0 2px 0 rgba(255, 255, 255, 0.4);

  ${BasketItem}:hover & {
    border-color: #ff6600;
    transform: scale(1.08) rotate(3deg);
    box-shadow:
      0 6px 16px rgba(255, 102, 0, 0.6),
      0 0 0 3px rgba(255, 140, 0, 0.3),
      inset 0 2px 0 rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    border-width: 2px;
  }

  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
  }
`;

const ItemDetails = styled.div`
  grid-area: details;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  padding-right: 4px;
`;

const ItemName = styled.div`
  font-weight: 800;
  color: #1e293b;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  letter-spacing: 0.4px;
  transition: color 0.3s ease;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);

  ${BasketItem}:hover & {
    color: #b45309;
    text-shadow: 0 2px 4px rgba(255, 140, 0, 0.4);
  }

  @media (max-width: 768px) {
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const ItemPrice = styled.div`
  color: #475569;
  font-size: 9px;
  font-weight: 600;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 8px;
  }
`;

const ItemTotal = styled.div`
  color: #dc2626;
  font-weight: 900;
  font-size: 14px;
  text-shadow: 0 2px 4px rgba(220, 38, 38, 0.3);
  letter-spacing: 0.4px;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const QuantityControls = styled.div`
  grid-area: controls;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-self: start;
  background: rgba(255, 255, 255, 0.7);
  padding: 4px;
  border-radius: 8px;
  border: 2px solid #ff8c00;
  box-shadow:
    inset 0 1px 3px rgba(255, 140, 0, 0.15),
    0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    gap: 4px;
    padding: 3px;
  }
`;

const DeleteButtonWrapper = styled.div`
  grid-area: delete;
  grid-row: 1 / 3;
  display: flex;
  align-items: center;
  justify-self: end;
`;

const QuantityButton = styled.button`
  background: linear-gradient(135deg, #fff 0%, #ffe0a8 100%);
  border: 2px solid #ff8c00;
  border-radius: 6px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #d97706;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(255, 140, 0, 0.35);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #ffa500 0%, #ff8c00 100%);
    border-color: #ff6600;
    color: #fff;
    transform: scale(1.2);
    box-shadow: 0 3px 8px rgba(255, 102, 0, 0.6);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    background: #f5f5f5;
    border-color: #d1d5db;
    color: #9ca3af;
  }

  svg {
    width: 8px;
    height: 8px;
  }

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;

    svg {
      width: 7px;
      height: 7px;
    }
  }
`;

const QuantityDisplay = styled.span`
  min-width: 18px;
  text-align: center;
  font-weight: 900;
  font-size: 12px;
  color: #dc2626;
  text-shadow: 0 1px 2px rgba(220, 38, 38, 0.3);
  padding: 0 3px;

  @media (max-width: 768px) {
    font-size: 11px;
    min-width: 16px;
  }
`;


const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #e2e8f0;
  margin: 8px 0;
`;

const EstimationSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 4px;
  margin-bottom: 4px;
  border: 1px solid #bae6fd;

  svg {
    width: 10px;
    height: 10px;
    flex-shrink: 0;
  }

  span {
    color: #0c4a6e;
    font-size: 9px;
    line-height: 1.1;
  }

  strong {
    color: #ffa500;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    padding: 2px 5px;
    gap: 3px;

    svg {
      width: 9px;
      height: 9px;
    }

    span {
      font-size: 8px;
    }
  }
`;

const PromoSection = styled.div`
  margin-bottom: 4px;
`;

const PromoInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 3px 5px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  svg {
    width: 9px;
    height: 9px;
    flex-shrink: 0;
  }

  &:focus-within {
    border-color: #ffa500;
    box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 2px 4px;
    gap: 2px;

    svg {
      width: 8px;
      height: 8px;
    }
  }
`;

const PromoInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 9px;
  color: #1e293b;
  background: transparent;
  text-transform: uppercase;
  line-height: 1.1;

  &::placeholder {
    color: #94a3b8;
    text-transform: none;
    font-size: 8px;
  }

  @media (max-width: 768px) {
    font-size: 8px;
  }
`;

const PromoApplied = styled.div`
  margin-top: 2px;
  padding: 2px 5px;
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border-radius: 4px;
  color: #166534;
  font-size: 8px;
  font-weight: 600;
  border: 1px solid #86efac;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 7px;
    padding: 2px 4px;
  }
`;

const TotalSection = styled.div`
  margin-bottom: 6px;
  padding: 4px 6px;
  background: linear-gradient(135deg, #fff8e1 0%, #ffe4b5 100%);
  border-radius: 6px;
  border: 1.5px solid #ffa500;
  box-shadow: 0 1px 4px rgba(255, 165, 0, 0.2);

  @media (max-width: 768px) {
    padding: 3px 5px;
    margin-bottom: 5px;
  }
`;

const TotalLine = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1px 0;
  font-size: 9px;
  color: #64748b;
  line-height: 1.2;

  &.discount {
    color: #22c55e;
    font-weight: 600;
  }

  span:first-child {
    font-weight: 500;
  }

  span:last-child {
    font-weight: 600;
    color: #1e293b;
  }

  @media (max-width: 768px) {
    font-size: 8px;
  }
`;

const FinalTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 800;
  font-size: 14px;
  color: #1e293b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 6px 0;

  span:last-child {
    color: #ff8c00;
    font-size: 24px;
    font-weight: 900;
    text-shadow: 0 2px 4px rgba(255, 140, 0, 0.4);
  }

  @media (max-width: 768px) {
    font-size: 13px;

    span:last-child {
      font-size: 20px;
    }
  }

  @media (max-width: 480px) {
    font-size: 12px;

    span:last-child {
      font-size: 18px;
    }
  }
`;


export default BasketSummary;