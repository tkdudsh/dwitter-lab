import React from 'react';
import { Title, SubTitle } from '../components/commons/Titles.jsx';
import Categories from '../components/content/Categories.jsx';
import Projects from '../components/content/Projects.jsx';
import { useOutletContext } from 'react-router-dom';

export default function Work() {
    const { data }  = useOutletContext();
    return (
        <section id="work" className="section container">
            <Title title="My Work" />
            <SubTitle subTitle="Projects" />
            <Categories categories={data?.work?.categories} />
            <Projects   projects={data?.work?.projects}  />
        </section>
    );
}


