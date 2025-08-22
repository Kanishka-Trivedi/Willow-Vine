import React, { useState, useEffect } from 'react';
import HomeSlider from '../components/HomeSlider';
import HomeCatSlider from '../components/HomeCatSlider';
import { FaShippingFast } from "react-icons/fa";
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProductSlider from '../components/ProductSlider';
import axios from "axios";
import Search from '../components/Search';

const categories = [
  "All",
  "Succulents",
  "Cactus",
  "Bonsai",
  "Ornamental Plants",
  "Flowering Plants",
  "Herbal Plants",
  "Fruiting Plants",
  "Vegetable Plants",
  "Planters",
  "Snake Plants",
  "Gardening Tools",
  "Accessories",
  "Seeds",
  "Soils",
];

function Home() {
  const [value, setValue] = useState(0);
  const [plants, setPlants] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/plants");
        setPlants(data);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };
    fetchPlants();
  }, []);

  // Show all products if "All" is selected, otherwise filter by category
  const filteredPlants =
    value === 0
      ? plants
      : plants.filter(plant => plant.category === categories[value]);

  return (
    <div>
      <div className="container py-4">
        <Search onResults={setSearchResults} />
      </div>

      {searchResults.length > 0 ? (
        <section className='bg-white py-8'>
          <div className='container'>
            <h2 className='text-[20px] font-[600] mb-4'>Search Results</h2>
            <ProductSlider items={5} products={searchResults} />
          </div>
        </section>
      ) : (
        <>
          <HomeSlider />
          <HomeCatSlider />

          <section className='py-16 bg-white'>
            <div className='container'>
              <div className='freeShipping w-full py-4 p-4 border-2 border-[#33880b] flex items-center justify-between rounded-md'>
                <div className='col1 flex items-center gap-4'>
                  <FaShippingFast className='text-[45px]' />
                  <span className='text-[20px] font-[600] uppercase'>Free Shipping</span>
                </div>
                <div className='col2'>
                  <p className='mb-0 font-[500]'>Free Delivery on your First Order and over Rs.249</p>
                </div>
                <p className='font-bold text-[25px]'>- Only Rs.249*</p>
              </div>
            </div>
          </section>

          <section className='bg-white py-8'>
            <div className='container'>
              <div className='flex items-center justify-between'>
                <div className='leftSec'>
                  <h2 className='text-[20px] font-[600]'>{categories[value]} Products</h2>
                  <p className='text-[14px] font-[400]'>Do not miss the current offers until the end of May.</p>
                </div>
                <div className='rightSec w-[60%]'>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    aria-label="visible arrows tabs example"
                    sx={{
                      [`& .${tabsClasses.scrollButtons}`]: {
                        '&.Mui-disabled': { opacity: 0.3 },
                      },
                    }}
                  >
                    {categories.map((cat, idx) => (
                      <Tab key={cat} label={cat} />
                    ))}
                  </Tabs>
                </div>
              </div>
              <ProductSlider items={5} products={filteredPlants} />
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Home;