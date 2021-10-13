import "./style.css";
import { Link } from "react-router-dom";
import QuantitySelect from "../QuantitySelect";

const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <Link to={`/product/${item.id}`} className="cart-item__name">
        <p>{item.name}</p>
      </Link>
      <p className="cart-item__price">${item.price}</p>
      <QuantitySelect
        className="cart-item__select"
        qty={item.qty}
        handleOnChange={(e) => qtyChangeHandler(item.id, e.target.value)}
        stockCount={item.countInStock}
      />
      <button
        className="cart-item__deleteBtn"
        onClick={() => removeHandler(item.id)}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;
