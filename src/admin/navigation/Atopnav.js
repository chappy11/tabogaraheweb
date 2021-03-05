import React,{useState} from 'react'
import {ServerUrl as url} from "../../ServerUrl";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
function Atopnav() {
    const data = useState(JSON.parse(localStorage.getItem("user")));
    const user = data[0];
    return (
        <div className="atopnav shadow-lg">
            <div className="atopnav-menu">
                <li className="atopnav-linked" onClick={()=>{window.location.pathname="/adminProfile"}} ><img src={url+user.pic} className="atopnav-img rounded-circle" alt={user.pic}/>{"  "+user.lname+", "+user.fname} </li>
                <li className="atopnav-linked"onClick={()=>{
                    localStorage.clear();
                    window.location.pathname="/";
                }}><FontAwesomeIcon icon={faSignOutAlt} size="lg"/></li>
            </div>
        </div>
    )
}

export default Atopnav
