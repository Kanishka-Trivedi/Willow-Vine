import React from "react";
import Header from "../components/Header.jsx"; 
import ProductSlider from "../components/ProductSlider";
import products from "../data/products.js";

const Succulents = () => {
  // filter succulent products
  const succulentProducts = products.filter(
    (p) => p.category === "Succulents"
  );

  return (
    <div>

      {/* ✅ Succulent Section */}
      <section className="bg-white py-8">
        <div className="container">
          <h2 className="text-[22px] font-[600] mb-2">Succulents</h2>
          <p className="text-[14px] font-[400] mb-6">
            Explore our wide range of Succulent plants perfect for indoor and
            outdoor decoration.
          </p>

          <ProductSlider items={5} products={succulentProducts} />
        </div>
      </section>
    </div>
  );
};

export default Succulents;
