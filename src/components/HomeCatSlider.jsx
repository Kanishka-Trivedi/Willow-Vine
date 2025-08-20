import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Succulent from '../assets/Succulent.jpg'
import Planter from '../assets/Planter.jpg'
import Cactus from '../assets/Cactus.jpg'
import Bonsai from '../assets/Bonsai.jpg'
import SnakePlant from '../assets/SnakePlant.jpg'
import ShowPlants from '../assets/ShowPlants.jpg'
import GardeningTools from '../assets/GardeningTools.jpg'
import Accessory from '../assets/Accessory.jpg'
import Seed from '../assets/Seed.jpg'
import Soil from '../assets/Soil.jpg'
import { Link } from 'react-router-dom';


function HomeCatSlider() {
    return (
        <div className='homeCatSlider w-full pt-4 py-8'>
            <div className='container w-full whitespace-nowrap'>
                <Swiper
                    slidesPerView={7}
                    spaceBetween={20}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <Link to="/">
                        <div className='item px-3 py-5 bg-white rounded-sm text-center flex items-center justify-center flex-col'>
                           <img src={Succulent} alt="Succulent" className='w-[200px] h-[120px] rounded-lg transition-all' />
                           <h3 className='text-[18px] font-[500] mt-3'>Succulents</h3>
                        </div>
                        </Link>
                    </SwiperSlide>


                    <SwiperSlide>
                        <Link to="/">
                        <div className='item px-3 py-5 bg-white rounded-sm text-center flex items-center justify-center flex-col'>
                           <img src={Planter} alt="Planters" className='w-[200px] h-[120px] rounded-lg transition-all' />
                           <h3 className='text-[18px] font-[500] mt-3'>Planters</h3>
                        </div>
                        </Link>
                    </SwiperSlide>


                    <SwiperSlide>
                        <Link to="/">
                        <div className='item px-3 py-5 bg-white rounded-sm text-center flex items-center justify-center flex-col'>
                           <img src={Cactus} alt="Cactus" className='w-[200px] h-[120px] rounded-lg transition-all' />
                           <h3 className='text-[18px] font-[500] mt-3'>Cactus</h3>
                        </div>
                        </Link>
                    </SwiperSlide>


                    <SwiperSlide>
                        <Link to="/">
                        <div className='item px-3 py-5 bg-white rounded-sm text-center flex items-center justify-center flex-col'>
                           <img src={Bonsai} alt="Bonsai" className='w-[200px] h-[120px] rounded-lg transition-all' />
                           <h3 className='text-[18px] font-[500] mt-3'>Bonsai</h3>
                        </div>
                        </Link>
                    </SwiperSlide>


                    <SwiperSlide>
                        <Link to="/">
                        <div className='item px-3 py-5 bg-white rounded-sm text-center flex items-center justify-center flex-col'>
                           <img src={SnakePlant} alt="Snake Plants" className='w-[200px] h-[120px] rounded-lg transition-all' />
                           <h3 className='text-[18px] font-[500] mt-3'>Snake Plants</h3>
                        </div>
                        </Link>
                    </SwiperSlide>


                    <SwiperSlide>
                        <Link to="/">
                        <div className='item px-3 py-5 bg-white rounded-sm text-center flex items-center justify-center flex-col'>
                           <img src={ShowPlants} alt="Show Plants" className='w-[200px] h-[120px] rounded-lg transition-all' />
                           <h3 className='text-[18px] font-[500] mt-3'>Show Plants</h3>
                        </div>
                        </Link>
                    </SwiperSlide>


                    <SwiperSlide>
                        <Link to="/">
                        <div className='item px-3 py-5 bg-white rounded-sm text-center flex items-center justify-center flex-col'>
                           <img src={GardeningTools} alt="Gardening Tools" className='w-[200px] h-[120px] rounded-lg transition-all' />
                           <h3 className='text-[18px] font-[500] mt-3'>Gardening Tools</h3>
                        </div>
                        </Link>
                    </SwiperSlide>


                    <SwiperSlide>
                        <Link to="/">
                        <div className='item px-3 py-5 bg-white rounded-sm text-center flex items-center justify-center flex-col'>
                           <img src={Accessory} alt="Accessories" className='w-[200px] h-[120px] rounded-lg transition-all' />
                           <h3 className='text-[18px] font-[500] mt-3'>Accessories</h3>
                        </div>
                        </Link>
                    </SwiperSlide>


                    <SwiperSlide>
                        <Link to="/">
                        <div className='item px-3 py-5 bg-white rounded-sm text-center flex items-center justify-center flex-col'>
                           <img src={Seed} alt="Seeds" className='w-[200px] h-[120px] rounded-lg transition-all' />
                           <h3 className='text-[18px] font-[500] mt-3'>Seeds</h3>
                        </div>
                        </Link>
                    </SwiperSlide>


                    <SwiperSlide>
                        <Link to="/">
                        <div className='item px-3 py-5 bg-white rounded-sm text-center flex items-center justify-center flex-col'>
                           <img src={Soil} alt="Soils" className='w-[200px] h-[120px] rounded-lg transition-all' />
                           <h3 className='text-[18px] font-[500] mt-3'>Soils</h3>
                        </div>
                        </Link>
                    </SwiperSlide>
                   

                </Swiper>
            </div>
        </div>
    )
}

export default HomeCatSlider
