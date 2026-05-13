import { getFetchData } from '../util/fetch.js';
import { useState, useEffect } from 'react';
import { Title, Description } from "../components/commons/Titles.jsx"
import Majors from "../components/content/Majors.jsx";
import Jobs from "../components/content/Jobs.jsx";

export default function About() {
    const [description, setDescription] = useState('');
    const [jobs, setJobs] = useState([]);
    const [majors, setMajors] = useState([]);

    useEffect(()=> {        
        const fetchData = async() => {
            const jsonData = await getFetchData("/content/about");
            setDescription(jsonData.result.description);
            setMajors(jsonData.result.majors);
            setJobs(jsonData.result.jobs);
        }
        fetchData();
    }, []);

    return (
        <section id="about" className="section container">
            <Title title="About me" />
            <Description description={description} />
            <Majors majors={majors} />
            <Jobs jobs={jobs}/>            
        </section>
    )
}