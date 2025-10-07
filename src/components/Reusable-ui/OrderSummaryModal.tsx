import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaShoppingBag, FaHome, FaUmbrellaBeach, FaTag, FaCreditCard, FaCashRegister, FaWifi, FaCcVisa, FaCcMastercard, FaPaypal, FaApplePay } from 'react-icons/fa';
import { formatPrice } from '../../lib/utils';
import { Button } from './Button';
import toast from 'react-hot-toast';

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onPayment: (seatingChoice: 'interior' | 'terrace', paymentMethod: string, promoCode?: string) => void;
}

export const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({
  isOpen,
  onClose,
  items,
  onPayment,
}) => {
  const [seatingChoice, setSeatingChoice] = useState<'interior' | 'terrace' | null>(null);
  const [paymentType, setPaymentType] = useState<'terminal' | 'counter' | 'online' | null>(null);
  const [onlinePaymentMethod, setOnlinePaymentMethod] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const discountAmount = subtotal * discount;
  const total = subtotal + tax - discountAmount;

  const validCodes: { [key: string]: number } = {
    'BURGER10': 0.1,
    'SUMMER20': 0.2,
    'WELCOME15': 0.15,
  };

  const handleApplyPromo = () => {
    if (validCodes[promoCode.toUpperCase()]) {
      setDiscount(validCodes[promoCode.toUpperCase()]);
      toast.success(`Code promo "${promoCode.toUpperCase()}" appliqué ! -${validCodes[promoCode.toUpperCase()] * 100}%`, {
        icon: '🎉',
        duration: 3000,
      });
    } else {
      toast.error('Code promo invalide', {
        icon: '❌',
      });
    }
  };

  const handlePayment = () => {
    if (!seatingChoice) {
      toast.error('Veuillez choisir un emplacement', { icon: '⚠️' });
      return;
    }
    if (!paymentType) {
      toast.error('Veuillez choisir un mode de paiement', { icon: '⚠️' });
      return;
    }
    if (paymentType === 'online' && !onlinePaymentMethod) {
      toast.error('Veuillez choisir un moyen de paiement en ligne', { icon: '⚠️' });
      return;
    }

    const paymentMethod = paymentType === 'online' ? onlinePaymentMethod! : paymentType;
    onPayment(seatingChoice, paymentMethod, discount > 0 ? promoCode : undefined);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalWrapper>
          <Overlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <ModalContainer
            as={motion.div}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ModalHeader>
              <ModalTitle>
                <FaShoppingBag size={24} />
                Récapitulatif de commande
              </ModalTitle>
              <CloseButton onClick={onClose}>
                <FaTimes size={20} />
              </CloseButton>
            </ModalHeader>

            <ModalContent>
              {/* Order Items */}
              <OrderItemsSection>
                <SectionTitle>Vos articles</SectionTitle>
                <OrderItemsList>
                  {items.map((item) => (
                    <OrderItemCard key={item.id}>
                      <ItemImage src={item.image} alt={item.title} />
                      <ItemDetails>
                        <ItemName>{item.title}</ItemName>
                        <ItemQuantity>Quantité: {item.quantity}</ItemQuantity>
                      </ItemDetails>
                      <ItemPrice>{formatPrice(item.price * item.quantity)}</ItemPrice>
                    </OrderItemCard>
                  ))}
                </OrderItemsList>
              </OrderItemsSection>

              {/* Promo Code */}
              <PromoSection>
                <SectionTitle>Code promo</SectionTitle>
                <PromoInputWrapper>
                  <FaTag size={14} />
                  <PromoInput
                    type="text"
                    placeholder="Entrez votre code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleApplyPromo}
                    disabled={!promoCode}
                  >
                    Appliquer
                  </Button>
                </PromoInputWrapper>
                {discount > 0 && (
                  <PromoApplied>
                    ✅ Réduction de {discount * 100}% appliquée
                  </PromoApplied>
                )}
              </PromoSection>

              {/* Totals */}
              <TotalsSection>
                <TotalLine>
                  <span>Sous-total:</span>
                  <span>{formatPrice(subtotal)}</span>
                </TotalLine>
                <TotalLine>
                  <span>Taxes (10%):</span>
                  <span>{formatPrice(tax)}</span>
                </TotalLine>
                {discount > 0 && (
                  <TotalLine className="discount">
                    <span>Réduction:</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </TotalLine>
                )}
                <FinalTotal>
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </FinalTotal>
              </TotalsSection>

              {/* Seating Choice */}
              <SeatingSection>
                <SectionTitle>Choisir votre emplacement</SectionTitle>
                <SeatingChoices>
                  <SeatingCard
                    selected={seatingChoice === 'interior'}
                    onClick={() => setSeatingChoice('interior')}
                  >
                    <FaHome size={32} />
                    <SeatingLabel>Intérieur</SeatingLabel>
                  </SeatingCard>
                  <SeatingCard
                    selected={seatingChoice === 'terrace'}
                    onClick={() => setSeatingChoice('terrace')}
                  >
                    <FaUmbrellaBeach size={32} />
                    <SeatingLabel>Terrasse</SeatingLabel>
                  </SeatingCard>
                </SeatingChoices>
              </SeatingSection>

              {/* Payment Type */}
              <PaymentSection>
                <SectionTitle>Mode de paiement</SectionTitle>
                <PaymentTypeChoices>
                  <PaymentTypeCard
                    selected={paymentType === 'terminal'}
                    onClick={() => {
                      setPaymentType('terminal');
                      setOnlinePaymentMethod(null);
                    }}
                  >
                    <FaCreditCard size={28} />
                    <PaymentLabel>Sur la borne</PaymentLabel>
                  </PaymentTypeCard>
                  <PaymentTypeCard
                    selected={paymentType === 'counter'}
                    onClick={() => {
                      setPaymentType('counter');
                      setOnlinePaymentMethod(null);
                    }}
                  >
                    <FaCashRegister size={28} />
                    <PaymentLabel>À la caisse</PaymentLabel>
                  </PaymentTypeCard>
                  <PaymentTypeCard
                    selected={paymentType === 'online'}
                    onClick={() => setPaymentType('online')}
                  >
                    <FaWifi size={28} />
                    <PaymentLabel>En ligne</PaymentLabel>
                  </PaymentTypeCard>
                </PaymentTypeChoices>

                {/* Online Payment Methods */}
                {paymentType === 'online' && (
                  <OnlinePaymentMethods
                    as={motion.div}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <OnlineMethodLabel>Choisir un moyen de paiement:</OnlineMethodLabel>
                    <OnlineMethodsGrid>
                      <OnlineMethodCard
                        selected={onlinePaymentMethod === 'visa'}
                        onClick={() => setOnlinePaymentMethod('visa')}
                      >
                        <FaCcVisa size={32} />
                        <span>Visa</span>
                      </OnlineMethodCard>
                      <OnlineMethodCard
                        selected={onlinePaymentMethod === 'mastercard'}
                        onClick={() => setOnlinePaymentMethod('mastercard')}
                      >
                        <FaCcMastercard size={32} />
                        <span>Mastercard</span>
                      </OnlineMethodCard>
                      <OnlineMethodCard
                        selected={onlinePaymentMethod === 'paypal'}
                        onClick={() => setOnlinePaymentMethod('paypal')}
                      >
                        <FaPaypal size={32} />
                        <span>PayPal</span>
                      </OnlineMethodCard>
                      <OnlineMethodCard
                        selected={onlinePaymentMethod === 'applepay'}
                        onClick={() => setOnlinePaymentMethod('applepay')}
                      >
                        <FaApplePay size={32} />
                        <span>Apple Pay</span>
                      </OnlineMethodCard>
                    </OnlineMethodsGrid>
                  </OnlinePaymentMethods>
                )}
              </PaymentSection>

              {/* Payment Button */}
              <PaymentButton
                variant="primary"
                size="lg"
                isFullWidth
                onClick={handlePayment}
                isReady={
                  !!seatingChoice &&
                  !!paymentType &&
                  (paymentType !== 'online' || !!onlinePaymentMethod)
                }
              >
                Procéder au paiement
              </PaymentButton>
            </ModalContent>
          </ModalContainer>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9997;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 1;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 600px;
  max-height: 85vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  z-index: 2;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 95%;
    max-height: 90vh;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: linear-gradient(135deg, #ffa500 0%, #ff8c00 100%);
  color: white;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const ModalTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 24px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 20px;
    gap: 8px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const ModalContent = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const OrderItemsSection = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 16px 0;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 12px;
  }
`;

const OrderItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OrderItemCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: white;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ffa500;
    box-shadow: 0 4px 12px rgba(255, 165, 0, 0.2);
  }

  @media (max-width: 768px) {
    gap: 12px;
    padding: 10px;
  }
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  object-fit: cover;
  border: 2px solid #ffa500;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const ItemName = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const ItemQuantity = styled.div`
  font-size: 12px;
  color: #64748b;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const ItemPrice = styled.div`
  font-weight: 900;
  font-size: 16px;
  color: #ff8c00;
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const PromoSection = styled.div`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const PromoInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: white;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;

  svg {
    color: #ffa500;
    flex-shrink: 0;
  }

  &:focus-within {
    border-color: #ffa500;
    box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 8px 10px;
    gap: 6px;
  }
`;

const PromoInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #1e293b;
  background: transparent;
  text-transform: uppercase;

  &::placeholder {
    color: #94a3b8;
    text-transform: none;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const PromoApplied = styled.div`
  margin-top: 8px;
  padding: 8px 12px;
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border-radius: 8px;
  color: #166534;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid #86efac;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`;

const TotalsSection = styled.div`
  padding: 16px;
  background: linear-gradient(135deg, #fff8e1 0%, #ffe4b5 100%);
  border-radius: 12px;
  border: 2px solid #ffa500;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    padding: 12px;
    margin-bottom: 20px;
  }
`;

const TotalLine = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #64748b;

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
    font-size: 13px;
    padding: 6px 0;
  }
`;

const FinalTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  margin-top: 12px;
  border-top: 2px solid #ffa500;
  font-weight: 800;
  font-size: 18px;
  color: #1e293b;

  span:last-child {
    color: #ff8c00;
    font-size: 24px;
  }

  @media (max-width: 768px) {
    font-size: 16px;

    span:last-child {
      font-size: 20px;
    }
  }
`;

const SeatingSection = styled.div`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const SeatingChoices = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const SeatingCard = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  background: ${({ selected }) =>
    selected
      ? 'linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)'
      : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'};
  color: ${({ selected }) => (selected ? 'white' : '#64748b')};
  border: 3px solid ${({ selected }) => (selected ? '#ff8c00' : '#e2e8f0')};
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ selected }) =>
    selected ? '0 8px 24px rgba(255, 140, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.1)'};

  &:hover {
    transform: translateY(-4px);
    border-color: #ffa500;
    box-shadow: 0 8px 24px rgba(255, 165, 0, 0.3);
  }

  svg {
    filter: ${({ selected }) => (selected ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' : 'none')};
  }

  @media (max-width: 768px) {
    padding: 20px;
    gap: 10px;

    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

const SeatingLabel = styled.div`
  font-size: 16px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const PaymentSection = styled.div`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const PaymentTypeChoices = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const PaymentTypeCard = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px 10px;
  background: ${({ selected }) =>
    selected
      ? 'linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)'
      : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'};
  color: ${({ selected }) => (selected ? 'white' : '#64748b')};
  border: 2px solid ${({ selected }) => (selected ? '#ff8c00' : '#e2e8f0')};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ selected }) =>
    selected ? '0 6px 20px rgba(255, 140, 0, 0.4)' : '0 2px 8px rgba(0, 0, 0, 0.1)'};

  &:hover {
    transform: translateY(-3px);
    border-color: #ffa500;
    box-shadow: 0 6px 20px rgba(255, 165, 0, 0.3);
  }

  svg {
    filter: ${({ selected }) => (selected ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' : 'none')};
  }

  @media (max-width: 768px) {
    padding: 14px 8px;
    gap: 8px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const PaymentLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const OnlinePaymentMethods = styled.div`
  margin-top: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #e2e8f0;

  @media (max-width: 768px) {
    padding: 12px;
    margin-top: 12px;
  }
`;

const OnlineMethodLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 10px;
  }
`;

const OnlineMethodsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const OnlineMethodCard = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: ${({ selected }) =>
    selected ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' : 'white'};
  color: ${({ selected }) => (selected ? 'white' : '#64748b')};
  border: 2px solid ${({ selected }) => (selected ? '#45a049' : '#e2e8f0')};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ selected }) =>
    selected ? '0 4px 12px rgba(76, 175, 80, 0.4)' : '0 2px 6px rgba(0, 0, 0, 0.1)'};

  &:hover {
    transform: translateY(-2px);
    border-color: #4CAF50;
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  }

  span {
    font-size: 12px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    padding: 12px;
    gap: 6px;

    svg {
      width: 28px;
      height: 28px;
    }

    span {
      font-size: 11px;
    }
  }
`;

const PaymentButton = styled(Button)<{ isReady?: boolean }>`
  margin-top: 8px;
  font-size: 18px;
  font-weight: 700;
  background: ${({ isReady }) =>
    isReady
      ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%) !important'
      : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%) !important'};
  border-color: ${({ isReady }) => (isReady ? '#45a049' : '#6b7280')} !important;
  box-shadow: ${({ isReady }) =>
    isReady
      ? '0 4px 12px rgba(76, 175, 80, 0.4)'
      : '0 2px 6px rgba(107, 114, 128, 0.3)'};
  transition: all 0.3s ease;
  cursor: ${({ isReady }) => (isReady ? 'pointer' : 'not-allowed')};

  &:hover {
    background: ${({ isReady }) =>
      isReady
        ? 'linear-gradient(135deg, #45a049 0%, #388e3c 100%) !important'
        : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%) !important'};
    transform: ${({ isReady }) => (isReady ? 'translateY(-2px)' : 'none')};
    box-shadow: ${({ isReady }) =>
      isReady
        ? '0 6px 16px rgba(76, 175, 80, 0.5)'
        : '0 2px 6px rgba(107, 114, 128, 0.3)'};
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export default OrderSummaryModal;
