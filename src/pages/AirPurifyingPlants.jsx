import React from "react";
import ProductSlider from "../components/ProductSlider";
import products from "../data/products.js";

const AirPurifyingPlants = () => {
  // filter Air Purifying Plants products
  const airPurifyingPlants = products.filter(
    (p) => p.category === "Air Purifying Plants"
  );

  return (
    <div>

      {/* ✅ Air Purifying Plants Section */}
      <section className="bg-white py-8">
        <div className="container">
          <h2 className="text-[22px] font-[600] mb-2">Air Purifying Plants</h2>
          <p className="text-[14px] font-[400] mb-6">
            Explore our wide range of Air Purifying Plants perfect for indoor and
            outdoor decoration.
          </p>

          <ProductSlider items={5} products={airPurifyingPlants} />
        </div>
      </section>
    </div>
  );
};

export default AirPurifyingPlants;
