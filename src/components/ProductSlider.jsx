import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ProductItem from './ProductItem';

const ProductSlider = (props) => {
    return (
        <section className='productSlider py-3'>

            <Swiper
                slidesPerView={props.items}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                   <ProductItem />
                </SwiperSlide>

                <SwiperSlide>
                   <ProductItem />
                </SwiperSlide>

                <SwiperSlide>
                   <ProductItem />
                </SwiperSlide>

                <SwiperSlide>
                   <ProductItem />
                </SwiperSlide>

                <SwiperSlide>
                   <ProductItem />
                </SwiperSlide>

                <SwiperSlide>
                   <ProductItem />
                </SwiperSlide>

                <SwiperSlide>
                   <ProductItem />
                </SwiperSlide>

                <SwiperSlide>
                   <ProductItem />
                </SwiperSlide>

                <SwiperSlide>
                   <ProductItem />
                </SwiperSlide>
            </Swiper>

        </section>
    )
}

export default ProductSlider
