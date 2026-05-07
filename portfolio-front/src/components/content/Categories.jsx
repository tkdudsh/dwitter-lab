import React, { useState } from 'react';

export default function Categories({ categories }) {
    const [category, setCategory] = useState("All");

    return (
        <ul className="categories">
            { categories?.map((item, idx) => 
                <li key={idx}>
                    {  category === item.category ?
                        <button className="category active"
                                onMouseOver={()=> setCategory(item.category)}>
                                    {item.category}
                            <span className="category-count">{item.count}</span>
                        </button>
                        :  <button className="category"
                                onMouseOver={()=> setCategory(item.category)}>
                                    {item.category}
                            <span className="category-count">{item.count}</span>
                            </button>
                    }
                </li>            
            ) }
        </ul>
    );
}

