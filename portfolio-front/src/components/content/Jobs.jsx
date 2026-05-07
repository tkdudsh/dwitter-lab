import Job from "./Job.jsx"

export default function Jobs({ jobs }) {  //jobs 배열객체임
    return (
        <ul className="jobs">
            { jobs?.map((item, idx) => 
                <li className="job" key={idx}>
                    <Job    img={item.img}
                            alt={item.alt}
                            name={item.name}
                            period={item.period}
                    />
                </li>            
            ) }
        </ul>
    )
}