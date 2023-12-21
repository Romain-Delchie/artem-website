import React from 'react';

export default function Presentation({ presentations }) {
    return (
        <>
            {presentations.map((item) => (
                < section className='hero-description-container' key={item.id} >
                    <h2>{item.title}</h2>
                    <p>{item.paragraph}</p>
                </section >
            ))
            }
        </>
    )
}

