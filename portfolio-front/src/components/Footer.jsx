import { useState, useEffect } from 'react';
import { getFetchData } from '../util/fetch.js';
import { Title, SubTitle } from './commons/Titles.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    const [data, setData] = useState({}); 
    useEffect(()=>{
        const fetchData = async() => {
            const jsonData = await getFetchData("/footer");
            setData(jsonData.result);
        }
        fetchData();
    }, []);
    
    return (
        <footer id="contact" className="footer">
            <Title title="Let's Talk" />
            <SubTitle subTitle="com.developer.judy@gmail.com" />
            <ul className="contact-links">
                {data?.list?.map((item, idx) => 
                    <li key={idx}>
                        <a href={item.href} className="contact-link">
                            {item.icon === "github" && 
                                <FontAwesomeIcon icon={faGithub} /> }
                            {item.icon === "linkedin" && 
                                <FontAwesomeIcon icon={faLinkedin} /> }
                        </a>
                    </li>                
                )}
            </ul>
            <p>{data?.description}</p>
        </footer>
    )
}