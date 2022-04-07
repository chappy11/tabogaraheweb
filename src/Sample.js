import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Buyer_Model from './buyer/model/Buyer_Model';
import Paymentsample from './Paymentsample';
const stripeProsmise = loadStripe('pk_test_51IlXo6G5BhKeRDfTt4yjqM7zHGP0q14Ma2qOBMxYAKx2EX5gLCVZiQpb4ZZMcP69BVJEkIsAMATDyhJLYjSR0DrQ005jD3T6fw')
function Sample() {
    const {order_id} = useParams();
    const [ispaid, setispaid] = useState(false);
    const [orderdata, setorderdata] = useState({});
    useEffect(() => {
        getorder();
    }, [])

    const getorder = () =>{
        Buyer_Model.orderdata(order_id).then(res=>{
            console.log(res.data);
            if(res.data.status===1){
                setorderdata(res.data.data[0]);
            }
        })
    }
    
    return (
    <div className="container">
        <div className="row justify-content-center">
            <div  className="card" style={style.paymentcontainer}>
                <p className="lead">Payment</p>
                {orderdata.ispayed == 0 ? (
                <Elements stripe={stripeProsmise} style={style.paymentcontainer}>
                    
                    <Paymentsample total={orderdata.total_amount} order_id={orderdata.order_id} getdata={getorder}/>
                </Elements>
                ):
                (<p>You have already paid!!</p>)
                    }
            </div>
        </div>
    </div>
    )
}

export default Sample


const style ={
    paymentcontainer:{
        width:'500px',
        padding: 10,
    }
}