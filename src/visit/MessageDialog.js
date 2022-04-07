import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import model from '../buyer/model/Buyer_Model';
import {Message as mess} from '../Message';
function MessageDialog({acnt_id,openmessage,setopenmessage}) {
    const [chat, setchat] = useState("");
    const [messgg, setmessgg] = useState({msg:"",cName:""})
    const id = JSON.parse(localStorage.getItem("user")).id;
    const handlesend = (e) =>{
        let data = {
            sender_id:id,
            reciever_id:acnt_id,
            message:chat
        }
        model.send(data).then(res=>{
            if(res.data.status===1){
                setmessgg({msg:res.data.message,cName:mess[0]});
                setchat("");
                setTimeout(() => {
                        setmessgg({msg:"",cName:""})
                }, 5000);
            }else{
                setmessgg({msg:res.data.message,cName:mess[1]});
                setTimeout(() => {
                    setmessgg({msg:"",cName:""})
            }, 5000);
            }
        })
        
    }
    return (
        <div>
            <Dialog open={openmessage} onClose={()=>setopenmessage(false)} fullWidth={true}>
                {}
                <DialogTitle>Message</DialogTitle>
                <DialogContent>
                    <p className={messgg.cName}>{messgg.msg}</p>
                    <div className="form-group m-3">
                 
                        <textarea row="3" className="form-control" onChange={(e)=>{setchat(e.target.value)}} value={chat} placeholder="Input Message"/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button className="btn btn-success" onClick={handlesend}>Send</button>
                    <button className="btn btn-danger" onClick={()=>setopenmessage(false)}>Close</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default MessageDialog;
