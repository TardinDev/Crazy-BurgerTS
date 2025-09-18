import { createContext } from "react";
import { OrderContextType } from "../types";

const orderContext = createContext<OrderContextType>({
  isActiveBtn: false,
  setIsActiveBtn: () => {},
  burgers: [],
  setBurgers: () => {},
  handleAddBurger: () => {},
  basket: [],
  addToBasket: () => {},
  removeFromBasket: () => {},
  updateBasketItemQuantity: () => {},
  clearBasket: () => {},
  removeBurger: () => {},
  updateBurger: () => {},
});

export default orderContext;
