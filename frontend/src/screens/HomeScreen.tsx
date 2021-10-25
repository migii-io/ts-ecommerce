import "./HomeScreen.css";
import Product from "../components/Product";
import * as CartContext from '../context/CartContext';
import { useFetch } from "../hooks/useFetch";

const HomeScreen = () => {
  const { loading, error, value: products } = useFetch<CartContext.Product[]>('http://localhost:5000/api/products');

  if (loading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div className="center">
        <h2>{error}</h2>
      </div>
    )
  }

  return (
    <div className="homescreen">
      <h2 className="homescreen__title">Latest Products</h2>
      <div className="homescreen__products">
        {products && products.map((product) => (
          <Product
            key={product._id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            productId={product._id}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
