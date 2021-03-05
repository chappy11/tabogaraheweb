import React,{useState,useEffect} from 'react'
import {  } from "@fortawesome/react-fontawesome";
import {  } from "@fortawesome/free-solid-svg-icons";
import model from '../model/Usermodel';
import SetWebMap from '../../map/SetWebMap';
import {Message as mess} from '../../Message';
function CreateGarage({open,handleclose}) {
    const store = JSON.parse(localStorage.getItem("user"));
    const [mark, setmark] = useState({lat:0,lon:0});
    const [garage, setgarage] = useState({
        name:"",
        desc:"",
        weeks:""
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
            description:garage.desc,
            week:garage.weeks,
            lat:mark.lat,
            lng:mark.lon
        }
        model.creategarage(data).then(res=>{
            if(res.data.status===1){
                setmessage({msg:res.data.message,cName:mess[0]});
                clear();
            }else{
                setmessage({msg:res.data.message,cName:mess[1]});
                clear();
            }
        }).catch(err=>{console.log(err)})
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-5">
                    <div className="g-margin">
                        <div className="cg-container shadow">
                        <h4>Create Garage</h4>
                        <p className={message.cName}>{message.msg}</p>
                        <div className="form-group">
                            <label className="text-info">garage name</label>
                            <input type="text" className="form-control" onChange={onChange} name="name"/>
                        </div>
                        <div className="form-group">
                            <label className="text-info">Garage Description</label>
                            <textarea type="text" className="form-control" row="10" onChange={onChange} name="desc"/>
                        </div>
                        <div className="form-group">
                            <label className="text-info">Garage Duration</label>
                            <select className="form-control" onChange={onChange} name="weeks">
                                <option value="">choose..</option>
                                <option value="1">1 week</option>
                                <option value="2">2 weeks</option>
                                <option value="3">3 weeks</option>
                                <option value="4">4 weeks</option>
                            </select>
                        </div>
                        <p>latatitud:{mark.lat}</p>
                        <p>longitude:{mark.lon}</p>
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
                <div className="col-md-7">
                    <div className="g-margin">
                        <SetWebMap setmark={setmark}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateGarage
