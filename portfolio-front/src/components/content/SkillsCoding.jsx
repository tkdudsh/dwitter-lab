import React from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../../features/skillsSlice.js';

export default function SkillsCoding({ list }) {
    const dispatch = useDispatch();
    return (
        <ul>
            {list?.map((skill, idx) => 
                <li className="bar" key={idx}>
                    <div className="bar-title">
                        <span onClick={()=>{dispatch(add(skill.title))}}>{skill.title}</span>
                        <span>{skill.value}</span>
                    </div>
                    <div className="bar-bg">
                        <div className="bar-value" style={{width:skill.width}}></div>
                    </div>
                </li>            
            )}
        </ul>
    );
}

