import React, { useState, useEffect } from 'react'
import Usersidenav from '../user/navigation/Usersidenav'
import Utopnav from '../user/navigation/Utopnav'
import model from './model/Buyer_Model';
import {ServerUrl, ServerUrl as url} from '../ServerUrl';
import { List, ListItem, ListItemSecondaryAction } from '@material-ui/core';
import ViewReason from './ViewReason';
import MessageDialog from '../visit/MessageDialog';


function total(x,y){
    return parseInt(x) *  parseInt(y);
}

function Itemreturn() {
    const [item, setitem] = useState([]);
    const id = JSON.parse(localStorage.getItem("user")).id;
    const [reason, setreason] = useState("");    
    const [open, setopen] = useState(false);
    const [openmsg, setopenmsg] = useState(false);
    const [seller_id, setseller_id] = useState("");
    useEffect(() => {
        getitem();
    }, [])
 
    const getitem = () =>{
        model.myreturn(id).then(res=>{
            console.log(res.data);
            if(res.data.status===1){
                setitem(res.data.data);
            }
        })
    }

    const handleclick  = (reason) =>{
            setopen(true);
            setreason(reason)
    }

    const handleopen =(seller_id)=>{
        setopenmsg(true);
        setseller_id(seller_id);
    }
    

    return (
        <div>
            <Utopnav/>
            <Usersidenav/>
            <div className="sideuser">
                <ViewReason open={open} setopen={setopen} reason={reason}/>
                <MessageDialog openmessage={openmsg} setopenmessage={setopenmsg} acnt_id={seller_id}/>
                <div className="margin-content">
                 <div className="container row justify-content-center">
                 
                 <List style={{width:'60%'}}>
                 <h5>List of Returning Order</h5>
                     {item.map((val,i)=>(
                         <ListItem >
                           <div className="card p-4" style={{width:'100%'}}>
                             <div className="ml-3" >
                                <b>{val.item_name}</b>
                                <div style={{fontSize:14}} >Order ID:<span className="text-secondary ml-2">{val.order_id}</span></div>
                                <div style={{fontSize:14}}>Order Amount:<span className="text-secondary ml-2">{"\u20B1 "+val.total_amount}</span></div>
                                <div style={{fontSize:14}} >Status:<span className="text-secondary ml-2">{val.return_status != "accept" || val.return_status != "decline" ? "Pending" : val.return_status}</span></div>
                            </div>
                            
                            <ListItemSecondaryAction>
                                <button className="btn btn-primary btn-block btn-sm" onClick={()=>handleclick(val.reason)}>View Reason</button>
                                <button className="btn btn-primary btn-block btn-sm" onClick={()=>window.location.pathname="/orderinfo/"+val.order_id}>View Order</button>
                            </ListItemSecondaryAction>
                            </div>
                         </ListItem>
                       
                     ))}
                 </List>
                 </div>
                </div>
            </div>
        </div>
    )
}

export default Itemreturn
