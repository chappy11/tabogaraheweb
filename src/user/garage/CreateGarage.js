import React,{useState,useEffect} from 'react'
import {  } from "@fortawesome/react-fontawesome";
import {  } from "@fortawesome/free-solid-svg-icons";
import model from '../model/Usermodel';
import SetWebMap from '../../map/SetWebMap';
import {Barangay as brgy} from '../../Barangay';
import {Message as mess} from '../../Message';
function CreateGarage({open,handleclose}) {
    const store = JSON.parse(localStorage.getItem("user"));
    const [mark, setmark] = useState({lat:0,lon:0});
    const [garage, setgarage] = useState({
        name:"",
        weeks:"",
        sitio:"",
        bgy:"",
        percentage:"",
    });
    const [message, setmessage] = useState({
        msg:"",
        cName:""
    })
   
    const clear = () =>{
        setTimeout(() => {
            setmessage({msg:"",cName:""});
        }, 5000);
    }
    const onChange = (e) =>{
        setgarage({...garage,[e.target.name]:e.target.value});
    }

    const create = (e) =>{  
        const data = {
            id:store.id,
            name:garage.name,
            week:garage.weeks,
            sitio:garage.sitio,
            bgy:garage.bgy,
            percent:garage.percentage
        }
        model.creategarage(data).then(res=>{
            if(res.data.status===1){
                setmessage({msg:res.data.message,cName:mess[0]});
                clear();
                setTimeout(() => {
                    window.location.pathname="/mygarage"
                }, 2000);
            }else{
                setmessage({msg:res.data.message,cName:mess[1]});
                clear();
            }
        }).catch(err=>{console.log(err)})
    }
    return (
        <div>
                <div className="g-margin row justify-content-center">
                    <div className="g-container shadow-lg">
                        <h4>Create Garage</h4>
                        <p className={message.cName}>{message.msg}</p>
                        <div className="form-group">
                            <label className="text-info">Garage Name</label>
                            <input type="text" className="form-control" onChange={onChange} name="name"/>
                        </div>
                        <div className="form-group">
                            <label className="text-info">Garage Duration</label>
                            <select className="form-control" onChange={onChange} name="weeks">
                                <option value="" >Duration</option>
                                <option value="1">1 week</option>
                                <option value="2">2 weeks</option>
                                <option value="3">3 weeks</option>
                                <option value="4">4 weeks</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="text-info">Discount %</label>
                            <select className="form-control" onChange={onChange} name="percentage">
                                <option value="" >----</option>
                                <option value="10">10 %</option>
                                <option value="20">20 % </option>
                                <option value="30">30 % </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="text-info">House No./ Sitio/Street Address</label>
                            <textarea row="15" className="form-control" onChange={onChange} name="sitio" style={{resize:'none'}}/>
                        </div>
                        <div className="form-group">
                            <label className="text-info">Barangay</label>
                            <select className="form-control" name="bgy" onChange={onChange}>
                                {brgy.map((val,index)=>(
                                    <option value={val} key={index}>{val}</option>
                                ))}
                            </select>
                        </div>
                              <div className="d-flex">
                            <div className="p-2 mr-auto">
                            <button className="btn btn-primary float-left" onClick={create}>Create</button>
                            </div>    
                            <div className="p-2">
                            <button className="btn btn-danger float-right" onClick={handleclose}>Back</button>
                            </div>
                        </div>
                        </div>                        
                </div>                    
        </div>
    )
}

export default CreateGarage
