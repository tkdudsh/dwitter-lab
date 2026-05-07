import { Title, Description } from "../components/commons/Titles.jsx"
import Majors from "../components/content/Majors.jsx";
import Jobs from "../components/content/Jobs.jsx";
import { useOutletContext } from "react-router-dom";

export default function About() {
    const { data } = useOutletContext();
    return (
        <section id="about" className="section container">
            <Title title="About me" />
            <Description description={data?.about?.description} />
            <Majors majors={data?.about?.majors} />
            <Jobs jobs={data?.about?.jobs}/>            
        </section>
    )
}