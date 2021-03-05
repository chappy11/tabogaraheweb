import React, { useState,useEffect } from 'react'
import Updatemap from '../../map/Updatemap'
import Usersidenav from '../navigation/Usersidenav'
import Utopnav from '../navigation/Utopnav'
import {useHistory,useParams} from 'react-router-dom';
import model from '../model/Usermodel';
import {ServerUrl as url} from '../../ServerUrl';
import {Message as mess} from  '../../Message';
function Updategarage() {
    const {garage_id} = useParams();
    const history = useHistory();
    const [garage, setgarage] = useState({});
    const [position, setposition] = useState({lat:0,lng:0});
    const [mymap, setmymap] = useState(false);
    const [preview, setpreview] = useState("");
    const [isload, setisload] = useState(false);
    const [img, setimg] = useState(null);
    const [message, setmessage] = useState({msg:"",cName:""});
    const [updatedata, setupdatedata] = useState({
        name:"",
        desc:"",
        week:""
    })
    useEffect(() => {
        getdata();
        setpreview(url+garage.garage_photo);
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
            desc:updatedata.desc==="" ? garage.garage_description : updatedata.desc,
            week:updatedata.week==="" ? garage.week:updatedata.week,
            lat:position.lat,
            lng:position.lng
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
    
    return (
        <div>
            <Utopnav/>
            <Usersidenav/>
            <div className="sideuser">
                    
                    <div className="row g-margin">
                        <div className="col-md-4">
                            <img src={preview} alt={garage.garage_photo} className="profile-pic rounded-circle mx-auto d-block"/>
                            <div className="form-group">
                                <input type="file" className="form-control" onChange={updateimg}/>    
                                <button className="btn btn-primary" onClick={updatepic}>update picture</button>
                            </div>
                            <p className={message.cName}>{message.msg}</p>

                            <div className="form-group">
                               <label>Name</label>
                                <input className="form-control" name="name" onChange={onChange} placeholder={garage.garage_name}/>
                            </div>
                             
                            <div className="form-group">
                                <label>Description</label>
                                <textarea placeholder={garage.garage_description} name="desc" onChange={onChange} row="8" className="form-control"/>
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
                            
                            <p>lat: {position.lat}</p>
                            <p>lng: {position.lng}</p>
                            <button className="btn btn-outline-secondary" onClick={handlemap}>open map</button> 
                            <br></br>
                            <button className="btn btn-primary float-left mt-3 ml-3" onClick={update}>Update</button>
                            <button className="btn btn-danger float-right mt-3 mr-3" onClick={()=>history.goBack()}>Back</button>
                        </div>

                    <div className="col-md-8">
                        {mymap ?(<Updatemap post={[position.lat,position.lng]} setmarker={setposition}/>):null

                        }
                        
                    </div>
                    </div>
            </div>
        </div>
    )
}

export default Updategarage
