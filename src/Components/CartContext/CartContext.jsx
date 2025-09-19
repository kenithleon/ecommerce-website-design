import React, { createContext, useState, useEffect, useRef } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [popupMessage, setPopupMessage] = useState("");
  const popupTimeoutRef = useRef(null); // <-- Track timeout

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/carts/1");
      if (!response.ok) throw new Error("Failed to fetch cart");

      const data = await response.json();
      setCart(data.products || []);
      setCartCount(
        data.products
          ? data.products.reduce((acc, item) => acc + item.quantity, 0)
          : 0
      );
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const updateCartOnServer = async (updatedCart) => {
    try {
      await fetch("https://fakestoreapi.com/carts/1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1,
          date: new Date().toISOString(),
          products: updatedCart,
        }),
      });
    } catch (error) {
      console.error("Error updating cart on server:", error);
    }
  };

  const showPopupMessage = (message, duration = 2000) => {
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
    }

    setPopupMessage(message);
    popupTimeoutRef.current = setTimeout(() => {
      setPopupMessage("");
    }, duration);
  };

  const addToCart = async (product) => {
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find(
      (item) => item.productId === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedCart.push({ productId: product.id, quantity: 1 });
    }

    setCart(updatedCart);
    setCartCount(cartCount + 1);
    showPopupMessage(`${product.title} added to cart!`, 3000);

    await updateCartOnServer(updatedCart);
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.productId === productId
          ? item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : null
          : item
      )
      .filter(Boolean);

    setCart(updatedCart);
    setCartCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
    showPopupMessage("Item removed from cart");

    await updateCartOnServer(updatedCart);
  };

  const increaseQuantity = async (productId) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);
    setCartCount(cartCount + 1);
    await updateCartOnServer(updatedCart);
  };

  const decreaseQuantity = async (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.productId === productId
          ? item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : null
          : item
      )
      .filter(Boolean);

    setCart(updatedCart);
    setCartCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
    await updateCartOnServer(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        popupMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
