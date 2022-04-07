import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Barangay as bgy } from '../../Barangay';
import { Message as mess } from '../../Message';
import { ServerUrl as url } from '../../ServerUrl';
import model from '../model/Usermodel';
import Usersidenav from '../navigation/Usersidenav';
import Utopnav from '../navigation/Utopnav';
function Updategarage() {
    const {garage_id} = useParams();
    const history = useHistory();
    const [garage, setgarage] = useState({});
    const [position, setposition] = useState({lat:0,lng:0});
    const [mymap, setmymap] = useState(false);
    const [preview, setpreview] = useState("");
    const [isload, setisload] = useState(false);
    const [img, setimg] = useState(null);
    const [locprev, setlocprev] = useState(null);
    const [locpic, setlocpic] = useState(null);
    const [message, setmessage] = useState({msg:"",cName:""});
    const [updatedata, setupdatedata] = useState({
        name:"",
        sitio:"",
        brgy:"",
        week:""
    })
    useEffect(() => {
        getdata();
        setpreview(url+garage.garage_photo);
        if(garage.garage_loc!=null){
            setlocprev(url+garage.garage_loc);
        }
        setposition({lat:garage.lat,lng:garage.lng});
    }, [isload])

    const getdata =() =>{
        model.garagebyId(garage_id).then(res=>{
            setgarage(res.data.data[0]);
            setisload(true);     
        })
       
    }
    const updateimg = (e) =>{
        setpreview(URL.createObjectURL(e.target.files[0]));
        setimg(e.target.files[0]);
    }
    const locimg = (e) =>{
        setlocprev(URL.createObjectURL(e.target.files[0]));
        setlocpic(e.target.files[0]);
    }
    const handlemap = () =>{
        setposition({lat:garage.lat,lng:garage.lng});
        setmymap(!mymap);
    }
    const onChange = (e) =>{
        setupdatedata({...updatedata,[e.target.name]:e.target.value});
    }
    const update = () =>{
        const data = {
            id:garage_id,
            name:updatedata.name==="" ? garage.garage_name : updatedata.name,
            sitio:updatedata.sitio==="" ? garage.garage_sitio : updatedata.sitio,
            brgy:updatedata.brgy==="" ? garage.garage_brgy : updatedata.brgy,
            week:updatedata.week==="" ? garage.week:updatedata.week,
        }
            model.updategarage(data).then(res=>{
                if(res.data.status===1){
                    setmessage({
                        msg:res.data.message,
                        cName:mess[0]
                    })
                    setTimeout(() => {
                        setmessage({msg:"",cName:""});
                    }, 5000);
                }else{
                    setmessage({
                        msg:res.data.message,
                        cName:mess[1]
                    })
                    setTimeout(()=>{
                        setmessage({msg:"",cName:""});
                    },5000)
                }
            })
    }
    const updatepic = (e) =>{
        e.preventDefault();
        if(img===null){
            setmessage({msg:"Pls choose image",cName:mess[1]});
            setTimeout(() => {
                setmessage({msg:"",cName:""})
            }, 5000);
        }else{
                console.log(img);
            let fd = new FormData();
      
        fd.append("pp",img,img.name);
        fd.append("id",garage_id);
        model.updatgaragepic(fd).then(res=>{
            console.log(res.data.data);    
            if(res.data.status===1){
                    setmessage({
                        msg:res.data.message,
                        cName:mess[0]
                    })
                    setTimeout(()=>{
                        setmessage({msg:"",cName:""});
                    },5000)
                }else{
                    setmessage({
                        msg:res.data.message,
                        cName:mess[1]
                    })
                    setTimeout(()=>{
                        setmessage({msg:"",cName:""});
                    },5000)
                }
        }).catch(err=>console.error(err))
        }
        
    }
    const updateloc = () =>{
        if(locpic==null){
            setmessage({msg:"Please put an image",cName:mess[1]});
            setTimeout(() => {
                setmessage({msg:"",cName:""})
            }, 5000);
        }else{
            let f = new FormData();
            f.append("id",garage_id);
            f.append("pic",locpic,locpic.name);
            model.updateloc(f).then(res=>{
                if(res.data.status===1){
                    setmessage({msg:res.data.message,cName:mess[0]})
                    setTimeout(() => {
                        setmessage({msg:"",cName:""})
                    }, 5000);
                }else{
                    setmessage({msg:res.data.message,cName:mess[1]});
                    setTimeout(() => {
                        setmessage({msg:"",cName:""})
                    }, 5000);
            
                }
            })
        }
    }
    return (
        <div>
            <Utopnav/>
            <Usersidenav/>
            <div className="sideuser">
                    <div className="row justify-content-center">
                    <div className="row g-margin">
                        <div className="col-md-4">
                            <img src={preview} alt={garage.garage_photo} className="profile-pic rounded-circle mx-auto d-block"/>
                            <div className="form-group">
                                <input type="file" className="form-control" onChange={updateimg}/>    
                                <button className="btn btn-primary btn-block mt-3" onClick={updatepic}>Update Picture</button>
                            </div>
                            <h5 className="mt-4">Screenshot of Location</h5>
                            <img src={locprev} alt={garage.garage_loc} className="loc_pic d-flex mx-auto"/>                  
                            <input type="file" className="form-control mt-3" onChange={locimg}/>
                            <buttton className="btn btn-primary btn-block mt-3" onClick={updateloc}>Save</buttton>
                        </div>

                    <div className="col-md-8">
                        <div className="g-container">
                  
                    <h3>Garage Information</h3>
                    <div className="form-group">
                               <label>Name</label>
                                <input className="form-control" name="name" onChange={onChange} placeholder={garage.garage_name}/>
                            </div>
                            
                            <div className="form-group">
                                <label>Duration</label>
                                <select className="form-control" name="week" onChange={onChange}>
                                    <option value="">{garage.week} weeks</option>
                                    <option value="1">1 week</option>
                                    <option value="2">2 weeks</option>
                                    <option value="3">3 weeks</option>
                                    <option value="4">4 week</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <textarea className="form-control" name="sitio"  onChange={onChange} placeholder={garage.garage_sitio}/>
                            </div>
                            <div className="form-group">
                                <select className="form-control" name="brgy" onChange={onChange}>
                                    {bgy.map((val,i)=>(
                                        <option value={val} key={i}>{i===0 ? garage.garage_brgy : val}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="row justify-content-end mr-3">
                            <button className="btn btn-primary mr-3" onClick={update}>Update</button>
                            <button className="btn btn-danger   " onClick={()=>window.location.pathname="/mygarage"}>Back</button>
                            </div>
                            <p className={message.cName}>{message.msg}</p>
                            </div>  
                    </div>
                    </div>
                    </div>
            </div>
        </div>
    )
}

export default Updategarage
