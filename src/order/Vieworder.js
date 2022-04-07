import { List, ListItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import model from '../buyer/model/Buyer_Model';
import { ServerUrl } from '../ServerUrl';
import Usersidenav from '../user/navigation/Usersidenav';
import Utopnav from '../user/navigation/Utopnav';
import MessageDialog from '../visit/MessageDialog';
import ViewpaymentModal from '../visit/order/ViewpaymentModal';
import {Message as mess} from '../Message';
import SellerInfo from '../visit/SellerInfo';

function total(a,b){
    return a * b;
}

function naming(name){
    if(name==="deliver"){
        return "Delivery";
    }
    else if(name==="release"){
        return "Released";
    }
    else if(name==="Pick up"){
        return "Pick up"
    }
}

function Vieworder() {
    const [item, setitem] = useState([]);
    const {order_id} = useParams();
    const [order, setorder] = useState({});
    const [isview, setisview] = useState(false);
    const [ismes, setismes] = useState(false);
    const [message, setmessage] = useState({msg:"",cName:""});
    const [open, setopen] = useState(false);

    useEffect(() => {
        getorders();
        getitems();
    }, [order_id])
 
    const getitems =()=>{
        model.orderlistitem(order_id).then(res=>{
            if(res.data.status===1){
                setitem(res.data.data);
                
            }
        })
    }

    const getorders = () =>{
        model.orderreq(order_id).then(res=>{
            if(res.data.status ==1){
                setorder(res.data.data[0])
            }
        })
    }
    
    const cleart = () =>{
        setTimeout(() => {
            setmessage({msg:"",cName:""})
        }, 5000);
    }
    const delivernow = (status) =>{
        model.deliver(order_id,status).then(res=>{
            if(res.data.status===1){
                getorders();
                setmessage({msg:res.data.message,cName:mess[0]})   
                cleart();
            }else{
                setmessage({msg:res.data.message,cName:mess[1]})
                cleart();
            }
      })
    }
    return (
            <div>
                <Utopnav/>
                <Usersidenav/>
                <SellerInfo openinfo={open} setopeninfo={setopen} user={order}/>
                <ViewpaymentModal isview={isview} setisview={setisview} payment={order_id}/>
                <MessageDialog openmessage={ismes} setopenmessage={setismes} acnt_id={order.buyer_id}/>
                <div className="sideuser">
                    <div className="margin-content">
                        <div className="row">
                            <div className="col-md-6">
                            <h3>Order Info</h3>
                            <p className="lead  ml-3">{order.firstname + ' ' + order.mi + '. ' + order.lastname}</p>
                            <div className="btn-group ml-3">
                                <button className="btn btn-outline-primary btn-sm" onClick={()=>setopen(true)}>View Profile</button>
                                <button className="btn btn-outline-primary btn-sm" onClick={()=>setismes(true)}>Message Buyer</button>
                            </div>
                            
                            <p className={message.cName}>{message.msg}</p>
                            <div className="row m-3">
                                <div className="col-sm-5 ">
                                    <b>Order ID:</b>
                                </div>
                                <div className="col-sm-4 text-secondary">
                                    {order_id}
                                </div>
                            </div>
                            <div className="row m-3">
                                <div className="col-sm-5">
                                    <b>Payment Status:</b>
                                </div>
                                <div className="col-sm-4">
                                    {order.ispayed == 1 ? (<span style={{color:'green'}}>Paid</span>):(<span style={{color:'red'}}>Not Paid</span>)}
                                </div>
                            </div>
                            <div className="row m-3">
                                <div className="col-sm-5">
                                    <b>Payment Method:</b>
                                </div>
                                <div className="col-sm-5 text-secondary">
                                    {order.payment_method}
                                </div>
                            </div>
                            <div className="row m-3">
                                <div className="col-sm-5">
                                    <b>Get Order Through:</b>
                                </div>
                                <div className="col-sm-4 text-secondary">
                                    {order.payment_method === "COP" ? "Pick up" : naming(order.pickitemby)}
                                </div>
                            </div>
                            <div className="row m-3">
                                <div className="col-sm-5">
                                    <b>Order Date:</b>
                                </div>
                                <div className="col-sm-4 text-secondary">
                                    {order.order_date}
                                </div>
                            </div>          
                            {/* {order.order_status === "release" || order.order_status === "deliver" &&
                                <div className="text-info center">
                                 <p>You have already released the product please wait for the buyer to accept it</p>
                                </div>
                             }           */}
                        
                        <div className="button-group">
                            {order.order_status !== "cancel" &&
                            <>
                            {order.order_status!=="received" && 
                                 <>
                                    {order.payment_method === "COP" || order.pickitemby === "Pick up" ? (
                                        <>
                                        {order.order_status !== "release" &&
                                        <button className="btn btn-success" onClick={()=>delivernow("release")}>Release</button>
                                        }
                                        </>
                                    ):(
                                        <>
                                        {order.ispayed == 1 ? (
                                        <button className="btn btn-info" onClick={()=>setisview(true)}>View Payment</button>
                                        ):
                                        (
                                        <p>The user choose E-Pay please wait for the user pay the order</p>    
                                        )
                                        }
                                        {order.order_status !== "deliver" && order.order_status !== "release" &&
                                        <button className="btn btn-primary" onClick={()=>delivernow(order.pickitemby === "Pick up" ? "release" : "deliver")}>{order.pickitemby === "Pick up" ? "Release" : "Deliver to the buyer"}</button>
                                        }
                                        </>
                                    )}
                                        
                                 </>
                            }
                            </>                                             
                                    }

                        {order.order_status=== "cancel" &&
                            <p className="text-danger">Note: This order has been cancelled</p>
                        }
                                           </div>                      
              </div>
                     <div className="col-md-6" >
                        <h4>Item List</h4>
                        <div className="container">
                            <h5>Total Amount : {order.total_amount}</h5>
                            <List>
                            
                                {item.map((val,i) =>(
                                    <ListItem>
                                        <img src={ServerUrl + val.item_pic1} alt={val.item_pic1} style={{width:100,height:100}}/>
                                        <div style={{marginLeft:10}}>
                                            <b>{val.item_name}</b>
                                            <div className="text-secondary" style={{fontSize:13}} >Qty : {val.order_quantity+" "+val.item_unit}</div>
                                            <div className="text-secondary" style={{fontSize:13}}>Price : {" \u20B1" + val.order_price}</div>
                                            <div className="text-secondary" style={{fontSize:13}}>Total{" \u20B1" + total(val.order_price,val.order_quantity)}</div>
                                        </div>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                     </div>
            </div>
         </div>
       </div>
 </div>
        )
}

export default Vieworder
