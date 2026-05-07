import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function ToggleButton() {
    return(
        <button className="header-toggle" id="menu-toggle">
            {/* <i class="fa-solid fa-bars"></i> */}
            <FontAwesomeIcon icon={faBars} />
        </button>
    )
}