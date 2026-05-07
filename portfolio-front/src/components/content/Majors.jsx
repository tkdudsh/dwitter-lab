import Major from "./Major.jsx";

export default function Majors({ majors }) {

    return (
        <ul className="majors">
            { majors?.map((item, idx) =>  
                <li className="major" key={idx}>
                    <Major  title={item.title}
                            subjects={item.subjects}
                            icon={item.icon}  />
                </li>            
            ) }
        </ul>
    )
}