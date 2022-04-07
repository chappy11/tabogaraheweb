import { faMapMarkedAlt, faPlus, faTimesCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useState,useEffect} from 'react'
import {ServerUrl as url} from '../../ServerUrl';
import Viewloc from '../../Viewloc';
import AddProduct from '../product/AddProduct';
import GetProduct from '../product/GetProduct';
import Broadcast from './Broadcast';
function Mygarage({garage,product,setload,activate,deactivate}) {
    const store = JSON.parse(localStorage.getItem("user"));
    const [isAdd, setisAdd] = useState(false);
    const [open, setopen] = useState(false)
    const [garage_loc, setgarage_loc] = useState("");
    const [isactivate, setisactivate] = useState(false);
    

    const handleadd = () =>{
        setisAdd(!isAdd);
        setload(isAdd);
    }
    const [message, setmessage] = useState("");

    const act = () =>{
        setisactivate(true);
    }


    return (
        <div>
            <Viewloc open={open} setopen={setopen} garage_loc={garage_loc}/>
            <Broadcast open={isactivate} setopen={setisactivate} garage_id={garage.garage_id}/>            
            <div className="g-margin">
                <div className="garage-header shadow">
                    <p className="text-info center">{message}</p>
                    <div className="d-flex flex-row">
                        <div className="p-2">
                            <img src={url+garage.garage_photo} alt={garage.garage_photo} className="garage_photo rounded-circle" />
                        </div>
                        <div className="p-2">
                            <p className="garage_name">
                                {garage.garage_name}
                            </p>
                            <p className=" garage_desc">
                                {garage.garage_sitio+" "+garage.garage_brgy}
                            </p>
                            <p className=" garage_desc">
                                {garage.garage_status}
                            </p>
                            
                                {garage.date_start!==null ? (<p className=" garage_desc">Start/End:{garage.date_start}/{garage.date_end+" "+garage.gtime}</p> ):null}
                         
        
                                <div className="btn-group">
                                    
                                        <button onClick={()=>{
                                            setopen(true)
                                            setgarage_loc(garage.garage_loc )
                                        }} className="btn btn-outline-primary"><FontAwesomeIcon icon={faMapMarkedAlt}/> View location</button>
                                
                                        {isAdd?(<button className="btn btn-outline-danger" onClick={handleadd}><FontAwesomeIcon icon={faTimesCircle}/> Back</button>):(
                                        <button className="btn btn-outline-primary" onClick={handleadd}><FontAwesomeIcon icon={faPlus}/> Product</button>
                                        )} 
                                        {garage.garage_status==="active" ? (
                                            <>
                                              <button onClick={()=>window.location.pathname="/updategarage/"+garage.garage_id} className="btn btn-outline-primary" disabled><FontAwesomeIcon icon={faPencilAlt} /> Update</button>
                                            </>
                                        ):(
                                            <button onClick={()=>window.location.pathname="/updategarage/"+garage.garage_id} className="btn btn-outline-primary" ><FontAwesomeIcon icon={faPencilAlt} /> Update</button>
                                        )}     
                                   
                                      
                                   
                                    
                                        {garage.garage_status === "active" ? (<button className="btn btn-outline-danger" onClick={deactivate}>deactivate</button>) : (<button className="btn btn-outline-success" onClick={act}>activate</button>)}
                                    
                                </div>                            
                        </div>
                    </div> 
                </div>
                {/* contents */}
                {isAdd ? (<AddProduct garage_id={garage.garage_id}/>):(<GetProduct product={product}/>)}
            </div>
        </div>
    )
}

export default Mygarage
