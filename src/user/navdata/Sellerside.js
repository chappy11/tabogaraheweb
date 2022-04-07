import { faHandHolding, faHandHoldingUsd, faHandshake, faStoreAlt, faTags, faUndo, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const Sellerside = [
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
        title: "Groups",
        icon : <FontAwesomeIcon icon={faStoreAlt}/>,
        link:"/groups"
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
        title: "Sales Report",
        icon:<FontAwesomeIcon icon={faHandHoldingUsd}/>,
        link:"/salesreport"
    },
    {
        title: "Return Request",
        icon:<FontAwesomeIcon icon={faUndo} />,
        link:"/returnitem"

    }

]