import React from 'react';
import orderContext from './orderContext';
import { useOrder } from '../hooks/useOrder';

interface OrderProviderProps {
  children: React.ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const orderState = useOrder();

  return (
    <orderContext.Provider value={orderState}>
      {children}
    </orderContext.Provider>
  );
};