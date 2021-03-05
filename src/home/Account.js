import React, { useState, useEffect } from "react";
import Navigation from "./navigation/Navigation";
import img from "../images/account-images.png";
import Login from './Login';
import Register from './Register';
function Account() {
    const [isSignIn, setisSignIn] = useState(true);
    const handleClick = (e) =>{
        let val = e.target.value;
        if(val===1){
            setisSignIn(false);
        }else{
            setisSignIn(true);  
        }
    }
    
    const signIn = () =>{
      setisSignIn(true);
    }
    return (
    <div>
      <Navigation />
      <div className="account-container">
        <div className="row">
          <div className="col-md-6">
            <div className="account-well shadow">
              <div className="account-header">
                <ul className="account-head">
                  <li className="account-head-link" onClick={handleClick} value={0} id={isSignIn ? "active":" "}>SignIn</li>
                  <li className="account-head-link" onClick={handleClick} value={1} id={isSignIn ? "" : "active"}>SignUp</li>
                </ul>
              </div>
              {isSignIn ? (<Login/>):<Register signIn={signIn}/>}  
            </div>
          </div>
          <div className="col-md-6 home-img">
            <img src={img} alt={img} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
