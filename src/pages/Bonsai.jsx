import React from "react";
import ProductSlider from "../components/ProductSlider";
import products from "../data/products.js";

const Bonsai = () => {
  // filter bonsai products
  const bonsai = products.filter(
    (p) => p.category === "Bonsai"
  );

  return (
    <div>

      {/* ✅ Bonsai Section */}
      <section className="bg-white py-8">
        <div className="container">
          <h2 className="text-[22px] font-[600] mb-2">Bonsai</h2>
          <p className="text-[14px] font-[400] mb-6">
            Explore our wide range of Bonsai plants perfect for indoor and
            outdoor decoration.
          </p>

          <ProductSlider items={5} products={bonsai} />
        </div>
      </section>
    </div>
  );
};

export default Bonsai;
