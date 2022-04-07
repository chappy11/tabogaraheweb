import { faEnvelope, faMapMarkedAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import model from '../buyer/model/Buyer_Model';
import { ServerUrl as url } from '../ServerUrl';
import MessageDialog from './MessageDialog';
import SellerInfo from './SellerInfo';
import {makeStyles} from '@material-ui/core/styles';
import Viewloc from '../Viewloc';

const useStyles =  makeStyles((theme)=>({
    ratesize:{
        fontSize:"20px"
    }
}))
function Visitheader({garage_id}) {
    const clas = useStyles();
    const [garage, setgarage] = useState({})
    const [openmessage, setopenmessage] = useState(false);
    const [openinfo, setopeninfo] = useState(false);
    const [rates, setrate] = useState(0);
    const [isload, setisload] = useState(false);
    const [viewloc, setviewloc] = useState(false);    
    useEffect(() => {
        getgarage();
        getaverate();
    }, [openinfo,openmessage,isload])
    const getgarage=()=>{
        model.garageUser(garage_id).then(res=>{
            setgarage(res.data.data);
        })        
    }
    
    const getaverate = () =>{
        model.averagerate(garage_id).then(res=>{
            if(res.data.status===1){
                setrate(parseInt(res.data.data));
            }
            });
        }
    
    const handleopen = (e) =>{
        setopenmessage(true);
    }
   
    return (
        <div className="visit-header shadow mt-3">
            <MessageDialog openmessage={openmessage} setopenmessage={setopenmessage} acnt_id={garage.acnt_id}/>
            <SellerInfo openinfo={openinfo} setopeninfo={setopeninfo} user={garage}/>
            <Viewloc open={viewloc} setopen={setviewloc} garage_loc={garage.garage_loc}/>
            <div className="row">
                <div className="col-md-3">
                    <img src={url+garage.garage_photo} alt={garage.garage_photo} className="garage_pic mx-auto d-block"/>
                    <div className="lead text-center font-color-primary">{garage.garage_name} </div>
                   
                 </div>
                <div className="col-md-8">
                    <div>Start / End :<span className="text-info">{garage.date_start} / {garage.date_end} {garage.gtime}</span> </div>
                    <p >Location: <span className="text-info">{garage.garage_sitio+" "+garage.garage_brgy}</span></p>
                   <p> <Rating value={rates}   size="medium" readOnly={true}/></p>  
                    <div className="btn-group">
                        <button className="btn btn-outline-primary" onClick={()=>setopeninfo(true)}><FontAwesomeIcon icon={faUser} /> {garage.firstname+" "+garage.lastname}</button>
                        <button className="btn btn-outline-primary" onClick={()=>setviewloc(true)}><FontAwesomeIcon icon={faMapMarkedAlt} /> View Location</button>
                        <button className="btn btn-outline-primary" onClick={handleopen}><FontAwesomeIcon icon={faEnvelope} /> Message Seller</button>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default Visitheader
