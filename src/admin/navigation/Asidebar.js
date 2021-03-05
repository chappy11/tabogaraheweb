import React,{useState,useEffect} from 'react'
import {SuperAdmin as admins} from './navdata/SuperAdmin';
import logo from "../../images/JOHN_LOGO.png";
import {Admin2 as admin} from "./navdata/Admin2";
function Asidebar() {
    const type = localStorage.getItem("type");
    const [data, setdata] = useState([]);
    useEffect(() => {
        if(type==="admin2"){
            setdata(admin);
        }else{
            setdata(admins);
        }
    }, [type])
    return (
        <div className="adminsidebar">
            <ul className="sidelogo"><li className="logrow"><img src={logo} alt={logo} className="logo"/></li></ul>
            <ul className="adminsidebarlist">
                {data.map((val,index)=>(
                    <li 
                    key={index}
                    className="row1"
                    // eslint-disable-next-line eqeqeq
                    id={window.location.pathname==val.link ? "active" : ""}
                    onClick={()=> window.location.pathname=val.link}
                    >
                        <div id="icon">{val.icon}</div>
                        <div id="title">{val.title}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Asidebar
