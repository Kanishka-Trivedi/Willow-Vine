import React from "react";
import ProductSlider from "../components/ProductSlider";
import products from "../data/products.js";

const HangingPlants = () => {
  // filter Hanging Plants products
  const hangingPlants = products.filter(
    (p) => p.category === "Hanging Plants"
  );

  return (
    <div>

      {/* ✅ Hanging Plants Section */}
      <section className="bg-white py-8">
        <div className="container">
          <h2 className="text-[22px] font-[600] mb-2">Hanging Plants</h2>
          <p className="text-[14px] font-[400] mb-6">
            Explore our wide range of Hanging Plants perfect for indoor and
            outdoor decoration.
          </p>

          <ProductSlider items={5} products={hangingPlants} />
        </div>
      </section>
    </div>
  );
};

export default HangingPlants;
