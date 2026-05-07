import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHtml5 } from "@fortawesome/free-brands-svg-icons"
import { faMobile, faServer} from "@fortawesome/free-solid-svg-icons"

export default function Major({ title, subjects, icon }) {
    return (
        <>
            {icon === "html" && <FontAwesomeIcon icon={faHtml5} className="major-icon" />}
            {icon === "mobile" && <FontAwesomeIcon icon={faMobile} className="major-icon" />}
            {icon === "server" && <FontAwesomeIcon icon={faServer} className="major-icon" />}
            <p className="major-title">{title}</p>
            <p>{subjects}</p>
        </>
    )
}