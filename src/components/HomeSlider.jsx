import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Succulents from '../assets/Succulents.jpg'
import Plants from '../assets/Plants.jpg'
import Seeds from '../assets/Seeds.jpg'
import Soils from '../assets/Soils.jpg'
import Planters from '../assets/Planters.jpg'
import Accessories from '../assets/Accessories.jpg'


function HomeSlider() {
    return (
        <div>
            <div className='homeSlider py-4'>
                <div className='container'>
                    <Swiper spaceBetween={10} navigation={true} modules={[Navigation]} className="sliderHome">
                        <SwiperSlide>
                            <div className='item rounded-[20px] overflow-hidden'>
                                <img src={Succulents} alt="Succulents" className="w-full h-[500px] object-cover" />
                            </div>
                        </SwiperSlide>


                        <SwiperSlide>
                            <div className='item rounded-[20px] overflow-hidden'>
                                <img src={Plants} alt="Plants" className="w-full h-[500px] object-cover" />
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='item rounded-[20px] overflow-hidden'>
                                <img src={Planters} alt="Planters" className="w-full h-[500px] object-cover" />
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='item rounded-[20px] overflow-hidden'>
                                <img src={Seeds} alt="Seeds" className="w-full h-[500px] object-cover" />
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='item rounded-[20px] overflow-hidden'>
                                <img src={Soils} alt="Soils" className="w-full h-[500px] object-cover" />
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='item rounded-[20px] overflow-hidden'>
                                <img src={Accessories} alt="Soils" className="w-full h-[500px] object-cover" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default HomeSlider
