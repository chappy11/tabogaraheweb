import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React,{useState,useEffect} from 'react'
import model from '../model/Buyer_Model';
import {Message as mess} from '../../Message';
function ReturnItem({data,open,setopen}) {
    const [havereturn, sethavereturn] = useState(false);
    const id = JSON.parse(localStorage.getItem("user")).id;
    const [reason, setreason] = useState("");
    const [isload, setisload] = useState(false);
    const [message, setmessage] = useState({
        msg:"",
        cName:"",
    });
    useEffect(() => {
///        isReturn();
    }, [open])
 
    const isReturn = () =>{

        model.checkreturn(id,data.order_id,data.item_id).then(res=>{
                if(res.data.status===1){
                    sethavereturn(true);
                }else{
                    sethavereturn(false);
                }
        })
    }

    const cleart = () =>{
        setTimeout(() => {
            setmessage({
                msg:"",
                cName:""
            })
        }, 5000);
    }
    const returnitem = () =>{
        const dat = {
            order_id : data.order_id,
            seller_id:data.seller_id,
            buyer_id : id,
            reason:reason
        }
        model.returnitem(dat).then(res=>{
            if(res.data.status===1){
                setisload(true);
                sethavereturn(true);
                setmessage({
                    msg:res.data.message,
                    cName:mess[0]
                })
                cleart();
            }else{
                setmessage({
                msg:res.data.message,
                cName:mess[1]
                })
                cleart();
            }
        })
               
    }
    return (
        <Dialog
            open={open}
            onClose={()=>setopen(false)}
            fullWidth={true}
        >   
        <DialogTitle>
            Request Return Order
        </DialogTitle>         
        <DialogContent>
            <p className={message.cName}>{message.msg}</p>
                <>
                <textarea row="10" className="form-control" onChange={(e)=>setreason(e.target.value)}/>
                </>
            
            </DialogContent>
        <DialogActions>
            {!havereturn &&
            <button className="btn btn-success" onClick={returnitem}>
                Request
            </button>
            }
           <button className="btn btn-danger" onClick={()=>setopen(false)}>Close</button>
        </DialogActions>
      </Dialog>

    )
}

export default ReturnItem
