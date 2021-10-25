import axios from "axios";
import React, { useState, ReactNode } from "react";

export type Product = {
  _id?: string,
  id: string,
  name: string,
  description?: string,
  imageUrl: string,
  price: number,
  countInStock: number,
  qty: number
}

type handleAddToCartParams = { id: string, qty: number };
type handleRemoveFromCartParams = { id: string };

type CartContext = {
  cart: Product[],
  handleAddToCart({ id, qty }: handleAddToCartParams): Promise<void>,
  handleRemoveFromCart({ id }: handleRemoveFromCartParams): void
}

export const CartContext = React.createContext<CartContext>({
  cart: [],
  handleAddToCart: async () => { },
  handleRemoveFromCart: () => { }
});

type CartProviderProps = { children: ReactNode }

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = async ({ id, qty }: handleAddToCartParams) => {
    const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);

    const formattedProduct = {
      id: data._id,
      name: data.name,
      imageUrl: data.imageUrl,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    }

    const existingItem = cart.find((x) => x.id === formattedProduct.id);

    if (existingItem) {
      setCart(cart.map((x) =>
        x.id === existingItem.id ? formattedProduct : x
      ));
      return;
    }

    setCart([...cart, formattedProduct]);
  };

  const handleRemoveFromCart = ({ id }: handleRemoveFromCartParams) => {
    setCart(cart.filter((x) => x.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleRemoveFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}