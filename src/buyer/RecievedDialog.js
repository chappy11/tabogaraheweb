import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React, { useState } from 'react'
import Rate from 'react-rating-stars-component';
import {ServerUrl as url} from '../ServerUrl';
import model from './model/Buyer_Model'
import {Message as mess} from '../Message';
function RecievedDialog({openRecieved,handlecloserec,datasend}) {   
    const [rate, setrate] = useState(0);
    const id = JSON.parse(localStorage.getItem("user")).id;
    const [israte, setisrate] = useState(false);
    const setrating  = (newrate) =>{
        setrate(newrate);
    }
    const [message, setmessage] = useState({msg:"",cName:""})
    const ratenow = () =>{
        let data = {
            order_id:datasend.order_id,
            rec_id:datasend.acnt_id,
            send_id:id,
            no_rating:rate
        }
        model.createrate(data).then(res=>{
            if(res.data.status===1){
                setmessage({msg:res.data.message,cName:mess[0]});
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
    const recieved = () =>{
        model.pickup(datasend.order_id).then(res=>{                    
            if(res.data.status===1){
                setisrate(true);
            }
        })
    }
    return (
        <div>
            <Dialog open={openRecieved} onClose={handlecloserec} fullWidth={true}>
                <DialogTitle>
                    Confirm Recieved
                </DialogTitle>
                <DialogContent>
                    <div className="row justify-content-center">
                    <p className={message.cName}>{message.msg}</p>

                        {israte ? 
                        (
                            <>
                                <div className="animate__animated animate__fadeInDown">
                                <p className="text-center">Rate the seller</p>

                                <img src={url+datasend.garage_pic} alt={datasend.garage_pic} className="profile-pic rounded-circle mx-auto d-block"/>
                                <Rate count={5} size={30} activeColor="#ffd700" onChange={setrating} value={rate} classNames="mx-auto "/>                    
                                <button className="btn btn-primary mx-auto d-block" onClick={ratenow}>Rate now</button>
                                </div>
                            </>
                        )
                        :
                        (
                            <>
                                <div>
                                <blockquote className="lead">Please confirm recieved so that seller would inform youve already recived your orders</blockquote>
                                </div>
                            </>
                        )}               

                        
                    </div>                   
                </DialogContent>
                <DialogActions>
                    <button className="btn btn-info" onClick={recieved}>Mark Recieved</button>
                    <button className="btn btn-danger" onClick={handlecloserec} >Close</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RecievedDialog
