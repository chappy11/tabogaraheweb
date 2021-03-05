import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope, faSignOutAlt, faStoreAlt } from "@fortawesome/free-solid-svg-icons";

const data = JSON.parse(localStorage.getItem("user"));

export const Usernavdata = [
    {
        title:"Home",
        url:"/user",
        cName:"usr-li"
    },
    {
        title:"" ,
        url:"/userinventory",
        cName:"usr-li"
    },
    {
        title:<FontAwesomeIcon icon={faStoreAlt}/>,
        url:"/mygarage",
        cName:"usr-li"
    },
    {
        title:<FontAwesomeIcon icon={faBell}/> ,
        url:"/notification",
        cName:"usr-li"
    },
    {
        title:<FontAwesomeIcon icon={faEnvelope}/> ,
        url:"/nofication",
        cName:"usr-li"
    },
    
    
    {
        title:<FontAwesomeIcon icon={faSignOutAlt}/>,
        url:"/logout",
        cName:"usr-li"
    }   
]
