import { faEnvelope, faMapMarkedAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import React,{useState,useEffect} from 'react'
import model from '../buyer/model/Buyer_Model';
import {ServerUrl as url} from '../ServerUrl';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Message } from '../Message';

import MessageDialog from './MessageDialog';
import SellerInfo from './SellerInfo';
function Visitheader({garage_id}) {
    const [garage, setgarage] = useState({})
    const [openmessage, setopenmessage] = useState(false);
    const [openinfo, setopeninfo] = useState(false)
    const [user, setuser] = useState({})
    useEffect(() => {
        getgarage();
        
    }, [openinfo,openmessage])
    const getgarage=()=>{
        model.garageUser(garage_id).then(res=>{
            setgarage(res.data.data);
        })
    }
    const handleopen = (e) =>{
        setopenmessage(true);
    }
    return (
        <div className="visit-header shadow mt-3">
            <MessageDialog openmessage={openmessage} setopenmessage={setopenmessage}/>
            <SellerInfo openinfo={openinfo} setopeninfo={setopeninfo} user={garage}/>
            <div className="row">
                <div className="col-md-3">
                    <img src={url+garage.garage_photo} alt={garage.garage_photo} className="garage_pic mx-auto d-block"/>
                    <div className="lead text-center font-color-primary">{garage.garage_name} </div>
                </div>
                <div className="col-md-8">
                    
                    <p>Start / End :<span className="text-info">{garage.date_start} / {garage.date_end} {garage.gtime}</span> </p>
                    <p className="text-info">{garage.garage_description}</p>
                    <div className="btn-group">
                        <button className="btn btn-outline-primary" onClick={()=>setopeninfo(true)}><FontAwesomeIcon icon={faUser} /> {garage.firstname+" "+garage.lastname}</button>
                        <button className="btn btn-outline-primary" onClick={()=>window.location.pathname="/viewmap/"+garage.lat+"/"+garage.lng}><FontAwesomeIcon icon={faMapMarkedAlt} /> View Location</button>
                        <button className="btn btn-outline-primary" onClick={handleopen}><FontAwesomeIcon icon={faEnvelope} /> Message Seller</button>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default Visitheader
