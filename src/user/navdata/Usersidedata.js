import { faShoppingCart, faUserAlt,faDirections } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const Usersidedata = [
   
    {
        title : "Profile",
        icon : <FontAwesomeIcon icon={faUserAlt}/>,
        link:"/myprofile"
    },
    {
        title :"Purchases",
        icon:<FontAwesomeIcon icon={faShoppingCart}/>,
        link:"/myorder"
    },
    {
        title:"Return Order",
        icon:<FontAwesomeIcon icon={faDirections}/>,
        link:"/itemreturn"
    }
   
]