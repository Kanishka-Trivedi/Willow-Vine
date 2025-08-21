// // src/pages/HerbalPlants.jsx
// import React from "react";
// import products from "../data/products";
// import ProductItem from "../components/ProductItem";

// const HerbalPlants = () => {
//   const herbalPlants = products.filter(
//     (product) => product.category === "Herbal Plants"
//   );

//   return (
//     <div className="px-10 py-8">
//       <h1 className="text-3xl font-bold mb-6">Herbal Plants</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {herbalPlants.map((product) => (
//           <ProductItem
//             key={product.id}
//             image={product.image}
//             title={product.title}
//             rating={product.rating}
//             price={product.price}
//             oldPrice={product.oldPrice}
//             discountLabel={product.discountLabel}
//             link={product.link}
//             onFavorite={() => console.log("Favorited", product.title)}
//             onQuickView={() => console.log("Quick view", product.title)}
//             onCompare={() => console.log("Compare", product.title)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HerbalPlants;








import React from "react";
import Header from "../components/Header.jsx"; 
import ProductSlider from "../components/ProductSlider";
import products from "../data/products.js";

const HerbalPlants = () => {
  // filter succulent products
  const herbalPlants = products.filter(
    (p) => p.category === "Herbal Plants"
  );

  return (
    <div>

      {/* ✅ Herbal Plants Section */}
      <section className="bg-white py-8">
        <div className="container">
          <h2 className="text-[22px] font-[600] mb-2">Herbal Plants</h2>
          <p className="text-[14px] font-[400] mb-6">
            Explore our wide range of Herbal plants perfect for indoor and
            outdoor decoration.
          </p>

          <ProductSlider items={5} products={herbalPlants} />
        </div>
      </section>
    </div>
  );
};

export default HerbalPlants;
