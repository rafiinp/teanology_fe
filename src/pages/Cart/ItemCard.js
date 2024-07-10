import React from "react";

const CartItem = ({ item }) => {
  return (
    <div className="flex flex-col md:flex-row mb-4 bg-white shadow-md rounded-lg overflow-hidden">
     <div className="md:w-1/3">
  <img
    src={`https://teanologyweb.tifpsdku.com/admin/upload_product/${item.photo_product}`}
    alt={item.name_product}
    className="w-full h-auto md:h-48 object-contain"
  />
</div>

      <div className="md:w-2/3 p-4 flex flex-col justify-between">
        <div>
          <h5 className="text-xl font-semibold mb-2">{item.name_product}</h5>
          <p className="text-gray-700 mb-2">Price: {item.harga}</p>
          <p className="text-gray-700">Quantity: {item.jumlah}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
