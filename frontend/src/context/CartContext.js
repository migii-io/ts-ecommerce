import axios from "axios";
import React, { useState } from "react";

export const CartContext = React.createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const handleAddToCart = async ({ id, qty }) => {
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

  const handleRemoveFromCart = ({ id }) => {
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