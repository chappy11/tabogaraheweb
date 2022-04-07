import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React,{useState,useEffect} from 'react';
import ReactStars from 'react-rating-stars-component';
import model from "../buyer/model/Buyer_Model";
import {Message as mess} from '../Message';
function SellerRate({open,setopen,ratedata}) {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const [rate, setrate] = useState(0);
    const [message, setmessage] = useState({msg:"",cName:""})
    const [current, setcurrent] = useState(0);
    
    const getrate = (newrate) =>{
        setrate(newrate);
    }

    useEffect(() => {
        getcurrate();
        
    }, [open])
    const getcurrate = () =>{
        model.mycurrentrate(ratedata.order_id,id,ratedata.acnt_id).then(res=>{
            if(res.data.status===1){
                setrate(res.data.data[0].rating_no)
            }
        })

    }

    const clear = () =>{
        setTimeout(() => {
            setmessage({
                msg:"",
                cName:"",
            })
        }, 5000);
    }

    const save = () =>{
       if(rate== 0 ){
        setmessage({
            msg:"You cannot rate the seller with 0",
            cName:mess[1]
        })
        clear();
       }else{
           const data = {
               rec_id: ratedata.acnt_id,
               order_id: ratedata.order_id,
               send_id: id,
               no_rating: rate,
           }
           model.createrate(data).then(res=>{
               if(res.data.status===1){
                   setmessage({
                       msg:res.data.message,
                       cName:mess[0]
                   })
                   clear();
                }else{
                   setmessage({
                       msg:res.data.message,
                       cName:mess[1]
                   })
                   clear();
                }
           })
       }
    }
    return (
        <Dialog
            open={open}
            onClose={()=>setopen(false)}
            fullWidth={true}
        >
            <DialogTitle>
                Rate User
            </DialogTitle>
            <DialogContent>
                <div className="m-5">
                    <p className={message.cName}>{message.msg}</p>
                    <h5 className="text-center">Rate the Seller</h5>
                    <div className="row justify-content-center">
                         <ReactStars count={5} size={50}  value={current} onChange={getrate}/>
                    </div>
                    
                </div>
            </DialogContent>
            <DialogActions>
                <button className="btn btn-primary" onClick={save}>Rate</button>
                <button className="btn btn-danger" onClick={()=>setopen(false)}>Cancel</button>
            </DialogActions>
        </Dialog>
     )
}

export default SellerRate
