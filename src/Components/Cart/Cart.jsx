import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    popupMessage,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    state: "",
    district: "",
    paymentMethod: "cod", // default payment method
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = await Promise.all(
          cart.map(async (product) => {
            const response = await fetch(
              `https://fakestoreapi.com/products/${product.productId}`
            );
            const data = await response.json();
            return { ...product, ...data };
          })
        );
        setProducts(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (cart.length > 0) {
      fetchProductDetails();
    } else {
      setProducts([]);
    }
  }, [cart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = () => {
    const { name, phone, address, pincode, state, district, paymentMethod } =
      billingDetails;

    if (
      !name ||
      !phone ||
      !address ||
      !pincode ||
      !state ||
      !district ||
      !paymentMethod
    ) {
      alert("Please fill all billing details and select a payment method.");
      return;
    }

    const paymentMethodNames = {
      cod: "Cash on Delivery",
      card: "Card Payment",
      gpay: "Google Pay",
      paypal: "PayPal",
    };

    alert(
      `✅ Order placed!\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}, ${district}, ${state} - ${pincode}\n\nPayment Method: ${paymentMethodNames[paymentMethod]}`
    );

    clearCart();
    setShowModal(false);
    setBillingDetails({
      name: "",
      phone: "",
      address: "",
      pincode: "",
      state: "",
      district: "",
      paymentMethod: "cod",
    });
  };

  return (
    <div className="container mx-auto my-8">
      {popupMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {popupMessage}
        </div>
      )}

      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

      <div className="space-y-4">
        {products.length === 0 ? (
          <p className="text-center text-lg text-gray-500">Your cart is empty.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.productId}
              className="p-4 border rounded shadow flex justify-between items-center"
            >
              <div className="flex items-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div>
                  <p className="font-semibold">{product.title}</p>
                  <Link
                    to={`/products/${product.productId}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Product
                  </Link>
                  <p>Price: ${product.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => decreaseQuantity(product.productId)}
                      className="px-2 py-1 text-xl bg-gray-200 rounded-l hover:bg-gray-300"
                    >
                      -
                    </button>
                    <div className="px-4 py-1 border-y text-center w-12">
                      {product.quantity}
                    </div>
                    <button
                      onClick={() => increaseQuantity(product.productId)}
                      className="px-2 py-1 text-xl bg-gray-200 rounded-r hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(product.productId)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Place Order Button */}
      {products.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        </div>
      )}

      {/* Billing Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Billing Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={billingDetails.name}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={billingDetails.phone}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="address"
                placeholder="Full Address"
                value={billingDetails.address}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={billingDetails.pincode}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={billingDetails.state}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="district"
                placeholder="District"
                value={billingDetails.district}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
            </div>

            {/* Payment Method Selector */}
            <div className="mt-4">
              <label className="block font-semibold mb-2">Payment Method:</label>
              <select
                name="paymentMethod"
                value={billingDetails.paymentMethod}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              >
                <option value="cod">Cash on Delivery</option>
                <option value="card">Card Payment</option>
                <option value="gpay">Google Pay</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOrder}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
