import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ProductItem from './ProductItem';
import PropTypes from 'prop-types';

const FALLBACK_IMAGE = '/fallback.png'; 

const ProductSlider = ({ items = 4, products = [] }) => {
  return (
    <section className="productSlider py-3">
      <Swiper
        slidesPerView={items}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: Math.min(2, items) },
          768: { slidesPerView: Math.min(3, items) },
          1024: { slidesPerView: items },
        }}
      >
        {products.map((p, idx) => {
          const pid = p._id || p.id || idx;
          const productLink = `/product/${pid}`;
          return (
            <SwiperSlide key={pid}>
              <ProductItem
                id={pid}
                image={p.image}
                title={p.title}
                rating={p.rating}
                price={p.price}
                oldPrice={p.oldPrice}
                discountLabel={p.discountLabel}
                link={p.link || productLink}
                onFavorite={() => p.onFavorite?.(p)}
                onQuickView={() => p.onQuickView?.(p)}
                onCompare={() => p.onCompare?.(p)}
                fallbackImage={FALLBACK_IMAGE} // Pass fallback to ProductItem
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

ProductSlider.propTypes = {
  items: PropTypes.number,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.string,
      title: PropTypes.string,
      rating: PropTypes.number,
      price: PropTypes.string,
      oldPrice: PropTypes.string,
      discountLabel: PropTypes.string,
      link: PropTypes.string,
      onFavorite: PropTypes.func,
      onQuickView: PropTypes.func,
      onCompare: PropTypes.func,
    })
  ),
};

export default ProductSlider;
