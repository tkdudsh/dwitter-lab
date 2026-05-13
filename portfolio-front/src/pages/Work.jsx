import React, { useState, useEffect } from 'react';
import { getFetchData } from '../util/fetch.js';
import { Title, SubTitle } from '../components/commons/Titles.jsx';
import Categories from '../components/content/Categories.jsx';
import Projects from '../components/content/Projects.jsx';

export default function Work() {
    const [categories, setCategories] = useState([]);
    const [projects, setProjects] = useState([]);
    useEffect(()=>{
        const fetchData = async() => {
            const jsonData = await getFetchData("/content/work");
            setCategories(jsonData.result.categories);
            setProjects(jsonData.result.projects);
        }
        fetchData();
    }, []);

    return (
        <section id="work" className="section container">
            <Title title="My Work" />
            <SubTitle subTitle="Projects" />
            <Categories categories={categories} />
            <Projects   projects={projects}  />
        </section>
    );
}


