import React from "react";
import ProductSlider from "../components/ProductSlider";
import products from "../data/products.js";

const FloweringPlants = () => {
  // filter FloweringPlants products
  const floweringPlants = products.filter(
    (p) => p.category === "Flowering Plants"
  );

  return (
    <div>

      {/* ✅ Flowering Plants Section */}
      <section className="bg-white py-8">
        <div className="container">
          <h2 className="text-[22px] font-[600] mb-2">Flowering Plants</h2>
          <p className="text-[14px] font-[400] mb-6">
            Explore our wide range of Flowering Plants perfect for indoor and
            outdoor decoration.
          </p>

          <ProductSlider items={5} products={floweringPlants} />
        </div>
      </section>
    </div>
  );
};

export default FloweringPlants;
