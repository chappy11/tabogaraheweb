import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faHome, faList, faUserAlt } from "@fortawesome/free-solid-svg-icons";

export const Admin2 = [
    
        {
            title:"Home",
            icon:<FontAwesomeIcon icon={faHome}/>,
            link:"/admin"
        },
        {
            title:"Users",
            icon:<FontAwesomeIcon icon={faUserAlt}/>,
            link:"/userlist"
        },
        {
            title:"Items",
            icon:<FontAwesomeIcon icon={faBoxOpen}/>,
            link:"/itemlist"
        },
        {
            title:"Categories",
            icon:<FontAwesomeIcon icon={faList}/>,
            link:"/catgdata"
        }
 
]