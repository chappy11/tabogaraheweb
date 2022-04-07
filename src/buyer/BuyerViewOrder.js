import React,{useState,useEffect} from 'react'
import model from './model/Buyer_Model';
import {ServerUrl, ServerUrl as url} from '../ServerUrl';
import Usersidenav from '../user/navigation/Usersidenav';
import Utopnav from '../user/navigation/Utopnav';
import OrderItemDialog from './orderitemlist/OrderItemDialog';
import RecievedDialog from './RecievedDialog';
import { Avatar, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';

function naming(text){
    if(text=="order"){
        return "Pending"
    }
    else if(text=="deliver"){
        return "Order has been delivered"
    }else if(text=="received"){
        return "Done"
    }
}

function BuyerViewOrder() {
    const [myorder, setmyorder] = useState([]);    
    const id = JSON.parse(localStorage.getItem("user")).id;
    const [orderstat, setorderstat] = useState("");
    const [isCancel, setisCancel] = useState(false)        
    const [order_id, setorder_id] = useState(0);
    const [open, setopen] = useState(false);
    const [openrecieved, setopenrecieved] = useState(false);
    const [datasend, setdatasend] = useState({});
    const [garage_id, setgarage_id] = useState(0);
    useEffect(() => {
        setInterval(() => {
            getmyorder();     
        }, 2000);
       
    }, [isCancel])
    const getmyorder = () =>{
        model.myorder(id).then(res=>{
            if(res.data.status === 1){
                setmyorder(res.data.data);
            }else{
                
            }
        })
    }
    
    const cancelOrder = (order_id) =>{
        model.cancelOrder(order_id).then(res=>{
            if(res.data.status===1){
                setisCancel(!isCancel);
            }else{

            }
        })    
    }
    const viewitem = (order_id,order_status,garage_id) =>{
        setorder_id(order_id);
        setorderstat(order_status)
        setgarage_id(garage_id)
        setopen(true);
    }

    const handleclose = () =>{
        setopen(false);
        setorder_id(0);
    }
    
    const handlerec = (order_id,garage_id,sender_id,garage_pic,acnt_id) =>{
        setdatasend({
            order_id,garage_id,sender_id,garage_pic,acnt_id
        });
        setopenrecieved(true);
    }
    const handlecloserec = () =>{
        setdatasend({});
        setopenrecieved(false);
    }
    return (
        <div>
            <Utopnav/>
            <Usersidenav/>
            <div className="sideuser">
                <div className="margin-content">
                    <div className="container">
                    <OrderItemDialog garage_id={garage_id} open={open} order_id={order_id} handleclose={handleclose} order_status={orderstat} />
                        <RecievedDialog openRecieved={openrecieved} datasend={datasend} handlecloserec={handlecloserec}/>
                           <List>
                               {myorder.map((val,i)=>(
                                   <ListItem >
                                       <Avatar src={ServerUrl + val.garage_photo} alt={val.garage_photo} style={{width:100,height:100}}/>
                                       <ListItemText style={{marginLeft:10}} primary={val.garage_name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    style={{fontSize:12}}
                                                >
                                                    Order date:{' '+val.order_date}
                                                </Typography>
                                                <Typography
                                                    style={{fontSize:12}}
                                                >
                                                  Total amount:{' \u20B1 '+val.total_amount}
                                                </Typography>
                                                <Typography
                                                    style={{fontSize:12}}
                                                >
                                                  Status:{naming(val.order_status)}
                                                </Typography>

                                            </React.Fragment>
                                        }
                                       />
                                       <ListItemSecondaryAction>
                                           <button className="btn btn-primary" onClick={()=>window.location.pathname="/orderinfo/"+val.order_id}>View Info</button>
                                       </ListItemSecondaryAction>
                                    
                                   </ListItem>
                               ))}
                           </List>
                </div>
            </div>
            </div>
        </div>
    )
}

export default BuyerViewOrder
