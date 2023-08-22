import './TextSlider.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import "swiper/css";

export default function TextSlider() {
    return (
        <div className='text-slider-container'>
            <Swiper className='text-swiper'
                slidesPerView={1}
                spaceBetween={10}
                speed={5000}
                loop={true}
                autoplay={{
                    reverseDirection: true,
                    delay: 1,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
            >
                <SwiperSlide className='text-swiper-slide'>
                    <p>Toile enfourneur</p>
                </SwiperSlide>
                <SwiperSlide className='text-swiper-slide'>
                    <p>Toile de couche</p>
                </SwiperSlide>
                <SwiperSlide className='text-swiper-slide'>
                    <p>Toile de balancelle</p>
                </SwiperSlide>
                <SwiperSlide className='text-swiper-slide'>
                    <p>Tapis de laminoir</p>
                </SwiperSlide>
                <SwiperSlide className='text-swiper-slide'>
                    <p>Manchons de façonneuse</p>
                </SwiperSlide>
                <SwiperSlide className='text-swiper-slide'>
                    <p>Enfourneur</p>
                </SwiperSlide>
                <SwiperSlide className='text-swiper-slide'>
                    <p>Elevateur ciseaux, colonne, intégré</p>
                </SwiperSlide>
                <SwiperSlide className='text-swiper-slide'>
                    <p>Grilles et séchoir à couche</p>
                </SwiperSlide>
                <SwiperSlide className='text-swiper-slide'>
                    <p>Tapis de Transport</p>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}



