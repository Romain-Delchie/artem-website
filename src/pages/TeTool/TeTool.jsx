
import { useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import './TeTool.scss';

export default function TeTool() {

    const [brand, setBrand] = useState('');
    const buttonStyle = {
        position: "absolute",
        left: "20%",
        top: "200%",
        width: "90px",
        background: 'grey',
        border: '0px',
        color: 'white',
    };

    const btnRight = {
        marginLeft: "150px",
    }

    const properties = {
        prevArrow: <button style={{ ...buttonStyle }}>Retour</button>,
        nextArrow: <button style={{ ...buttonStyle, ...btnRight }}> Valider</button>,
        autoplay: false,
        indicators: true,
        transitionDuration: 500,
    }
    return (
        <main className='te-tool'>
            <h2>TeTool</h2>
            <div className="te-tool-container">
                <Slide {...properties}>
                    <div className='each-slide-effect'>
                        <label htmlFor="brand">Marque du Four</label>
                        <select name="brand" id="brand" onChange={(e) => setBrand(e.target.value)}>
                            <option disabled selected hidden>Choisissez une marque de four</option>
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
                    <div className='each-slide-effect'>
                        <label htmlFor="eaLength">Longueur de rouleau à rouleau en mm</label>
                        <input type="number" placeholder="ex: 2000mm" />
                    </div>
                </Slide>
            </div>
        </main>
    )
}