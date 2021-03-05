import React, { useState, useEffect } from "react";
import model from "./model/AdminModel";
import Asidebar from "./navigation/Asidebar";
import Atopnav from "./navigation/Atopnav";
import {ServerUrl as url} from '../ServerUrl';
import ProfilePic from "./profile/ProfilePic";
import ProfileData from "./profile/ProfileData";
import {Message as mess} from '../Message';
function Adminprofile() {
  const store = JSON.parse(localStorage.getItem("user"));
  const myid = store.id;
  const [user, setuser] = useState({});
  const [isupdate, setisupdate] = useState(false);
  const [data, setdata] = useState({
    fname:"",
    mi:"",
    lname:"",
    gender:"",
    civil:"",
    bday:"",
    sitio:"",
    brgy:""
  })
  const [message, setmessage] = useState({
    msg:"",
    msgclas:""
  })
  useEffect(() => {
    getProfile();
    
    }, [isupdate]);
  
    const clear = () =>{
      setTimeout(() => {
        setmessage({
          msg:"",
          msgclas:""
        })
      }, 5000);
    }
    const save = (e) =>{
      e.preventDefault();
      const updated = {
          id:myid,
          fname:data.fname ==="" ? user.firstname : data.fname,
          mi:data.mi === "" ? user.mi : data.mi,
          lname: data.lname === "" ? user.lastname : data.lname,
          gender: data.gender === "" ? user.gender : data.gender,
          civil: data.civil === "" ? user.civil_status : data.civil,
          bday: data.bday === "" ? user.birthdate : data.bday,
          sitio: data.sitio === "" ? user.sitio : data.sitio,
          brgy:data.brgy === "" ? user.brgy : data.brgy
          
        }
        if(data.fname==="" && data.mi==="" && data.lname==="" && data.gender==="" && data.civil==="" && data.bday==="" && data.sitio==="" && data.brgy ==="" ){
          setmessage({
            msg:"nothing change",
            msgclas:mess[1]
          })
        }else{
        model.updateAdmin(updated).then(res=>{
            if(res.data.status===0){
              setmessage({
                  msg:res.data.message,
                  msgclas:mess[1]
              })
              clear();
            }else{
              setmessage({
                msg:res.data.message,
                msgclas:mess[0]
              })
              clear();
            }
        })

      }
    }
  const btnupdate = (e) =>{
    e.preventDefault();
    setisupdate(!isupdate);
   
  }

  const getProfile = async () => {
    const data = await model
      .profile(myid)
      .then((res) => {
        return res.data.data[0];
      })
      .catch((err) => {
        console.log(err);
      });
    setuser(data);
  
  
  
  };

  const onChange = (e) =>{
    setdata({
      ...data,[e.target.name]:e.target.value
    })
  }
  
 
 
  return (
    <div>
      <Asidebar />
      <Atopnav />
      <div className="sidebody">
          <div className="row">
            <div className="col-md-4">

              <ProfilePic user={user} url={url} isupdate={isupdate} btnupdate={btnupdate} onChange={onChange} save={save}/>
           </div>
            <div className="col-md-8">
              <ProfileData user={user} clear={clear} setmessage={setmessage} message={message} isUpdate={isupdate} onChange={onChange}/>
            </div>
          </div>
          
      </div>
    </div>
  );
}

export default Adminprofile;
