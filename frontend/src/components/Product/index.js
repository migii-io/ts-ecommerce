import "./style.css";
import { Link } from "react-router-dom";

const Product = ({ imageUrl, price, name, productId }) => {
  return (
    <div className="product">
      <img src={imageUrl} alt={name} />

      <div className="product__info">
        <div className="product__header">
          <p className="info__name">{name}</p>
          <p className="info__price">${price}</p>
        </div>

        <Link to={`/product/${productId}`} className="info__button">
          View
        </Link>
      </div>
    </div>
  );
};

export default Product;
