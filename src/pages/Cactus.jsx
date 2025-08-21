import React from "react";
import ProductSlider from "../components/ProductSlider";
import products from "../data/products.js";

const Cactus = () => {
  // filter Cactus products
  const cactus = products.filter(
    (p) => p.category === "Cactus"
  );

  return (
    <div>

      {/* ✅ Cactus Section */}
      <section className="bg-white py-8">
        <div className="container">
          <h2 className="text-[22px] font-[600] mb-2">Cactus</h2>
          <p className="text-[14px] font-[400] mb-6">
            Explore our wide range of Cactus perfect for indoor and
            outdoor decoration.
          </p>

          <ProductSlider items={5} products={cactus} />
        </div>
      </section>
    </div>
  );
};

export default Cactus;
