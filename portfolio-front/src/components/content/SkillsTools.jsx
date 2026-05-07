import React from 'react';

export default function SkillsTools({ list }) {    
    return (
        <ul>
            {list?.map((item, idx) => 
                <li key={idx}>{item}</li>
            )}
        </ul>
    );
}

