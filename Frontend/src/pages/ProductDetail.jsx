import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlantBySlug } from '../api';
import Rating from '@mui/material/Rating';
import { FaSpinner, FaShoppingCart, FaBolt } from 'react-icons/fa';

const FALLBACK_IMAGE = '/fallback.png';

function ProductDetail() {
  // 💡 Retrieves the 'slug' from the URL (e.g., 'moonstone')
  const { slug } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // 'inStock' is missing in your Plant model, 
  // so we assume it's available (true) for now.
  const inStock = true;

  useEffect(() => {
    const fetchPlantDetails = async () => {
      setLoading(true);
      setError(null);
      setPlant(null);
      setQuantity(1);

      try {
        // 💡 Uses the working getPlantBySlug API call
        const response = await getPlantBySlug(slug);
        setPlant(response.data);
      } catch (err) {
        console.error('Failed to fetch plant details:', err.response ? err.response.data : err.message);
        setError('Could not fetch product details. This product may not exist or the backend service is unavailable.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPlantDetails();
    }
  }, [slug]);

  // --- Handlers for Cart/Buy ---
  const handleAddToCart = () => {
    if (plant) {
      alert(`✅ Added ${quantity} x ${plant.title} to your cart!`);
    }
  };

  const handleBuyNow = () => {
    if (plant) {
      alert(`💸 Redirecting to checkout for ${plant.title}...`);
    }
  };

  // --- Loading/Error States ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-[#4CBB17]" />
        <p className="ml-3 text-lg text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error || !plant) {
    return (
      <div className="p-12 text-center text-xl text-red-600 min-h-screen">
        {error || 'Product not found.'}
      </div>
    );
  }

  // --- Render Product Details ---
  return (
    <div className="flex flex-col md:flex-row gap-15 bg-white p-6 min-h-screen">

      {/* Product Image Section */}
      <div className="md:w-1/2 p-4">
        <img
          src={plant.image || FALLBACK_IMAGE}
          alt={plant.title}
          className="w-3/4 h-[450px] object-cover object-top rounded-lg shadow-md border border-gray-100 mx-auto"
        />
      </div>


      {/* Product Details & Actions Section */}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{plant.title}</h1>


        <div className="flex items-center mb-6">
          <p className="text-2xl font-semibold text-[#1e975a] mr-4">
            {plant.price}
          </p>
          {plant.oldPrice && (
            <p className="text-xl text-gray-400 line-through">
              {plant.oldPrice}
            </p>
          )}
          {plant.discountLabel && (
            <span className="ml-4 bg-[#4CBB17] text-white text-md font-semibold px-2 py-1 rounded">
              {plant.discountLabel}
            </span>
          )}
        </div>


        <div className="flex items-center mb-4">
          <Rating name="size-medium" value={plant.rating} readOnly precision={0.5} />
          <span className="ml-2 text-md font-semibold text-gray-500">
            ({plant.rating.toFixed(1)} / 5)
          </span>
        </div>


        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="text-lg font-semibold text-gray-700 block mb-2">
            Quantity
          </label>

          <div className="flex items-center w-32 justify-between px-4 py-2 border border-gray-300 rounded-xl">
            {/* Minus Button */}
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-2xl text-gray-600 hover:text-black"
            >
              −
            </button>

            {/* Value */}
            <span className="text-lg font-medium text-gray-800">
              {quantity}
            </span>

            {/* Plus Button */}
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-2xl text-gray-600 hover:text-black"
            >
              +
            </button>
          </div>
        </div>

        {/* Info Section */}
        <ul class="list-disc list-inside space-y-2 mt-4 mb-5 text-gray-700 text-md">
          <li>5-Day Easy Returns — Unboxing video required</li>
          <li>Free Shipping on orders above ₹249</li>
        </ul>



        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="w-3/4 bg-[#008000] text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 shadow-md mb-4 text-lg disabled:bg-gray-400 flex items-center justify-center space-x-2"
        >
          <FaShoppingCart /> <span>Add to Cart</span>
        </button>


        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          disabled={!inStock}
          className="w-3/4 bg-[#70e000] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#9ef01a] transition duration-300 shadow-md text-lg disabled:bg-gray-400 flex items-center justify-center space-x-2"
        >
          <FaBolt /> <span>Buy Now</span>
        </button>



        <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-700">Description</h2>
        {/* ⚠️ Placeholder: The 'description' field is missing from your backend schema. */}
        <p className="text-gray-600 mb-8 leading-relaxed text-lg whitespace-pre-line border-l-4 border-yellow-400 pl-3 bg-yellow-50 p-2 rounded-md">
          This is a placeholder description. To display actual product details here, please update your **Backend/models/Plant.js** file to include a `description` field.
        </p>


      </div>
    </div>
  );
}

export default ProductDetail;