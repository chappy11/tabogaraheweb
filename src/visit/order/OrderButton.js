import React,{useState,useEffect} from 'react'
import model from '../../buyer/model/Buyer_Model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import {faMoneyBillAlt} from '@fortawesome/free-solid-svg-icons';
import OrderDialog from '../OrderDialog';
function OrderButton({garage_id,gethave,have,getorder_id,setpmethod,itemlist,total,setispaid}) {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const [order_id, setorder_id] = useState('');
    const [openOrder, setopenOrder] = useState(false)
    useEffect(() => {
        haveorder();     
    }, []);


    const haveorder = () =>{
        model.haveorder(id,garage_id).then(res=>{
            if(res.data.status===1){
                let d = res.data.data[0];
                if(d.order_status=="order"){
                    gethave(true);
                    setorder_id(d.order_id);
                    getorder_id(d.order_id);
                    setpmethod(d.payment_method)
                    setispaid(d.ispayed)
                }else{
                    gethave(false);
                }
            }else{
                gethave(false);
            }
        })
       
    }

    
   
    const handleclose = () =>{
        setopenOrder(false);
//        setorder([]);
    }
  
    const cancelOrder = () =>{
        model.cancelOrder(order_id).then(res=>{
            if(res.data.status===1){
                gethave(false);
            }
        })
    }
    
    return (
        <div>
          <OrderDialog openOrder={openOrder} setopenOrder={setopenOrder} items={itemlist} total={total} garage_id={garage_id} haveorder={haveorder}  />
            {have ? (
                <>
              
              <button className="btn btn-danger btn-block" onClick={cancelOrder}>Cancel Order</button>
                </>
            )
            :(<button className="btn btn-primary btn-block mt-3" onClick={()=>setopenOrder(true)}><FontAwesomeIcon icon={faMoneyBillAlt}/> Order Now</button>)}
        </div>
    )
}

export default OrderButton
