import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {Message as mess} from '../../Message';
function Password({ email,count,updatecount,setdat,dats }) {
  const [data, setdata] = useState({
    password: dats.password,
    cpassword:dats.cpassword,
  });
  const [message, setmessage] = useState({
      msg:"",
      msgclas:""
  })
  const onChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const clear = () =>{
    setTimeout(() => {
        setmessage({
            msg:"",
            msgclas:""
        })    
    }, 5000);  
    
  }

  const onNext = e =>{
    e.preventDefault();
    if(data.password==="" || data.cpassword===""){
        setmessage({
            msg:"Fill out all fields",
            msgclas:mess[1]
        })
        clear();
    }else if(data.password !== data.cpassword){
        setmessage({
            msg:"Password Do not match",
            msgclas:mess[1]
        })
        clear();
    }else{
        const dat={password:data.password,cpassword:data.cpassword}
        setdat(dat);
        setmessage({
            msg:"Password Confirm",
            msgclas:mess[0]
        })
        setTimeout(() => {
            updatecount(count=> count + 1);
            setmessage({msg:"",msgclas:""});
        }, 5000);
    }
  }
  return (
    <div className="register-password">
      <p className="text-info">
        <FontAwesomeIcon icon={faEnvelope} /> {email}
      </p>

      <div className="form-group">
        <label className="text-info">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter you Password"
          onChange={onChange}
          value={data.password}
        />
      </div>
      <div className="form-group">
        <label className="text-info">Confirm Password</label>
        <input
          type="password"
          name="cpassword"
          className="form-control"
          placeholder="Confirm your Password"
          onChange={onChange}
          value={data.cpassword}
        />
      </div>
      <button className="btn btn-primary" onClick={onNext}>Next</button>
        <p className={message.msgclas}>{message.msg}</p>
    </div>
  );
}

export default Password;
