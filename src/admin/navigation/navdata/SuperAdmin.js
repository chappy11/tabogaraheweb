import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faUserSecret} from '@fortawesome/free-solid-svg-icons'
export const SuperAdmin = [
    {
        title:"Home",
        icon:<FontAwesomeIcon  icon={faHome} size="lg"/>,
        link:"/admin"
    },
    {
        title:"Admin List",
        icon:<FontAwesomeIcon icon={faUserSecret} size="lg"/>,
        link:"/adminlist"
    }
]