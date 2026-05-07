import React from 'react';
import AvatarImage from '../commons/AvatarImage.jsx';

export default function Testimonial({ item }) {
    return (
        <>
            <AvatarImage    img={item.img}
                            alt={item.alt}
                            style="testimonial-img" />
            <div className="testimonial-text">
                <p>{item.description}</p>
                <p><a href="#">
                    <span className="testimonial-text-name">{item.name}</span>
                    <span className="testimonial-text-company">/ {item.company}</span></a></p>     
            </div>
        </>
    );
}

