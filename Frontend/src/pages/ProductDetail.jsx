// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getAuthHeaders } from '../auth';
// import { getPlantBySlug, addToCart } from '../api';
// import Rating from '@mui/material/Rating';
// import { FaSpinner, FaShoppingCart, FaBolt } from 'react-icons/fa';

// const FALLBACK_IMAGE = '/fallback.png';

// function ProductDetail() {
//   const { slug } = useParams();
//   const [plant, setPlant] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const navigate = useNavigate();

//   const inStock = true;

//   useEffect(() => {
//     const fetchPlantDetails = async () => {
//       setLoading(true);
//       setError(null);
//       setPlant(null);
//       setQuantity(1);

//       try {
//         const response = await getPlantBySlug(slug);
//         setPlant(response.data);
//       } catch (err) {
//         console.error('Failed to fetch plant details:', err.response ? err.response.data : err.message);
//         setError('Could not fetch product details. This product may not exist or the backend service is unavailable.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (slug) {
//       fetchPlantDetails();
//     }
//   }, [slug]);


//   const handleAddToCart = async () => {
//     if (!plant) return;

//     try {
//       const config = await getAuthHeaders();

//       // Use the centralized addToCart function
//       const { data } = await addToCart(
//         { plantId: plant._id, quantity },
//         config
//       );

//       console.log('Added to cart:', data);
//       alert(`✅ Added ${quantity} x ${plant.title} to your cart!`);
//       navigate('/cart');
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       if (error.message.includes("not authenticated") || error.response?.status === 401) {
//         alert('Please log in to add items to your cart.');
//         navigate('/login');
//       } else {
//         alert(error.response?.data?.message || 'Failed to add item to cart');
//       }
//     }
//   };


//   const handleBuyNow = () => {
//     handleAddToCart().then(() => {
//       navigate('/checkout');
//     }).catch(err => {
//       console.error("Buy Now failed: ", err);
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <FaSpinner className="animate-spin text-4xl text-[#4CBB17]" />
//         <p className="ml-3 text-lg text-gray-600">Loading product details...</p>
//       </div>
//     );
//   }

//   if (error || !plant) {
//     return (
//       <div className="p-12 text-center text-xl text-red-600 min-h-screen">
//         {error || 'Product not found.'}
//       </div>
//     );
//   }

//   const isButtonDisabled = loading || !plant || !inStock;

//   return (
//     <div className="flex flex-col md:flex-row gap-15 bg-white p-6 min-h-screen">

//       {/* Product Image Section */}
//       <div className="md:w-1/2 p-4">
//         <img
//           src={plant.image || FALLBACK_IMAGE}
//           alt={plant.title}
//           className="w-3/4 h-[450px] object-cover object-top rounded-lg shadow-md border border-gray-100 mx-auto"
//         />
//       </div>


//       {/* Product Details & Actions Section */}
//       <div className="md:w-1/2">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">{plant.title}</h1>


//         <div className="flex items-center mb-6">
//           <p className="text-2xl font-semibold text-[#1e975a] mr-4">
//             {plant.price}
//           </p>
//           {plant.oldPrice && (
//             <p className="text-xl text-gray-400 line-through">
//               {plant.oldPrice}
//             </p>
//           )}
//           {plant.discountLabel && (
//             <span className="ml-4 bg-[#4CBB17] text-white text-md font-semibold px-2 py-1 rounded">
//               {plant.discountLabel}
//             </span>
//           )}
//         </div>


//         <div className="flex items-center mb-4">
//           <Rating name="size-medium" value={plant.rating} readOnly precision={0.5} />
//           <span className="ml-2 text-md font-semibold text-gray-500">
//             ({plant.rating.toFixed(1)} / 5)
//           </span>
//         </div>


//         {/* Quantity Selector */}
//         <div className="mb-6">
//           <label className="text-lg font-semibold text-gray-700 block mb-2">
//             Quantity
//           </label>

//           <div className="flex items-center w-32 justify-between px-4 py-2 border border-gray-300 rounded-xl">
//             {/* Minus Button */}
//             <button
//               onClick={() => setQuantity(Math.max(1, quantity - 1))}
//               className="text-2xl text-gray-600 hover:text-black"
//             >
//               −
//             </button>

//             {/* Value */}
//             <span className="text-lg font-medium text-gray-800">
//               {quantity}
//             </span>

//             {/* Plus Button */}
//             <button
//               onClick={() => setQuantity(quantity + 1)}
//               className="text-2xl text-gray-600 hover:text-black"
//             >
//               +
//             </button>
//           </div>
//         </div>

//         {/* Info Section */}
//         <ul className="list-disc list-inside space-y-2 mt-4 mb-5 text-gray-700 text-md">
//           <li>5-Day Easy Returns — Unboxing video required</li>
//           <li>Free Shipping on orders above ₹249</li>
//         </ul>


//         {/* Add to Cart Button */}
//         <button
//           onClick={handleAddToCart}
//           disabled={isButtonDisabled}
//           className="w-3/4 bg-[#008000] text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 shadow-md mb-4 text-lg disabled:bg-gray-400 flex items-center justify-center space-x-2"
//         >
//           <FaShoppingCart /> <span>Add to Cart</span>
//         </button>


//         {/* Buy Now Button */}
//         <button
//           onClick={handleBuyNow}
//           disabled={isButtonDisabled}
//           className="w-3/4 bg-[#70e000] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#9ef01a] transition duration-300 shadow-md text-lg disabled:bg-gray-400 flex items-center justify-center space-x-2"
//         >
//           <FaBolt /> <span>Buy Now</span>
//         </button>


//         <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-700">Description</h2>
//         <p className="text-gray-600 mb-8 leading-relaxed text-lg whitespace-pre-line border-l-4 border-yellow-400 pl-3 bg-yellow-50 p-2 rounded-md">
//           This is a placeholder description. To display actual product details here, please update your **Backend/models/Plant.js** file to include a `description` field.
//         </p>


//       </div>
//     </div>
//   );
// }

// export default ProductDetail;





import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuthHeaders } from '../auth';
import { getPlantBySlug, addToCart } from '../api';
import Rating from '@mui/material/Rating';
import { FaSpinner, FaShoppingCart, FaBolt } from 'react-icons/fa';

const FALLBACK_IMAGE = '/fallback.png';

function ProductDetail() {
  const { slug } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const inStock = true;

  /* -----------------------------
        FETCH PLANT DETAILS
  ------------------------------*/
  useEffect(() => {
    const fetchPlantDetails = async () => {
      setLoading(true);
      setError(null);
      setPlant(null);

      try {
        const response = await getPlantBySlug(slug);

        console.log("📦 Plant fetched from backend →", response.data);

        // If backend returns { plant: {...} }
        if (response.data?.plant) {
          setPlant(response.data.plant);
        } else {
          setPlant(response.data);
        }

      } catch (err) {
        console.error('❌ Failed to fetch plant details:', err.response?.data || err.message);
        setError('Could not fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPlantDetails();
  }, [slug]);


  /* -----------------------------
        ADD TO CART FUNCTION
  ------------------------------*/
  const handleAddToCart = async () => {
    if (!plant || !plant._id) {
      console.error("❌ Missing plantId. plant →", plant);
      alert("Product information is missing.");
      return;
    }

    try {
      const payload = {
        plantId: plant._id,
        quantity: Number(quantity),
      };

      console.log("📤 Sending addToCart payload →", payload);

      const config = await getAuthHeaders();

      const { data } = await addToCart(payload, config);

      console.log("🛒 Cart updated →", data);
      alert(`✔ Added ${quantity} x ${plant.title} to your cart!`);



    } catch (error) {
      console.error("❌ Add to cart error:", error.response?.data || error.message);

      if (
        error.message.includes("not authenticated") ||
        error.response?.status === 401
      ) {
        alert("Please log in first.");
        navigate('/login');
        return;
      }

      alert(error.response?.data?.message || 'Failed to add item to cart.');
    }
  };


  /* -----------------------------
        BUY NOW
  ------------------------------*/
  const handleBuyNow = async () => {
    try {
      await handleAddToCart();
      navigate('/checkout');
    } catch (err) {
      console.error("❌ Buy Now error:", err);
    }
  };


  /* -----------------------------
        RENDER LOADING / ERROR
  ------------------------------*/
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-[#4CBB17]" />
        <p className="ml-3 text-lg text-gray-600">Loading product...</p>
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


  /* -----------------------------
            MAIN UI
  ------------------------------*/
  return (
    <div className="flex flex-col md:flex-row gap-0 bg-white p-6 min-h-screen">

      {/* Product Image */}
      <div className="md:w-1/2 p-4">
        <img
          src={plant.image || FALLBACK_IMAGE}
          alt={plant.title}
          className="w-3/4 h-[450px] object-cover object-top rounded-lg shadow-md border border-gray-100 mx-auto"
        />
      </div>

      {/* Product Details */}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{plant.title}</h1>

        <div className="flex items-center mb-6">
          <p className="text-2xl font-semibold text-[#1e975a] mr-4">
            {plant.price}
          </p>

          {plant.oldPrice && (
            <p className="text-xl text-gray-400 line-through">{plant.oldPrice}</p>
          )}

          {plant.discountLabel && (
            <span className="ml-4 bg-[#4CBB17] text-white text-md font-semibold px-2 py-1 rounded">
              {plant.discountLabel}
            </span>
          )}
        </div>

        <div className="flex items-center mb-4">
          <Rating value={plant.rating} readOnly precision={0.5} />
          <span className="ml-2 text-md font-semibold text-gray-500">
            ({plant.rating.toFixed(1)} / 5)
          </span>
        </div>

        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="text-lg font-semibold text-gray-700 block mb-2">Quantity</label>

          <div className="flex items-center w-32 justify-between px-4 py-2 border border-gray-300 rounded-xl">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-2xl text-gray-600 hover:text-black"
            >−</button>

            <span className="text-lg font-medium">{quantity}</span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-2xl text-gray-600 hover:text-black"
            >+</button>
          </div>
        </div>

        {/* Info */}
        <ul className="list-disc list-inside space-y-2 mt-4 mb-5 text-gray-700 text-md">
          <li>5-Day Easy Returns — Unboxing video required</li>
          <li>Free Shipping on orders above ₹249</li>
        </ul>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="w-3/4 bg-[#008000] text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition shadow-md mb-4 text-lg flex items-center justify-center space-x-2"
        >
          <FaShoppingCart /> <span>Add to Cart</span>
        </button>

        {/* Buy Now */}
        <button
          onClick={handleBuyNow}
          className="w-3/4 bg-[#70e000] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#9ef01a] transition shadow-md text-lg flex items-center justify-center space-x-2"
        >
          <FaBolt /> <span>Buy Now</span>
        </button>

        {/* Description */}
        <h2 className="text-2xl font-bold mt-9 mb-3 text-gray-700">Description</h2>

        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
          {plant.description}
        </p>
      </div>
    </div>
  );
}

export default ProductDetail;
