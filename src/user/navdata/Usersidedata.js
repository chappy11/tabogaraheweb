import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faWarehouse, faStoreAlt, faTags, faHandshake } from "@fortawesome/free-solid-svg-icons";
export const Usersidedata = [
    {
        title : "Inventory",
        icon : <FontAwesomeIcon icon={faWarehouse}/>,
        link:"/userinventory"
    },
    {
        title: "Garage",
        icon : <FontAwesomeIcon icon={faStoreAlt}/>,
        link:"/mygarage"
    },
    {
        title: "Price Request",
        icon:<FontAwesomeIcon icon={faHandshake}/>,
        link:"/negotiable"
    },
    {
        title: "Order Request",
        icon:<FontAwesomeIcon icon={faTags}/>,
        link:"/order"
    },
    {
        title : "Profile",
        icon : <FontAwesomeIcon icon={faUserAlt}/>,
        link:"/myprofile"
    }
]