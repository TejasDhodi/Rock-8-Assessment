import React from 'react'
// import Swiper core and required modules
import { Navigation, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Carousel = () => {
    return (
        <section className="carouselContainer">
            <Swiper
                modules={[Navigation, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                autoplay={true}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                <SwiperSlide> <p>Get 10% off on business sign up</p></SwiperSlide>
                <SwiperSlide> <p>Get 30% off on Individual sign up</p></SwiperSlide>
                <SwiperSlide> <p>Get 50% off on Group sign up</p></SwiperSlide>
                <SwiperSlide> <p>Get 20% off on Company sign up</p></SwiperSlide>
            </Swiper>
        </section>
    )
}

export default Carousel
