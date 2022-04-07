import React, { useState } from "react";
import Address from "./register/Address";
import Confirmation from "./register/Confirmation";
import Email from "./register/Email";
import Password from "./register/Password";
import Personal from "./register/Personal";
import Terms from "./register/Terms";
import {Message as mess} from '../Message';
import model from './model/HomeModel';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
function Register({signIn}) {
  const [counter, setcounter] = useState(0);
  const [data, setdata] = useState({
    email:"",
    code:"",
    password:"",
    cpassword:"",
    fname:"",
    mi:"",
    lname:"",
    gender:"",
    civil:"",
    bday:"",
    contact:"",
    sitio:"",
    brgy:""
  })
  const updatecount = (counts) =>{
      setcounter(counts);
  }
  const [showmes, setshowmes] = useState(false);
  const [isCheck, setisCheck] = useState(false);
  const [message, setmessage] = useState({
    msg:"",
    msgclas:""
  })
  const clear = () =>{
    setTimeout(() => {
        setmessage({msg:"",msgclas:""});
        setshowmes(false);
    }, 5000);
  }
  const onCheck = (e) =>{
    setisCheck(!isCheck);
  }
  const setdat = (dat) =>{
      setdata({...data,...dat});
  }
  const onback = (e) =>{
    e.preventDefault();
    setcounter(counter=> counter - 1);
  }
  const onSubmit = (e) =>{
    e.preventDefault();
    setshowmes(true)
    if(!isCheck){
        setmessage({msg:"Please Accept terms and regulation",msgclas:mess[1]});
        clear();
    }else{
      const users = {
        email:data.email,
        pass:data.password,
        fname:data.fname,
        mi:data.mi,
        lname:data.lname,
        gender:data.gender,
        civil:data.civil,
        bday:data.bday,
        contact:data.contact,
        sitio:data.sitio,
        brgy:data.brgy
      }
      model.register(users).then(res=>{
        if(res.data.status===0){
          setmessage({
              msg:res.data.message,
              msgclas:mess[1]
          })
          clear();
        }
        else{
          setmessage({
            msg:"Successfully Register",
            msgclas:mess[0]
          })
          setTimeout(() => {
            signIn();
          }, 5000);
        }
      })
    }
  }
  
  if (counter === 0) {
   
    return (
      <div className="animate__animated animate__fadeInLeft">
        <Email updatecount={updatecount} count={counter} setdat={setdat}/>
      </div>
    );
  } else if (counter === 1) {
    return <Confirmation code={data.code} email={data.email} setdat={setdat} updatecount={updatecount} count={counter}/>;
  } else if (counter === 2) {
    return <Password email={data.email} dats={data} setdat={setdat} updatecount={updatecount} count={counter}/>;
  } else if (counter === 3) {
    return <Personal setdat={setdat} count={counter} updatecount={updatecount} dats={data} onback={onback}/>;
  } else if (counter === 4) {
    return <Address setdat={setdat} count={counter} updatecount={updatecount} dats={data} onback={onback}/>;
  } else if(counter === 5){
    return <Terms onCheck={onCheck} onback={onback} onsubmit={onSubmit} showmes={showmes} message={message}/>
  }
}

export default Register;
