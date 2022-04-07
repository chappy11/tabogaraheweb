import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import Buyer_Model from '../../buyer/model/Buyer_Model';
import {ServerUrl as url} from '../../ServerUrl';
function ViewpaymentModal({isview,setisview,payment}) {
    const [data, setdata] = useState({})
    
    useEffect(() => {
        getpayment();
    }, [payment])

    const getpayment = () =>{
        Buyer_Model.viewPayment(payment).then(res=>{
            if(res.data.status===1){
                setdata(res.data.data[0])
            }
        })        
    } 
    return (
        <Dialog open={isview} onClose={()=>setisview(false)} fullWidth={true}> 
            <DialogTitle>View Payment</DialogTitle>
            <DialogContent style={{padding:30}}>
                <div className="row m-2">
                    <div className="col-sm-4">
                        Order ID
                    </div>
                    <div className="col">
                        {data.order_id}
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col-sm-4">
                       Transaction ID
                    </div>
                    <div className="col">
                        {data.transaction_id}
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col-sm-4">
                        Total Amount
                    </div>
                    <div className="col">
                        {'\u20B1'+data.payment_amount}
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col-sm-4">
                        Sender                      
                    </div>
                    <div className="col">
                        {data.payment_sender}
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col-sm-4">
                        Receiver
                    </div>
                    <div className="col">
                        {data.payment_reciever}
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col-sm-4">
                        Date of Payment
                    </div>
                    <div className="col">
                        {data.payment_date}
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <button className="btn btn-danger" onClick={()=>setisview(false)}>close</button>
            </DialogActions>
        </Dialog>
    )
}

export default ViewpaymentModal
