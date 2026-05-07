import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

export default function ArrowTop() {
    return (
        <aside>
            <a href="#" className="arrow-up">
                <FontAwesomeIcon icon={faArrowUp} />
            </a>
        </aside>
    );
}

