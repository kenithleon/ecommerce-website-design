import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://fakestoreapi.com/products'); // Fake API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold text-center mb-6">Product List</h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded shadow">
            <img src={product.image} alt={product.title} className="h-40 mx-auto mb-4" />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-700">${product.price}</p>
            <button
              onClick={() => navigate(`/products/${product.id}`)} // Navigate to product detail page
              className=" mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Products;

