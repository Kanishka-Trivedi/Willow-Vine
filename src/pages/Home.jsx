import React from 'react'
import HomeSlider from '../components/HomeSlider'
import HomeCatSlider from '../components/HomeCatSlider'
import { FaShippingFast } from "react-icons/fa";
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProductSlider from '../components/ProductSlider';


function Home() {


  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div>
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
              <h2 className='text-[20px] font-[600]'>Popular Products</h2>
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
                <Tab label="Succulents" />
                <Tab label="Planters" />
                <Tab label="Cactus" />
                <Tab label="Bonsai" />
                <Tab label="Snake Plants" />
                <Tab label="Show Plants" />
                <Tab label="Gardening Tools" />
                <Tab label="Accessories" />
                <Tab label="Seeds" />
                <Tab label="Soils" />
                <Tab label="Flowering Plants" />
                <Tab label="Herbal Plants" />
                <Tab label="Fruiting Plants" />
                <Tab label="Vegetable Plants" />
              </Tabs>
            </div>
          </div>




          <ProductSlider items = {5} />


        </div>
      </section>


    </div>
  )
}

export default Home
