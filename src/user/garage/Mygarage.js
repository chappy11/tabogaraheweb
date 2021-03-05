import { faMapMarkedAlt, faPlus, faTimesCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useState,useEffect} from 'react'
import {ServerUrl as url} from '../../ServerUrl';
import AddProduct from '../product/AddProduct';
import GetProduct from '../product/GetProduct';
import model from '../model/Usermodel';
function Mygarage({garage,product,setload,activate}) {
    const store = JSON.parse(localStorage.getItem("user"));
    const [isAdd, setisAdd] = useState(false);
    const handleadd = () =>{
        setisAdd(!isAdd);
        setload(isAdd);
    }
    const [message, setmessage] = useState("");

    return (
        <div>
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
                                {garage.garage_description}
                            </p>
                            <p className=" garage_desc">
                                {garage.garage_status}
                            </p>
                            
                                {garage.date_start!==null ? (<p className=" garage_desc">Start/End:{garage.data_start}/{garage.date_end+" "+garage.gtime}</p> ):null}
                         
        
                                <div className="btn-group">
                                    
                                        <button onClick={()=>window.location.pathname="/viewmap/"+garage.lat+"/"+garage.lng} className="btn btn-outline-primary"><FontAwesomeIcon icon={faMapMarkedAlt}/> View location</button>
                                
                                        {isAdd?(<button className="btn btn-outline-danger" onClick={handleadd}><FontAwesomeIcon icon={faTimesCircle}/> Back</button>):(
                                        <button className="btn btn-outline-primary" onClick={handleadd}><FontAwesomeIcon icon={faPlus}/> Product</button>
                                        )} 
                                
                                   
                                        <button onClick={()=>window.location.pathname="/updategarage/"+garage.garage_id} className="btn btn-outline-primary"><FontAwesomeIcon icon={faPencilAlt}/> Update</button>
                                   
                                    
                                        {garage.garage_status === "active" ? (<button className="btn btn-outline-danger">deactivate</button>) : (<button className="btn btn-outline-success" onClick={activate}>activate</button>)}
                                    
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
