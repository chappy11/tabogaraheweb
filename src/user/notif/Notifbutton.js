import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useState} from 'react'

function Notifbutton({type,handleclose}) {
    const [isbutton, setisbutton] = useState(true);
    const view = () =>{
        if(type==="price_request"){
            window.location.pathname="/negotiable";
        }else if(type==="order_request"){
            window.location.pathname="/order";
        }else if(type==="purchase"){
            window.location.pathname="/myorder";    
        }else{
            handleclose();
        }
    }
    return (
        <div>
            <button className="btn btn-primary" onClick={view}>Go Now <FontAwesomeIcon icon={faArrowAltCircleRight}/></button>
        </div>
    )
}

export default Notifbutton
