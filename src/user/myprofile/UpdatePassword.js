import React,{useState} from 'react'
import { Dialog, DialogContent, DialogTitle, DialogActions } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import model from '../model/Usermodel'
import {Message as mess} from '../../Message';
function UpdatePassword({open,handler}) {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const [password, setpassword] = useState({
        id:id,
        password:"",
        npassword:"",
        cpassword:""
    })
    const [message, setmessage] = useState({
        msg:"",
        cName:""
    })
    const clear = () =>{
        setTimeout(()=>{
            setmessage({msg:"",cName:""});
        },5000)
    }
    const onChange = (e) =>{
        setpassword({...password,[e.target.name]:e.target.value});
    }

    const change = (e) =>{
        e.preventDefault();
        model.updatepass(password).then(res=>{
            if(res.data.status===1){
                setmessage({msg:res.data.message,cName:mess[0]})
                clear();
            }else{
                setmessage({msg:res.data.message,cName:mess[1]});
                clear();
            }
        })
    }
    return (
        <div>
            <Dialog fullWidth={true} open={open} onClose={handler}>
                <DialogTitle><FontAwesomeIcon icon={faLockOpen}/> Change Password</DialogTitle>
                
                <DialogContent>
                    <p className={message.cName}>{message.msg}</p>
                    <div className="form-group">
                        <label className="text-info">New Password</label>
                        <input type="password" className="form-control" placeholder="Enter your New Password" name="npassword" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label className="text-info">Confirm Password</label>
                        <input type="password" className="form-control" placeholder="Confirm your New Password" name="cpassword" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label className="text-info">Old Password</label>
                        <input type="password" className="form-control" placeholder="Enter your Old Password" name="password" onChange={onChange}/>
                    </div>
                    
                </DialogContent>
                <DialogActions>
                    <button className="btn btn-primary" onClick={change}>Change</button>
                    <button className="btn btn-danger" onClick={handler}>close</button>
                </DialogActions>
            </Dialog>     
        </div>
    )
}

export default UpdatePassword
