import React from "react";
import { FiAward, FiLoader, FiCoffee } from "react-icons/fi";

const BannerBottom = () => {
  return (
    <div className="w-full bg-white border-b-[1px] py-4 border-b-gray-200 px-4">
      <div className="max-w-container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center gap-2 w-full md:w-72 shadow-sm hover:shadow-md duration-300">
          <span className="font-bold font-titleFont w-10 text-center">
            <FiAward size={40} color="#ff4c3b" />
          </span>
          <p className="text-lightText text-base">Sourced from the finest tea gardens</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-72 shadow-sm hover:shadow-md duration-300">
          <span className="text-5xl text-center w-10 ml-1 text-orange-500">
            <FiLoader size={40} color="#ff4c3b" />
          </span>
          <p className="text-lightText text-base">Processed with the best machine</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-72 shadow-sm hover:shadow-md duration-300">
          <span className="text-5xl text-center w-10 ml-1 text-orange-500">
            <FiCoffee size={40} color="#ff4c3b" />
          </span>
          <p className="text-lightText text-base">Typical Indonesian flavors</p>
        </div>
      </div>
    </div>
  );
};

export default BannerBottom;
