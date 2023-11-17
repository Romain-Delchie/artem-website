import React, { useState, useEffect, useRef } from 'react';
import './ScrollToTopBtn.scss'

export default function ScrollToTopBtn() {
    const [isVisible, setIsVisible] = useState(false);

    // Écoutez l'événement de défilement pour déterminer si la flèche doit être visible

    // Ajoutez et retirez l'écouteur d'événement de défilement lorsque le composant est monté/démonté


    return (
        <div className={`scroll-to-top ${isVisible ? 'visible' : ''}`}>
            ↑
        </div>
    );
};
