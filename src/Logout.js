import React from 'react'

function Logout() {
    const onClick = () =>{
        localStorage.clear();
        window.location.pathname="/account";
    }
    return (
        <div>
            <button className="btn btn-danger" onClick={onClick}>logout</button>
        </div>
    )
}

export default Logout
