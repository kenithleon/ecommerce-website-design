import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Cart from "./Components/Cart/Cart";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import { CartProvider } from "./Components/CartContext/CartContext";

const App = () => {
  return (
    <CartProvider>
    <Router>
      <main className="overflow-x-hidden">
        <Navbar />  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </main>
    </Router>
    </CartProvider>
  );
};

export default App;
