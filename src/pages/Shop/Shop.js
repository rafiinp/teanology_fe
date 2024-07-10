import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom"; // Added useLocation import
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

function Shop() {
  const [dataProducts, setDataProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [prevLocation, setPrevLocation] = useState("");

  const getDataProducts = async () => {
    try {
      const response = await axios.get("https://teanologyweb.tifpsdku.com/admin/product");
      setDataProducts(response.data.products); // Fetching array of products from response
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getDataProducts();
  }, []);

  const filterProductsByCategory = (product) => {
    return (
      Array.isArray(dataProducts) &&
      (!selectedCategory ||
        selectedCategory === "all" ||
        (selectedCategory === "a" && product.id_category === "1") ||
        (selectedCategory === "b" && product.id_category === "2") ||
        (selectedCategory === "c" && product.id_category === "3") || // Fixed category id for "Teh Hitam"
        product.id_category === selectedCategory)
    );
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const getCategoryLabel = (categoryId) => {
    switch (categoryId) {
      case "1":
        return "Single Origin Tea";
      case "2":
        return "Classic Blend";
      case "3":
        return "Artisan Blend";
      default:
        return categoryId;
    }
  };

  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    }
  }, [location]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };

  return (
    <div className="container mx-auto">
      <Breadcrumbs title="Shop" prevLocation={prevLocation} />
      <h1 className="text-3xl font-semibold mb-4">Product List</h1>

      <div className="mb-4">
        <label htmlFor="category" className="mr-2">
          Filter by Category:
        </label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="all">All</option>
          <option value="a">Single Origin Tea</option>
          <option value="b">Classic Blend</option>
          <option value="c">Artisan Blend</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dataProducts &&
          dataProducts.filter(filterProductsByCategory).map((product) => (
            <div key={product.id_product} className="bg-white p-4 rounded-lg shadow">
              <Link to={`/detail/${product.id_product}`}>
                <img
                  src={`https://teanologyweb.tifpsdku.com/admin/upload_product/${product.photo_product}`}
                  alt={product.name_product}
                  className="w-full h-48 object-cover mb-4"
                  loading="lazy"
                />
                <h2 className="text-xl font-semibold mb-2">{product.name_product}</h2>
                <p className="text-gray-600 mb-2">{formatPrice(product.price_product)}</p>
                <p className="text-gray-500">Category: {getCategoryLabel(product.id_category)}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Shop;
