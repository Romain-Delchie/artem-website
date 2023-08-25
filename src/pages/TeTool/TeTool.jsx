import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import './TeTool.scss';
SwiperCore.use([Navigation, Pagination]);

export default function TeTool() {
    const [brand, setBrand] = useState('');
    const [swiper, setSwiper] = useState(null);

    const handleBrandChange = (selectedBrand) => {
        setBrand(selectedBrand);
        console.log(selectedBrand)
    };

    const handleValidateClick = () => {
        // Vérifiez la marque sélectionnée et naviguez en conséquence
        console.log(brand);
        switch (brand) {
            case 'bongard':
                if (swiper) {
                    swiper.slideTo(3); // Navigue vers la deuxième diapositive (diapositive Bongard)
                }
                break;
            // Ajoutez d'autres cas pour d'autres marques si nécessaire
            default:
                // Par défaut, ne navigue pas vers une diapositive spécifique
                swiper.slideTo(2); // Navigue vers la prochaine diapositive
                break;
        }
    };

    return (
        <main className='te-tool'>
            <h2>Définissez facilement votre toile enfourneur en répondant aux questions suivantes :</h2>
            <div className="te-tool-container">
                <Swiper
                    className='te-tool-swiper'
                    modules={[Navigation, Pagination]}
                    onSwiper={setSwiper}
                    navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                >
                    <SwiperSlide>
                        <div className='each-slide-effect'>
                            <label htmlFor="brand">Marque du Four</label>
                            <select name="brand" id="brand" onChange={(e) => handleBrandChange(e.target.value)}>
                                <option disabled hidden>Choisissez une marque de four</option>
                                <option value="abry">Abry</option>
                                <option value="bongard">Bongard</option>
                                <option value="eurofours">Eurofours/Jolivet</option>
                                <option value="fringand">Fringand</option>
                                <option value="map">Map</option>
                                <option value="pavailler">Pavailler</option>
                                <option value="polin">Polin</option>
                                <option value="real">Real Forni</option>
                                <option value="tagliavini">Tagliavini</option>
                                <option value="technodif">Technodif</option>
                                <option value="inconnu">Autre ou inconnu</option>
                            </select>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='each-slide-effect'>
                            <label htmlFor="eaLength">Longueur de rouleau à rouleau en mm</label>
                            <input type="number" placeholder="ex: 2000mm" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='each-slide-effect'>
                            <h4>test reussi</h4>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div className="btn-container">
                    <div className="swiper-button-next" onClick={handleValidateClick}>
                        Valider
                    </div>
                    <div className="swiper-button-prev">
                        Retour
                    </div>

                </div>
            </div>
        </main>
    );
}
