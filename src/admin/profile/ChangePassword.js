import React,{useState} from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import {Message as mess} from '../../Message';
import model from '../model/AdminModel';
function ChangePassword({open,handleclose}) {
    const [message, setmessage] = useState({
        msg:"",
        msgclas:""
    })
    const [data, setdata] = useState({
        id:JSON.parse(localStorage.getItem("user")).id,
        npassword:"",
        cpassword:"",
        password:""
    })

    const onChange = e =>{
        setdata({...data,[e.target.name]:e.target.value});
    }

    const cleart = () =>{
        setTimeout(() => {
            setmessage({
                msg:"",
                msgclas:""
            })
        }, 5000);
    }
    const changepass = (e) =>{
        e.preventDefault();
        model.updatepass(data).then(res=>{
            if(res.data.status===0){
                setmessage({
                    msg:res.data.message,
                    msgclas:mess[1]
                })
                cleart();
            }else{
                setmessage({
                    msg:res.data.message,
                    msgclas:mess[0]
                })
                setTimeout(() => {
                    handleclose();
                }, 5000);
            }
        })
    }
    
    return (
        <Dialog open={open} onClose={handleclose} fullWidth={"fullWidth"}>
            <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                    <p className={message.msgclas}>{message.msg}</p>
                    <div className="form-group">
                        <label className="text-info">New Password</label>
                        <input type="password" name="npassword" className="form-control" onChange={onChange} placeholder="New Password"/>
                    </div>
                    <div className="form-group">
                        <label className="text-info">Confirm New Password</label>
                        <input type="password" name="cpassword" className="form-control" onChange={onChange} placeholder="Confirm New Password"/>
                    </div>
                    <div className="form-group">
                        <label className="text-info">Old Password</label>
                        <input type="password" name="password" className="form-control" onChange={onChange} placeholder="New Password"/>
                    </div>

                </DialogContent>
                <DialogActions>
                    <button className="btn btn-primary" onClick={changepass}>Change password</button>
                    <button className="btn btn-danger" onClick={handleclose}>Close</button>
                </DialogActions>
        </Dialog>
    )
}

export default ChangePassword
