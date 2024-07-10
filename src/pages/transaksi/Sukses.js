import React from "react";
import { useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  const handleOrderHistory = () => {
    navigate("/payments");
  };

  return (
    <div className="container mx-auto text-center">
      <h2 className="text-black text-4xl font-bold text-center mb-6 mt-6">Checkout Success</h2>
      <p>Your order has been successfully confirmed. Thank you for shopping with us!</p>
      <button
        className="mt-6 mb-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleOrderHistory}
      >
        Go to Payment Page
      </button>
    </div>
  );
};

export default CheckoutSuccess;
