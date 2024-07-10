import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CartItem from "./ItemCard";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signup");
          return;
        }

        const response = await axios.get(
          "https://teanologyweb.tifpsdku.com/admin/transaction/cart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCartItems(response.data);
        let total = 0;
        response.data.forEach((item) => {
          total += parseFloat(item.harga);
        });
        setTotal(total);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems, total } });
  };

  const handleClearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signup");
        return;
      }

      await axios.delete("https://teanologyweb.tifpsdku.com/admin/transaction/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      window.location.reload();
      

      setCartItems([]);
      setTotal(0);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return (
    <div className="max-w-container mx-auto px-4">
      <p>Error: {error}</p>
      <p><strong>Please Sign Out and Sign In again</strong></p>
    </div>
  );

  return (
    <div className="max-w-container mx-auto px-4">
      <h2 className="text-2xl font-semibold mt-8">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartItem key={item.id_product} item={{ ...item, harga: formatPrice(item.harga) }} />
          ))}
          <div className="flex justify-end mt-4">
            <h3 className="text-lg font-semibold">Total: {formatPrice(total)}</h3>
          </div>
          <div className="flex justify-end mt-4 space-x-4">
          <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <button
              className="bg-primeColor text-white px-4 py-2 rounded-md hover:bg-black"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
