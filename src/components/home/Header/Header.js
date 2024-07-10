import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import { logo, logoLight } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { navBarList } from "../../../constants";
import Flex from "../../designLayouts/Flex";

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State untuk status login
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Periksa apakah token ada saat komponen dimuat
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Fungsi untuk logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Hapus token dari penyimpanan lokal
    setIsLoggedIn(false); // Atur status login menjadi false
    navigate.push("/login"); // Redirect ke halaman login
  };

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <Flex className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center">
            <img className="w-32 object-cover" src={logo} alt="Logo" />
          </Link>
          {/* Menampilkan menu hamburger di versi mobile */}
          <HiMenuAlt2
            onClick={() => setSidenav(!sidenav)}
            className="md:hidden cursor-pointer w-8 h-6 ml-2"
          />
          {/* Menampilkan menu horizontal di versi desktop */}
          <motion.ul
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center list-none ml-auto"
          >
            {navBarList.map(({ _id, title, link }) => (
              <NavLink
                key={_id}
                className="font-normal text-base text-[#767676] hover:text-[#262626] hover:underline underline-offset-[4px] decoration-[1px] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0 px-4 h-full flex items-center"
                to={link}
                state={{ data: location.pathname.split("/")[1] }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                activeClassName="font-bold" // Menjadikan teks tebal saat NavLink aktif
              >
                <span className="flex items-center justify-center h-full">{title}</span>
              </NavLink>
            ))}
            {/* Tombol logout di versi desktop */}
            {/* {isLoggedIn && (
              <button onClick={handleLogout} className="text-[#767676] hover:text-[#262626] hover:underline underline-offset-[4px] decoration-[1px] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0 px-4 h-full flex items-center">
                Logout
              </button>
            )} */}
          </motion.ul>
          {/* Sidebar di versi mobile */}
          {sidenav && (
            <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-[80%] h-full relative"
              >
                <div className="w-full h-full bg-primeColor p-6">
                  <img
                    className="w-28 mb-6"
                    src={logoLight}
                    alt="logoLight"
                  />
                  <ul className="text-gray-200 flex flex-col gap-2">
                    {navBarList.map((item) => (
                      <li
                        className="font-normal items-center text-lg text-gray-200 hover:text-white hover:underline underline-offset-[4px] decoration-[1px] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                        key={item._id}
                      >
                        <NavLink
                          to={item.link}
                          state={{ data: location.pathname.split("/")[1] }}
                          onClick={() => setSidenav(false)}
                          activeClassName="font-bold" // Menjadikan teks tebal saat NavLink aktif
                        >
                          {item.title}
                        </NavLink>
                      </li>
                    ))}
                    {/* Tombol logout di sidebar */}
                    {/* {isLoggedIn && (
                      // <button onClick={handleLogout} className="text-gray-200 hover:text-white hover:underline underline-offset-[4px] decoration-[1px] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0">
                      //   Logout
                      // </button>
                    )} */}
                  </ul>
                </div>
                <span
                  onClick={() => setSidenav(false)}
                  className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                >
                  <MdClose />
                </span>
              </motion.div>
            </div>
          )}
        </Flex>
      </nav>
    </div>
  );
};

export default Header;
