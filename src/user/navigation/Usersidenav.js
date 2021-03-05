import React from 'react'
import {Usersidedata as data} from '../navdata/Usersidedata';
function Usersidenav() {
    return (
        <div className="usersidebar">
       
        <ul className="usersidebarlist">
            {data.map((val,index)=>(
                <li 
                key={index}
                className="row2"
                // eslint-disable-next-line eqeqeq
                id={window.location.pathname==val.link ? "active" : ""}
                onClick={()=> window.location.pathname=val.link}
                >
                    <div id="icon1">{val.icon}</div>
                    <div id="title1">{val.title}</div>
                </li>
            ))}
        </ul>
    </div>
    )
}

export default Usersidenav
