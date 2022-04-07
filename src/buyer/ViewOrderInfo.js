import React,{useState,useEffect} from 'react'
import Usersidenav from '../user/navigation/Usersidenav'
import Utopnav from '../user/navigation/Utopnav'
import {useParams} from 'react-router-dom';
import model from './model/Buyer_Model';
import { List, ListItem, ListItemSecondaryAction } from '@material-ui/core';
import { ServerUrl } from '../ServerUrl';
import ViewpaymentModal from '../visit/order/ViewpaymentModal';
import SellerRate from '../visit/SellerRate';
import ReturnItem from './orderitemlist/ReturnItem';


function naming(name){
    if(name==="deliver"){
        return "Delivery";
    }
    else if(name==="release"){
        return "Released";
    }
}

function total(x,y){
    let amount = parseInt(x) * parseInt(y);
    return amount.toFixed(2);
}

function ViewOrderInfo() {
    const {order_id} = useParams();
    const [order, setorder] = useState({})
    const [item, setitem] = useState([]);
    const [payment, setpayment] = useState({});
    const [open, setopen] = useState(false);
    const [rate, setrate] = useState(false);
    const [israte, setisrate] = useState(false);
    const [rateitem, setrateitem] = useState({});
    const [seller_id, setseller_id] = useState("");
    const [req, setreq] = useState(false);
    const [returnrequest, setreturnrequest] = useState({});

    useEffect(() => {
        getdata();
        getitem();
        
    }, [])
   
    const getitem = () =>{
        model.orderlistitem(order_id).then(res=>{
            setitem(res.data.data);
            setseller_id(res.data.data[0].acnt_id);
        })
    }   

    const getdata = () => {
        model.salesorderdata(order_id).then(res=>{
            if(res.data.status===1){
                setorder(res.data.data[0]);
                checkreturn(res.data.data[0].buyer_id);
            }
        })
        
    }



    const cancel = () =>{
        model.cancelOrder(order_id).then(res=>{
            if(res.data.status===1){
                getdata();
            }
        })
    }

    const recieved = () =>{
        model.pickup(order_id).then(res=>{
            if(res.data.status===1){
                getdata();
            }
        })
    }
    
    const openrate = (item) =>{
        setisrate(true)
        const data = {
            order_id:order_id,
            seller_id:seller_id,
            buyer_id:order.buyer_id,
        }
        setrateitem(data);
    }

    const checkreturn = (buyer_id) =>{
        model.checkreturn(buyer_id,order_id).then(res=>{
            if(res.data.status===1){
                setreq(true);
                setreturnrequest(res.data.data[0]);
            }
        })
    }

    return (
        <div>
            <Utopnav/>
            <Usersidenav/>
            <ViewpaymentModal isview={open} setisview={setopen} payment={order_id}/>
            <ReturnItem open={israte}  setopen={setisrate} data={rateitem}/>
            <SellerRate open={rate} setopen={setrate} ratedata={order} />
            <div className="sideuser">
            <div className="margin-content">
                <div className="row " style={{marginBottom:200}}>   
                    <div className="col-md-6 " >
                            <h3>Order Information</h3>
                            <div className="row m-3">
                                <div className="col-sm-5">
                                    <b>Order ID:</b>
                                </div>
                                <div className="col-sm-4">
                                    {order_id}
                                </div>
                            </div>
                            <div className="row m-3">
                                <div className="col-sm-5">
                                    <b>Total Amount:</b>
                                </div>
                                <div className="col-sm-4">
                                    {"\u20B1 " + order.total_amount}
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
                                    <b>Garage Name:</b>
                                </div>
                                <div className="col-sm-4">
                                    {order.garage_name}
                                </div>
                            </div>
                            <div className="row m-3">
                                <div className="col-sm-5">
                                    <b>Payment Method:</b>
                                </div>
                                <div className="col-sm-5">
                                    {order.payment_method}
                                </div>
                            </div>
                            <div className="row m-3">
                                <div className="col-sm-5">
                                    <b>Get Order Through:</b>
                                </div>
                                <div className="col-sm-4">
                                    {order.payment_method === "COP" ? "Pick up" : naming(order.pickitemby)}
                                </div>
                            </div>
                            <div className="row m-3">
                                <div className="col-sm-5">
                                    <b>Order Date:</b>
                                </div>
                                <div className="col-sm-4">
                                    {order.order_date}
                                </div>
                            </div>
                        
                        
                        {order.order_status !== "received" && order.order_status !== "cancel" &&  
                           <p style={{fontSize:13}} className="text-danger">Note: You have only 5 days to pick your item or your order will be cancelled and it will refund your payment</p>
                        }
                        <div className="btn-group">
                            {order.payment_method !== "COP" &&
                                <>
                                    {order.ispayed == 1 ? 
                                    (
                                    <>
                                    {order.order_status != "cancel" &&
                                    
                                    <button className="btn btn-primary" onClick={()=>setopen(true)}>View Payment</button>
                                    }
                                    </>
                                    )
                                    :
                                    (
                                    <>
                                    {order.order_status != "cancel" &&
                                    <button className="btn btn-primary" onClick={()=>window.location.pathname='/payment/'+order_id}>Create Payment</button>
                                     }
                                    </>
                                    )
                                    }
                                </>
                            }
                            {order.order_status !== "deliver" && order.order_status !== "release" ?
                             (
                                <>
                                    {order.order_status !=="cancel" && order.order_status !== "received" &&
                                    <button className="btn btn-danger" onClick={cancel}>Cancel Order</button>
                                    }
                                </>
                             )
                             :  
                             (<button className="btn btn-success" onClick={recieved}>Recieve</button>) 
                            }   
                            {order.order_status === "cancel" &&
                                <p className="text-danger">Note: This order has been cancelled out</p>
                            }     
                          </div>
                        {order.order_status==="received" &&
                            <button className="btn btn-success" onClick={()=>setrate(true)}>Rate</button>
                        } 
                     
                    </div>
                    <div className="col-md-6 " >
                      {!req &&   
                        <>
                        {order.order_status==="received" &&
                            <button className="btn btn-danger btn-sm float-right ml-3" onClick={openrate}>Return Order</button>
                        }
                    
                        </>
                      }

                      {req &&
                        <button className="btn btn-link btn-sm float-right" onClick={()=>window.location.pathname="/itemreturn"}>Return  Request</button>
                      }
                    
                   
                             <h3>Order Item</h3>
                            <div className="line"></div>
                             {req && 
                        <>
                          
                        </>
                        }   

                        <List>
                        {item.map((val,i)=>(
                            <div style={{borderBottom:"1px solid lightgray"}}>
                            <ListItem key={i.toString()} >
                                <img src={ServerUrl + val.item_pic1} alt={item.item_pic1} style={{width:100,height:100}}/>
                                <div style={{marginLeft:10}}>
                                    <div style={{fontWeight:'bold'}}>{val.item_name}</div>
                                    <div style={{fontSize:13}} className="text-secondary">Quantity: {" "+val.order_quantity + " " + val.item_unit}</div>
                                    <div style={{fontSize:13}} className="text-secondary">Price: {" \u20B1"+val.order_price}</div>
                                    <div style={{fontSize:13}} className="text-secondary">Total: {" \u20B1"+total(val.order_quantity,val.order_price)}</div>
                                </div>
                            </ListItem>
                            </div>
                       ))}
                        </List>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ViewOrderInfo
