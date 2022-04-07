import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios';
import React,{useState} from 'react';
import Buyer_Model from './buyer/model/Buyer_Model';
import {Message as mess} from './Message';
 
function Paymentsample({total,order_id,getdata}) {
    const stripe = useStripe();
    const elements = useElements();
    const [payinfo, setpayinfo] = useState({
        idno:'',
        sender:'',
        receiver:'',
    })
    const [message, setmessage] = useState({
      msg:'',
      cName:''
    })

  const onChange= (e) =>{
    setpayinfo({...payinfo,[e.target.name]:e.target.value});
  }
  
  const clear = () =>{
    setTimeout(() => {
      setmessage({
        msg:'',
        cName:''
      })
    }, 5000);
  }

  const handlepay = async(e) =>{
        e.preventDefault();

    if(payinfo.sender==="" || payinfo.receiver ==="" || payinfo.idno===""){
        setmessage({
          msg:"Fill out all fields",
          cName:mess[1]
        })
        clear();
    }else{
       const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

          if (error) {
            setmessage({msg:"Please your Card or Customer Id",cName:mess[1]})
          } 
          else {
            const paymentdata = {
              amount:parseInt(total)+'00',
              id:paymentMethod.id,
              idno:payinfo.idno
            }
            axios.post("http://192.168.1.4:9000/testApi",paymentdata).then(res=>{
                  const {success,payment} = res.data;
                  if(success){
                    const db ={
                      order_id:order_id,
                      trans_id:payment,
                      amount:total,
                      sender:payinfo.sender,
                      receiver:payinfo.receiver
                    }
                    Buyer_Model.createPayment(db).then(resp=>{
                        if(resp.data.status===1){
                          setmessage({
                            msg:res.data.message,
                            cName:mess[0]
                          })
                          setTimeout(() => {
                            getdata()
                          }, 5000);
                        }else{
                          setmessage({
                            msg:res.data.message,
                            cName:mess[1]
                          })
                        }
                    })
                  }else{
                    alert("error")
                  }
                }).catch(err=>{
                  alert("network error");
                })
          }
        }
    }

    return (
      
        <div>
          <p className={message.cName}>{message.msg}</p>
            <div className="form-group">
              <label>Card Info</label>
              <CardElement className="form-control"/>
            </div>
            <div className="form-group">
              <label>Receiver ID</label>
              <input type="" className="form-control" name='idno' onChange={onChange} />
            </div> 
            <div className="form-group">
              <label>Sender Fullname</label>
              <input type="text" className="form-control" name='sender' onChange={onChange}/>
            </div>
            <div className="form-group">
              <label>Receiver Fullname</label>
              <input type="text" className="form-control" name="receiver" onChange={onChange}/>
            </div>
            <button className="btn btn-primary" onClick={handlepay}>Pay {total}</button>
        </div>
    )
}

export default Paymentsample
