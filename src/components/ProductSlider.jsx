// import React from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import ProductItem from './ProductItem';

// const ProductSlider = (props) => {
//     return (
//         <section className='productSlider py-3'>

//             <Swiper
//                 slidesPerView={props.items}
//                 spaceBetween={30}
//                 navigation={true}
//                 modules={[Navigation]}
//                 className="mySwiper"
//             >
//                 <SwiperSlide>
//                    <ProductItem />
//                 </SwiperSlide>

//                 <SwiperSlide>
//                    <ProductItem />
//                 </SwiperSlide>

//                 <SwiperSlide>
//                    <ProductItem />
//                 </SwiperSlide>

//                 <SwiperSlide>
//                    <ProductItem />
//                 </SwiperSlide>

//                 <SwiperSlide>
//                    <ProductItem />
//                 </SwiperSlide>

//                 <SwiperSlide>
//                    <ProductItem />
//                 </SwiperSlide>

//                 <SwiperSlide>
//                    <ProductItem />
//                 </SwiperSlide>

//                 <SwiperSlide>
//                    <ProductItem />
//                 </SwiperSlide>

//                 <SwiperSlide>
//                    <ProductItem />
//                 </SwiperSlide>
//             </Swiper>

//         </section>
//     )
// }

// export default ProductSlider








import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ProductItem from './ProductItem';
import PropTypes from 'prop-types';

const ProductSlider = ({ items = 4, products = [] }) => {
  return (
    <section className='productSlider py-3'>
      <Swiper
        slidesPerView={items}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          0:   { slidesPerView: 1 },
          480: { slidesPerView: Math.min(2, items) },
          768: { slidesPerView: Math.min(3, items) },
          1024:{ slidesPerView: items }
        }}
      >
        {products.map((p) => (
          <SwiperSlide key={p.id}>
            <ProductItem
              image={p.image}
              title={p.title}
              rating={p.rating}
              price={p.price}
              oldPrice={p.oldPrice}
              discountLabel={p.discountLabel}
              link={p.link}
              onFavorite={() => p.onFavorite?.(p)}
              onQuickView={() => p.onQuickView?.(p)}
              onCompare={() => p.onCompare?.(p)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

ProductSlider.propTypes = {
  items: PropTypes.number,
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number,
    price: PropTypes.string.isRequired,
    oldPrice: PropTypes.string,
    discountLabel: PropTypes.string,
    link: PropTypes.string,
    onFavorite: PropTypes.func,
    onQuickView: PropTypes.func,
    onCompare: PropTypes.func
  }))
};

export default ProductSlider
