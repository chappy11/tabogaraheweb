import React, { useState } from "react";
import model from './model/HomeModel';
import {Message as msgclass} from '../Message';
import axios from "axios";
import {CardElement,Elements,useElements,useStripe} from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
function Login() {
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const [ispay, setispay] = useState(false);  
  const [message, setmessage] = useState({
      clas:"",
      msg:""
  });
  const onChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  
 
  const login=(e)=>{
    if(data.email==="" || data.password===""){
        setmessage({
            clas:msgclass[1],
            msg:"Fill out all Fields"
        })
        setTimeout(() => {
            setmessage({
                clas:"",
                msg:""
            })
        }, 5000);
    }else{
        model.login(data).then(res=>{
            if(res.data.status===0){
                setmessage({
                    clas:msgclass[1],
                    msg:res.data.message
                })
            }else{
                setmessage({
                    clas:msgclass[0],
                    msg:res.data.message
                })
                let dat = res.data.data[0];
                const user = {
                    id:dat.acnt_id,
                    fname:dat.firstname,
                    mi:dat.mi,
                    lname:dat.lastname,
                    pic:dat.acnt_pic,
                }
                localStorage.setItem('user',JSON.stringify(user));
                localStorage.setItem('type',dat.type);
                setTimeout(() => {
                    if(dat.type==="admin" || dat.type==="admin2"){
                        window.location.pathname="/admin";
                    }
                    else if(dat.type==="user"){
                        window.location.pathname="/user";
                    }    
                }, 5000);
                
            }
        })        
    }
  }

  
  return (
    <div className="animate__animated animate__fadeInRight">
        
       <div className="form-group">
        
      <div className="login-margin">
         <p className={message.clas}>{message.msg}</p>
           <div className="form-group">
             <label className="text-info">Email</label>
             <input
               type="text"
               name="email"
               className="form-control"
               placeholder="Enter your Email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label className="text-info">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your Password"
              onChange={onChange}
            />
          </div>
          <button className="btn btn-primary" onClick={login}>Sign in</button>        
            </div>
      </div>
    </div>
  );
}

export default Login;
