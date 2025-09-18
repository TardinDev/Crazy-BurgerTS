
export interface Burger {
  id: number;
  image: string;
  title: string;
  price: number;
}

export interface BasketItem extends Burger {
  quantity: number;
  addedAt: string;
}

export interface User {
  id: string;
  username: string;
}

export interface OrderContextType {
  isActiveBtn: boolean;
  setIsActiveBtn: React.Dispatch<React.SetStateAction<boolean>>;
  burgers: Burger[];
  setBurgers: React.Dispatch<React.SetStateAction<Burger[]>>;
  handleAddBurger: (newBurger: Burger) => void;
  basket: BasketItem[];
  addToBasket: (burger: Burger) => void;
  removeFromBasket: (id: number) => void;
  updateBasketItemQuantity: (id: number, quantity: number) => void;
  clearBasket: () => void;
  removeBurger: (id: number) => void;
  updateBurger: (updatedBurger: Burger) => void;
}