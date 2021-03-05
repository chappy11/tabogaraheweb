import React from 'react'
import Asidebar from './navigation/Asidebar'
import Atopnav from './navigation/Atopnav'

function Admin() {
    return (
        <div>
           <Asidebar/>
           <Atopnav/>
            <div className="sidebody">
                Hello World
            </div>
        </div>
    )
}

export default Admin
