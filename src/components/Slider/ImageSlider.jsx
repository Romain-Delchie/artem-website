import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './ImageSlider.scss'
import slide_image_1 from '/images/products/tdl.jpg'
import slide_image_2 from '/images/products/mp.jpg'
import slide_image_3 from '/images/products/tapis.jpg'
import slide_image_4 from '/images/products/TE_Bong.jpg'
import slide_image_5 from '/images/products/bdeLam.jpg'
import slide_image_6 from '/images/products/TE_cordon.jpg'
import slide_image_7 from '/images/products/tb.jpg'
import slide_image_8 from '/images/products/TE_recouv.jpg'
import slide_image_9 from '/images/products/tr.jpg'
import slide_image_10 from '/images/products/enfourneur.jpg'
import slide_image_11 from '/images/products/colonne.jpg'
import slide_image_12 from '/images/products/sechoir.jpg'
import slide_image_13 from '/images/products/ciseaux.jpg'
import slide_image_14 from '/images/products/grille.jpg'
import slide_image_15 from '/images/products/autre.jpg'

export default function ImageSlider() {
    return (
        <div className='image-slider-container'>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={2}
                speed={4000}
                autoplay={{
                    delay: 1,
                    disableOnInteraction: false,
                }}
                coverflowEffect={{
                    "rotate": 70,
                    "stretch": 0,
                    "depth": 600,
                    "modifier": 1,
                    "slideShadows": true
                }}
                // pagination={true}
                modules={[Autoplay, EffectCoverflow, Pagination]}
                className="my-swiper"
            >
                <SwiperSlide className='image-swiper-slide'>
                    <img src={slide_image_1} alt='slide_image_1' />
                </SwiperSlide>
                <SwiperSlide className='image-swiper-slide'>
                    <img src={slide_image_2} alt='slide_image_2' />
                </SwiperSlide>
                <SwiperSlide className='image-swiper-slide'>
                    <img src={slide_image_3} alt='slide_image_3' />
                </SwiperSlide>
                <SwiperSlide className='image-swiper-slide'>
                    <img src={slide_image_4} alt='slide_image_4' />
                </SwiperSlide>
                <SwiperSlide className='image-swiper-slide'>
                    <img src={slide_image_5} alt='slide_image_5' />
                </SwiperSlide>
                <SwiperSlide className='image-swiper-slide'>
                    <img src={slide_image_6} alt='slide_image_6' />
                </SwiperSlide>
                <SwiperSlide className='image-swiper-slide'>
                    <img src={slide_image_7} alt='slide_image_7' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide_image_8} alt='slide_image_8' />
                </SwiperSlide>
                <SwiperSlide className='image-swiper-slide'>
                    <img src={slide_image_9} alt='slide_image_9' />
                </SwiperSlide>
                <SwiperSlide className='image-swiper-slide'>
                    <img src={slide_image_10} alt='slide_image_10' />
                </SwiperSlide>
                <SwiperSlide className='image-swiper-slide'>
                    <img src={slide_image_11} alt='slide_image_11' />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src={slide_image_12} alt='slide_image_12' />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src={slide_image_13} alt='slide_image_13' />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src={slide_image_14} alt='slide_image_14' />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src={slide_image_15} alt='slide_image_15' />
                </SwiperSlide>
            </Swiper>
        </div >
    )
}
