import React,{useState,useEffect} from 'react'
import {ServerUrl as url} from '../../ServerUrl';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt } from "@fortawesome/free-solid-svg-icons";
import model from '../model/Usermodel';
function Prof1({user,isUpdate,setisUpdate,onChange,save}) {
    const [preview, setpreview] = useState(null);
    const [img, setimg] = useState(null)
    useEffect(() => {
        setpreview(url+user.acnt_pic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUpdate])
    const chngpp = (e) =>{
        setimg(e.target.files[0]);
        setpreview(URL.createObjectURL(e.target.files[0]));
    }
    const changepp = () =>{
        
        if(img===null){
            console.log("cannot be null")
        }else{
            const fd = new FormData();
            fd.append("id",user.acnt_id);
            fd.append("pp",img,img.name);
            model.profilepic(fd).then(res=>{
                console.log(res);
            })
        }
    }
    
    return (    
        <div className="container-box shadow">
            <img src={isUpdate ? preview : url+user.acnt_pic} alt={user.acnt_pic} className="profile-pic mx-auto d-block rounded-circle" /> 
            
            {isUpdate ? (
                <>
                    <div className="row">
                        <div className="col-sm-8">
                            <input type="file" className="form-control" onChange={chngpp}/>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-primary" onClick={changepp}>update</button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="text-info">Firstname</label>
                        <input className="form-control" name="fname" onChange={onChange} placeholder={user.firstname}/>
                    </div>
                    <div className="form-group">
                        <label className="text-info">Mi</label>
                        <input className="form-control" name="mi" onChange={onChange} placeholder={user.mi}/>
                    </div>
                    <div className="form-group">
                        <label className="text-info">Lastname</label>
                        <input className="form-control" name="lname" onChange={onChange} placeholder={user.lastname}/>
                    </div>
                    <button className="btn btn-primary" onClick={(e)=> save(e)}>update</button>
                    <button className="btn btn-danger" onClick={()=>setisUpdate(false)}>cancel</button>
                </>
            ):(
                <>
                <h4 className="text-center">{user.firstname+" "+user.lastname}</h4>
                 <button onClick={()=>setisUpdate(true)}className="btn btn-primary mx-auto d-block btn-sm"><FontAwesomeIcon icon={faPenAlt} /> Edit</button>
                </>
            )}

        </div>
    )
}

export default Prof1
