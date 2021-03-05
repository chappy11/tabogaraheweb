/* eslint-disable eqeqeq */
import React,{useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import {Message as mess} from '../../Message';

function Confirmation({email,code,updatecount,count}) {
    const [mycode, setmycode] = useState({
        codex:"",
    });
    const [message, setmessage] = useState({
        msg:"",
        msgclas:""
    })
    const onChange = e =>{
    setmycode({...mycode,[e.target.name]:e.target.value});
    }

    const clear = () =>{
        setTimeout(() => {
            setmessage({
                msg:"",
                msgclas:""
            })    
        }, 5000);
        
    }
    const confirm = (e) =>{
        e.preventDefault();
        if(mycode.codex===""){
            setmessage({
                msg:"Fill out all fields",
                msgclas:mess[1]
            });
            clear();
        }else{
            if(mycode.codex==code){
                setmessage({
                    msg:"Code Confirm",
                    msgclas:mess[0]
                })
                setTimeout(() => {
                    updatecount(count=>count + 1);
                }, 5000);
            }else{
                setmessage({
                    msg:"Code do not match",
                    msgclas:mess[1]
                })
                clear();
            }
        }
    }
    return (
        <div className="register-email">
            <p className="font-color-primary account-text center lead"><FontAwesomeIcon icon={faExclamationTriangle} className="text-warning"/> Please Check your email <span className="text-info"><u>{email}</u></span> to get the code</p>
            <div className="form-group">
                <label className="text-info">Enter your 6 digit code here</label>
                <input type="text" name="codex" className="form-control form-control-lg" placeholder="Code" onChange={onChange}/>
            </div>
            <button className="btn btn-primary" onClick={confirm}>Confirm</button>
            <p className={message.msgclas}>{message.msg}</p>
        </div>
    )
}

export default Confirmation
