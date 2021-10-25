import "./ProductScreen.css";
import { useState } from "react";
import { match } from "react-router";
import { History } from "history";

import { useCart } from "../hooks/useCart";
import { useFetch } from "../hooks/useFetch";
import QuantitySelect from "../components/QuantitySelect";
import { Product } from "../context/CartContext";

type ProductScreen = {
  match: match<{ id?: string }>,
  history: History
}

const ProductScreen = ({ match, history }: ProductScreen) => {
  const [qty, setQty] = useState(1);
  const { loading, error, value: product } = useFetch<Product>(`http://localhost:5000/api/products/${match.params.id}`);
  const { handleAddToCart } = useCart();

  const addToCartHandler = () => {
    if (!product || !product._id) return;

    handleAddToCart({ id: product._id, qty });
    history.push(`/cart`);
  };


  if (loading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="center">
        <h2>{error}</h2>
      </div>
    )
  }

  return (
    <div className="productscreen">
      <div className="productscreen__left">
        <div className="left__image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="left__info">
          <p className="left__name">{product.name}</p>
          <p>Price: ${product.price}</p>
          <p>Description: {product.description}</p>
        </div>
      </div>
      <div className="productscreen__right">
        <div className="right__info">
          <p>
            Price:
            <span>${product.price}</span>
          </p>
          <p>
            Status:
            <span>
              {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </p>
          <p>
            Qty:
            <QuantitySelect
              qty={qty}
              handleOnChange={(e) => setQty(Number(e.target.value))}
              stockCount={product.countInStock}
            />
          </p>
          <p>
            <button type="button" onClick={addToCartHandler}>
              Add To Cart
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
