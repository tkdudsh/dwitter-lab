import { useState, useEffect } from 'react';
import AvatarImage from "../components/commons/AvatarImage.jsx"
import Menu from "../components/commons/Menu.jsx"
import { useOutletContext } from "react-router-dom"
import { useSelector } from 'react-redux';
import { getFetchData } from "../util/fetch.js";

export default function Home() {  
    const likeCount = useSelector((state) => state.like.count);
    const projectList = useSelector((state) => state.like.list);

    const [data, setData] = useState({});
    useEffect(()=>{
        const fetchData = async() => {
            const jsonData = await getFetchData("/content/home");
            setData(jsonData.result);
        }
        fetchData();
    }, []);
    const { img, alt, title, name, description, href, menuName } = data;
    
    return (
        <section id="home">
            <AvatarImage img={img}
                            alt={alt}
                            style="home-avatar" />
            <h2 className="home-title">
                Hello<br/>
                I'm <strong className="home-title-strong">{title}</strong>,
                {name}
            </h2>
            <p className="home-description">{description}</p>
            <Menu   href={href}
                    style="home-contact"
                    name={menuName} />
            <h1 style={{color:'red'}}>❤좋아요[{likeCount}]</h1>   
            <p>{projectList}</p>                 
        </section>
    )
}