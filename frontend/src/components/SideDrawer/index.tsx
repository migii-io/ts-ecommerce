import "./style.css";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

type SideDrawerProps = {
  click: React.MouseEventHandler<HTMLUListElement>,
  show: boolean
}

const SideDrawer = ({ show, click }: SideDrawerProps) => {
  const { cart } = useCart();

  const getCartCount = () => {
    return cart.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  return (
    <div className={`sidedrawer ${show ? "show" : ""}`}>
      <ul className="sidedrawer__links" onClick={click}>
        <li>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart{" "}
              <span className="sidedrawer__cartbadge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">Shop</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;
