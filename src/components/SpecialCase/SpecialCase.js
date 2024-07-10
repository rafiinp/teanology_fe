import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { MdSwitchAccount } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';

const ProfileMenu = ({ setShowUser, handleLogout, hasToken }) => (
  <motion.div
    initial={{ y: -30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="absolute top-16 right-0 z-50 bg-primeColor w-28 text-[#767676] h-auto p-3 pb-4 rounded-md shadow-lg"
    onMouseLeave={() => setShowUser(false)}
  >
    <ul>
      {hasToken ? (
        <>
          <Link to="/profile">
            <li key="profile" className="text-gray-400 px-3 py-1 border-b border-gray-400 hover:border-white hover:text-white duration-300 cursor-pointer">
              Profile
            </li>
          </Link>
          <Link to="/payments">
            <li key="payments" className="text-gray-400 px-3 py-1 border-b border-gray-400 hover:border-white hover:text-white duration-300 cursor-pointer">
              Payments
            </li>
          </Link>
          <Link to="/riwayat">
            <li key="history" className="text-gray-400 px-3 py-1 border-b border-gray-400 hover:border-white hover:text-white duration-300 cursor-pointer">
              History
            </li>
          </Link>
          <li
            key="logout"
            className="text-gray-400 px-3 py-1 border-b border-gray-400 hover:border-white hover:text-white duration-300 cursor-pointer"
            onClick={handleLogout}
          >
            Log Out
          </li>
        </>
      ) : (
        <>
          <Link to="/signin">
            <li key="signin" className="text-gray-400 px-3 py-1 border-b border-gray-400 hover:border-white hover:text-white duration-300 cursor-pointer">
              Sign In
            </li>
          </Link>
          <Link to="/signup">
            <li key="signup" className="text-gray-400 px-3 py-1 border-b border-gray-400 hover:border-white hover:text-white duration-300 cursor-pointer">
              Sign Up
            </li>
          </Link>
        </>
      )}
    </ul>
  </motion.div>
);

const CartIcon = ({ cartItemCount }) => (
  <Link to="/cart">
    <div className="bg-white w-16 h-16 md:h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
      <div className="flex justify-center items-center">
        <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
        <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
      </div>
      <p className="text-xs font-semibold font-titleFont">Cart</p>
      {cartItemCount > 0 && (
        <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
          {cartItemCount}
        </p>
      )}
    </div>
  </Link>
);

const WhatsAppIcon = () => (
  <a href="https://wa.link/ryino8" target="_blank" rel="noopener noreferrer">
    <div className="bg-white w-16 h-16 md:h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
      <div className="flex justify-center items-center">
        <FaWhatsapp className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
        <FaWhatsapp className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
      </div>
      <p className="text-xs font-semibold font-titleFont">Admin</p>
    </div>
  </a>
);

const SpecialCase = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setCartItemCount(0);
          return;
        }

        const response = await axios.get('https://teanologyweb.tifpsdku.com/admin/transaction/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCartItemCount(response.data.length);
      } catch (error) {
        console.error('Error fetching cart item count:', error);
        setCartItemCount(0);
      }
    };

    fetchCartItemCount();
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    navigate('/signin');
  }, [navigate]);

  const token = localStorage.getItem('token');
  const hasToken = !!token;

  return (
    <div className="fixed top-52 right-2 z-20 flex flex-col gap-2">
      <div className="relative">
        <div className="bg-white w-16 h-16 md:h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
          <div
            onClick={() => setShowUser(!showUser)}
            className="flex justify-center items-center"
            aria-label="Toggle profile menu"
          >
            <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
            <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">Profile</p>
        </div>
        {showUser && (
          <ProfileMenu setShowUser={setShowUser} handleLogout={handleLogout} hasToken={hasToken} />
        )}
      </div>
      <CartIcon cartItemCount={cartItemCount} />
      <WhatsAppIcon />
    </div>
  );
};

export default SpecialCase;
