import React from "react";
import ProductSlider from "../components/ProductSlider";
import { getPlants } from "../api";
import { useState, useEffect } from "react";


const FloweringPlants = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const { data } = await getPlants();
        // only keep succulents
        setPlants(data.filter(plant => plant.category === "Flowering Plants"));
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };
    fetchPlants();
  }, []);

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

          <ProductSlider items={5} products={plants} />
        </div>
      </section>
    </div>
  );
};

export default FloweringPlants;
