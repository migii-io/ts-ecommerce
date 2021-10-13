import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { CartProvider } from './context/CartContext';

ReactDOM.render(
  <CartProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CartProvider>,
  document.getElementById("root")
);