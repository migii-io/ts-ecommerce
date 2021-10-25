import "./CartScreen.css";
import { Link } from "react-router-dom";

import CartItem from "../components/CartItem";
import { useCart } from "../hooks/useCart";

const CartScreen = () => {
  const {
    cart, handleAddToCart, handleRemoveFromCart
  } = useCart();

  const qtyChangeHandler = (id: string, qty: number) => {
    handleAddToCart({ id, qty });
  };

  const removeFromCartHandler = (id: string) => {
    handleRemoveFromCart({ id });
  };

  const getCartCount = () => {
    return cart.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cart
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  return (
    <>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>

          {cart.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>${getCartSubTotal()}</p>
          </div>
          <div>
            <button>Proceed To Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
