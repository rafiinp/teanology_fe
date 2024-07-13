import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CartItem from "../Cart/ItemCard";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(location.state?.cartItems ?? []);
  const [total, setTotal] = useState(location.state?.total ?? 0);
  const [showModal, setShowModal] = useState(false);
  const [gopayModal, setGopayModal] = useState(false); // State for Gopay modal
  const [imageUrl, setImageUrl] = useState("");

  const [address, setAddress] = useState("");
  const [destination, setDestination] = useState("");
  const [courier, setCourier] = useState("");
  const [note, setNote] = useState("");

  const [shippingCost, setShippingCost] = useState(0); // State for shipping cost

  // Function to set destination and calculate shipping cost
  const setDestinationAndShippingCost = (value) => {
    setDestination(value);
    // Calculate shipping cost based on destination
    let cost = 0;
    switch (value) {
      case "Jawa Barat":
        cost = 10000 + 5000;
        break;
      case "Jawa Tengah":
        cost = 10000 + 10000;
        break;
      case "Yogya":
        cost = 10000 + 10000;
        break;
      case "Jawa Timur":
        cost = 10000 + 15000;
        break;
      default:
        cost = 10000; // Default cost for other destinations
        break;
    }
    setShippingCost(cost);
  };

  const handleBackToCart = () => {
    navigate("/cart");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };

  const handleConfirmOrder = () => {
    // Validate input
    if (!address || !destination || !courier || !note) {
      alert("Please fill out all required fields.");
      return;
    }

    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleGopayModalClose = () => {
    navigate("/riwayat"); // Redirect to the history page
    window.location.reload();
  };

  const handlePaymentMethodSelect = async (paymentType) => {
    const cartItemsRequest = cartItems.map((item) => ({
      id_product: item.id_product,
      jumlah: item.jumlah ?? 1,
    }));

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://teanologyweb.tifpsdku.com/admin/transaction/checkout",
        {
          order_details: cartItemsRequest,
          payment_method: paymentType,
          address: address,
          destination: destination,
          courier: courier,
          note: note,
          shipping_cost: shippingCost, // Include shipping cost in request
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order confirmed:", response.data);

      if (response.data.payments.payment_type === "gopay") {
        console.log(response.data.payments.actions[0].url);
        setImageUrl(response.data.payments.actions[0].url);
        setGopayModal(true);
        setShowModal(false);
      } else {
        navigate("/success");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      console.log(error.response?.data);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <h2 className="text-2xl font-semibold mt-8 mb-8">Checkout</h2>
      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id_product} item={{ ...item, harga: formatPrice(item.harga) }} />
        ))}
        {/* Validation error message */}
        {(!address || !destination || !courier || !note) && (
          <p className="text-red-500 text-sm mt-2">
            Please fill out all required fields.
          </p>
        )}
        <div className="flex flex-col md:flex-row mt-4">
          <div className="md:w-1/2 pr-2 mb-4 md:mb-0">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="md:w-1/2 pl-2">
            <label htmlFor="destination" className="block text-gray-700 font-bold mb-2">
              Province
            </label>
            <select
              id="destination"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={destination}
              onChange={(e) => setDestinationAndShippingCost(e.target.value)}
              required
            >
              <option value="">Select Province</option>
              <option value="Jawa Barat">Jawa Barat</option>
              <option value="Jawa Tengah">Jawa Tengah</option>
              <option value="Jawa Timur">Jawa Timur</option>
              <option value="Banten">Banten</option>
              <option value="Jakarta">DKI Jakarta</option>
              <option value="Yogya">DI Yogyakarta</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-4">
          <div className="md:w-1/2 pr-2 mb-4 md:mb-0">
            <label htmlFor="courier" className="block text-gray-700 font-bold mb-2">
              Courier
            </label>
            <select
              id="courier"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={courier}
              onChange={(e) => setCourier(e.target.value)}
              required
            >
              <option value="">Select Courier</option>
              <option value="jne">JNE</option>
              <option value="pos">POS Indonesia</option>
              <option value="tiki">TIKI</option>
            </select>
          </div>
          <div className="md:w-1/2 pl-2">
            <label htmlFor="note" className="block text-gray-700 font-bold mb-2">
              Note
            </label>
            <input
              type="text"
              id="note"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <h3 className="text-lg font-semibold">
            Total: {formatPrice(total + shippingCost)}
            {shippingCost > 0 && <span className="ml-2 text-sm">(Shipping: {formatPrice(shippingCost)})</span>}
          </h3>
        </div>
        <div className="flex justify-end mt-4 space-x-4">
          <button
            className="border border-green-600 bg-white text-green-600 hover:text-green-700 hover:border-green-700 font-bold py-2 px-4 rounded"
            onClick={handleBackToCart}
          >
            Back to Cart
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-96 text-center">
            <button
              className="absolute top-2 right-2 text-black"
              onClick={handleModalClose}
            >
              &times;
            </button>
            <h2 className="text-black font-bold text-center mb-6">
              Select Payment Method
            </h2>
            <div className="mb-4">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={() => handlePaymentMethodSelect("gopay")}
              >
                QRIS CODE
              </button>
            </div>
            <div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => handlePaymentMethodSelect("bank_transfer")}
              >
                Transfer BCA
              </button>
            </div>
          </div>
        </div>
      )}
      {gopayModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-96 text-center">
            <button
              className="absolute top-2 right-2 text-black"
              onClick={handleGopayModalClose}
            >
              &times;
            </button>
            <h2 className="text-black font-bold text-center mb-6">
              Scan this QRIS Code
            </h2>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="QR Code for Gopay"
                className="max-w-xs mx-auto"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
