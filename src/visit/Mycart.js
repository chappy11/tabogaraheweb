import React, { useState,useEffect } from 'react'
import { List, ListItem, ListItemText,IconButton } from '@material-ui/core';
import {ServerUrl as url} from '../ServerUrl';
import model from '../buyer/model/Buyer_Model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faMoneyBillAlt, faPlusCircle, faTimesCircle, faTag } from '@fortawesome/free-solid-svg-icons';
import OrderDialog from './OrderDialog';
import {Message as mess} from '../Message';
import OrderButton from './order/OrderButton';
import PaymentModal from './order/PaymentModal';
import ViewpaymentModal from './order/ViewpaymentModal';
function total(x,y){
    return x * y;
}

function Mycart({garage_id}) {

    const [order, setorder] = useState([]);
    
    const [cart, setcart] = useState([])
    const [have, sethave] = useState(false);
    const store = JSON.parse(localStorage.getItem("user"));
    const [isload, setisload] = useState(false);     
    const [message, setmessage] = useState({msg:"",cName:""});    
    const [paid, setpaid] = useState(false)
    const [pmethod, setpmethod] = useState("");
    const [order_id, setorder_id] = useState('');
    const [isview, setisview] = useState(false);
    const [open, setopen] = useState(false);
    const [paymentdata, setpaymentdata] = useState({});
    const [ispaid, setispaid] = useState('');
    useEffect(() => {
        setInterval(()=>getcartitem(),1000)
       
    }, [isload,have,paid])
 
    const getcartitem = () =>{
        model.getcart(store.id,garage_id).then(res=>{
            
            if(res.data.status===1){
              setcart(res.data.data)
            }else{

            }
        }).catch(err=>console.log(err));
    }
 
    const cleart =()=>{
      setTimeout(() => {
         setmessage({msg:"",cName:""}); 
      }, 8000);
    }
 
    const handleadd = (id) =>{
        model.increamenItem(id).then(res=>{
            if(res.data.status===1){
                setisload(!isload);
            }else{
                setmessage({msg:res.data.message,cName:mess[1]});
                cleart();
            }
        });        
    }
    const handleminus = (id) =>{
        model.decreamentItem(id).then(res=>{
            if(res.data.status===1){
                setisload(!isload);
            }
        })
    } 

    const remove = (id) =>{
        let filterdata = cart.filter(res => res.cart_id!==id);
        setcart(filterdata);
        model.removeitemcart(id).then(res=>{
            if(res.data.status===1){
                setisload(!isload);
            }else{

            }
        })
    }
    
    function getTotal(){
        var total = 0;
        // eslint-disable-next-line array-callback-return
        cart.map((val)=>{
            total += val.item_no * val.sellprice;
        })
        return total;
    }

    function itemlist(){
        let list = [];
        cart.map((val,i)=>{
            let data = {
                "item_id" : val.item_id,
                "sellprice" : val.sellprice,
                "quantity" : val.item_no 
            }
            list.push(data);
        })
        return list;
    } 

    
    const getorder_id = (order_id) =>{
        setorder_id(order_id);
    }
    
    return (
        <div>
        <div className="cart-size">
            <div className="cartbody">
            <PaymentModal open={open} setopen={setopen} order_id={order_id} setpaid={setpaid}/>
            <ViewpaymentModal isview={isview} setisview={setisview} payment={order_id}/>
            {/* <OrderDialog openOrder={openOrder} order={order} handleclose={handleclose} pmethod={pmethod}/> */}
            <List>
                <p className={message.cName}>{message.msg}</p>
                {(cart || []).map((val,index) =>(
                    <>
                    <ListItem key={index}>
  
                        <img src={url+val.item_pic1} className="tbl-img rounded-circle" alt={val.item_pic1}/> 
                        <ListItemText>
                            <>
                            <div className="row">
                                <div className="col-sm-3">{" "+val.item_name.slice(0,7)+"..."}</div>
                                <div className="col-sm-4">
                               {have ? (null):(<IconButton size="small"  onClick={()=>handleadd(val.cart_id)}> <FontAwesomeIcon style={{fontSize:"12px"}} icon={faPlusCircle}/> </IconButton>)}     
                                    {" "+val.item_no+" "+val.item_unit} 
                                    {/*  eslint-disable-next-line eqeqeq */}
                                {have ? (null):(<>
                                    {val.item_no != 1 ? (<IconButton size="small" onClick={()=>handleminus(val.cart_id)} ><FontAwesomeIcon style={{fontSize:"12px"}} icon={faMinusCircle}/> </IconButton>): null}
                                </>)}
                               
                                </div>
                                <div className="col-md-3">&#x20B1;{total(val.item_no,val.sellprice)+".00"}</div>
                                {have  ? (null):(<div className="col-md-1"><IconButton size="small" onClick={()=> remove(val.cart_id)}><FontAwesomeIcon icon={faTimesCircle} color="red"/> </IconButton></div>)}
                                
                            </div>
                            </>
                        </ListItemText>
                    </ListItem>
                    </>
                    ))} 
            </List>
            </div>
           
          
        </div>
                <div className="float-total">
                    <div className="line"></div>
                    <div className="cart-footer">
                        <div  className="cart-total">
                            <span className="float-left"><b>Total</b></span>
                            <span className="float-right mr-3 text-success"><b>&#x20B1;{" "+getTotal()+".00"}</b></span>
                        </div>

                    </div>
                    <div className="cart-footer">
                    {pmethod==="COP" ? (<p>Your Payment Option: Cash on Pick up (COP)</p>):(
                    <>
                    {have ? (
                        <>
                            {ispaid==1? (
                                <>
                                    <button className="btn btn-primary btn-block mb-3" onClick={()=>setisview(true)}>View Payment</button>   
                                </>
                            ):(
                               <>
                                    <button className="btn btn-primary btn-block mb-3" onClick={()=>window.location.pathname=`/payment/${order_id}`}>Create Payment</button>         
                               </> 
                            )}
                       
                        </>
                    ):null}
                    </>
                    )}
                        <OrderButton garage_id={garage_id} setispaid={setispaid}  have={have}  gethave={sethave} itemlist={itemlist()} total={getTotal()} getorder_id={getorder_id} setpmethod={setpmethod}/>
                     </div>
                 </div>
        </div>
        )
}

export default Mycart
