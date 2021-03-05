import React, { useState,useEffect } from 'react'
import { List, ListItem, ListItemText,IconButton } from '@material-ui/core';
import {ServerUrl as url} from '../ServerUrl';
import model from '../buyer/model/Buyer_Model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faMoneyBillAlt, faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function total(x,y){
    return x * y;
}

function Mycart({garage_id}) {

    const [cart, setcart] = useState([])
    const store = JSON.parse(localStorage.getItem("user"));
    const [isload, setisload] = useState(false);     
    const [message, setmessage] = useState("");    
    useEffect(() => {
        getcartitem();
    }, [isload])
    const getcartitem = () =>{
        model.getcart(store.id,garage_id).then(res=>{
            if(res.data.status===1){
                setcart(res.data.data);
          
            }else{

            }
        })
    }
    const cleart =()=>{
      setTimeout(() => {
         setmessage(""); 
      }, 5000);
    }
    const handleadd = (id) =>{
        model.increamenItem(id).then(res=>{
            if(res.data.status===1){
                setisload(!isload);
            }else{
                setmessage(res.data.message);
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
    return (
        <div>
        <div className="cart-size">
            <List>
                <p className="text-danger text-center">{message}</p>
                {(cart || []).map((val,index) =>(
                    <>
                    <ListItem key={index}>
  
                        <img src={url+val.item_pic1} className="tbl-img rounded-circle" alt={val.item_pic1}/> 
                        <ListItemText>
                            <>
                            <div className="row">
                                <div className="col-sm-3">{" "+val.item_name.slice(0,7)+"..."}</div>
                                <div className="col-sm-4">
                                    <IconButton size="small"  onClick={()=>handleadd(val.cart_id)}> <FontAwesomeIcon style={{fontSize:"12px"}} icon={faPlusCircle}/> </IconButton>
                                    {" "+val.item_no+" "+val.item_unit} 
                                    {/*  eslint-disable-next-line eqeqeq */}
                                    {val.item_no != 1 ? (<IconButton size="small" onClick={()=>handleminus(val.cart_id)} ><FontAwesomeIcon style={{fontSize:"12px"}} icon={faMinusCircle}/> </IconButton>): null}
                                </div>
                                <div className="col-md-3">&#x20B1;{total(val.item_no,val.sellprice)+".00"}</div>
                                <div className="col-md-1"><IconButton size="small" onClick={()=> remove(val.cart_id)}><FontAwesomeIcon icon={faTimesCircle} color="red"/> </IconButton></div>
                            </div>
                            </>
                        </ListItemText>
                    </ListItem>
                    </>
                    ))}
            </List>
        </div>
                <div className="float-total">
                    <div  className="cart-total">
                        <span className="float-left"><b>Total</b></span>
                        <span className="float-right mr-3 text-success"><b>&#x20B1;{" "+getTotal()+".00"}</b></span>
                    </div>
                    <div className="line"></div>
                    <div className="cart-footer">
                        <button className="btn btn-primary btn-block mt-3"><FontAwesomeIcon icon={faMoneyBillAlt}/> Order Now               </button>
                     </div>
                 </div>
        </div>
        )
}

export default Mycart
