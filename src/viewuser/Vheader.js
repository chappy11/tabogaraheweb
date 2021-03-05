import React from 'react'
import Asidebar from '../admin/navigation/Asidebar';
import Atopnav from '../admin/navigation/Atopnav';

function Vheader() {
    const type = localStorage.getItem("type");

    if(type==="admin2" || type==="admin"){
        return (<><Asidebar/> 
        <Atopnav/></>)
    }else{
        
    }
}

export default Vheader
