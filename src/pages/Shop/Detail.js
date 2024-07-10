import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [jumlah, setJumlah] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productId = window.location.pathname.split('/').pop(); // Mendapatkan ID produk dari URL
        const response = await axios.get(`https://teanologyweb.tifpsdku.com/admin/product/${productId}`);
        setProduct(response.data.products); // Menyesuaikan dengan respons dari API
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message); // Menangkap pesan kesalahan dari respons HTTP
        } else {
          setError("An error occurred while fetching the product."); // Menangani kesalahan umum
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token"); // Ambil token dari local storage atau tempat Anda menyimpannya
      const response = await axios.post(
        "https://teanologyweb.tifpsdku.com/admin/transaction/cart",
        {
          id_product: product.id_product,
          jumlah: jumlah
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data); // Handle the response as needed, e.g., show a success message
      navigate('/cart');
      window.location.reload(); // Automatically refresh the browser
    } catch (error) {
      console.log(error.message); // Handle the response as needed, e.g., show a success message
      setError(error.message); // Handle any errors
    }
  };

  const handleIncrement = () => {
    setJumlah(jumlah + 1);
  };

  const handleDecrement = () => {
    if (jumlah > 1) {
      setJumlah(jumlah - 1);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-8 flex max-w-7xl mx-auto border border-gray-300">
        <div className="w-1/3">
          <img src={`https://teanologyweb.tifpsdku.com/admin/upload_product/${product.photo_product}`} alt={product.name_product} className="w-full h-auto object-contain" />
        </div>
        <div className="w-2/3 p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">{product.name_product}</h2>
          <p className="text-xl text-green-600 font-bold mb-2">{formatPrice(product.price_product)}</p>
          <p className="text-gray-700 mb-4">{product.description_product}</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 mr-2">Rating:</span>
            <span className="text-gray-900">{product.rating_product}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-gray-500 mr-2">Stock:</span>
            <span className="text-gray-900">{product.stock_product}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-gray-500 mr-2">Sold:</span>
            <span className="text-gray-900">{product.order_count_product}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-gray-500 mr-2">Status:</span>
            <span className={`text-gray-900 ${product.status_product ? 'text-green-500' : 'text-red-500'}`}>
              {product.status_product ? 'Available' : 'not available'}
            </span>
          </div>

          <div className="mb-4 flex items-center">
            <button onClick={handleDecrement} className="bg-gray-200 text-gray-700 font-semibold py-1 px-2 rounded-l">
              -
            </button>
            <input type="number" value={jumlah} className="rounded-none w-12 py-1 px-2 text-center" readOnly />
            <button onClick={handleIncrement} className="bg-gray-200 text-gray-700 font-semibold py-1 px-2 rounded-r">
              +
            </button>
          </div>

          <div className="flex justify-between">
            <Link to="/shop" className="border border-green-600 bg-white text-green-600 hover:text-green-700 hover:border-green-700 font-bold py-2 px-4 rounded">Back</Link>
            <button onClick={addToCart} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
