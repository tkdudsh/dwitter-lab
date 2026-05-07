import { Link, NavLink } from 'react-router-dom';

export default function Menu({href, style, name}) {
    return (
        <NavLink    to={href}
                    end={href === "/"}
                className={({isActive}) => (isActive ? `${style} active` : style)}
        >{name}</NavLink>

        // <Link to={href} className={style} >{name}</Link>
    )
}