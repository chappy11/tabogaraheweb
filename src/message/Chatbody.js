import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useState,useEffect,useRef} from 'react'
import model from '../buyer/model/Buyer_Model';
import ReactDom from 'react-dom';
import {ServerUrl as url} from '../ServerUrl';
function Chatbody({chat_id}) {
    const [messages, setmessages] = useState([]);
    const messageEndfref = useRef(null);
    const id = JSON.parse(localStorage.getItem("user")).id;
    const myimg = JSON.parse(localStorage.getItem("user")).pic;
    const [chat, setchat] = useState("");
    const [isload, setisload] = useState(false)
    useEffect(() => {
        scrolltoBottom();
        setInterval(() => {
            getmessages();
            
        }, 1000);
    }, [isload])
    const getmessages = () =>{
        model.messages(id,chat_id).then(res=>{
            if(res.data.status===1){
                setmessages(res.data.data);
                setisload(true);
            }
        })
    }
    const scrolltoBottom = () =>{
        messageEndfref.current.scrollIntoView({behavior:"smooth"})
    }
    const send = (e) =>{
        
        let data ={
            sender_id:id,
            reciever_id:chat_id,
            message:chat
        }
        model.send(data).then(res=>{
            if(res.data.status===1){
                scrolltoBottom();
                setisload(!isload)
                setchat("");
            }

        })
    }
    return (
            <div className="chatbox">
                <div className="chatlogs">
                {messages.map((val,i)=>(
                    <>
                    {val.sender_id===id ? 
                    (
                        <>
                        <div className="chat self animate__animated animate__fadeInLeft">
                      <img src={url+myimg} alt={myimg} className="chat-photo"/>
                            <div className="chat-message">{val.message}</div>
                            <span className="date">{val.mess_date}</span>
                        </div>
                        </>
                    )
                    :
                    (
                        <>
                        <div className="chat friend animate__animated animate__fadeInRight">
                            <img src={url+val.acnt_pic} alt={val.acnt_pic} className="chat-photo"/>
                            <div className="chat-message">{val.message}</div>
                            <span className="date">{val.mess_date}</span>
                        </div>
                        </>
                    )}
                    </>
                ))}                  
            <div ref={messageEndfref}/>
            </div>
                <div className="chat-form">
                    <textarea className="form-control" onChange={(e)=>setchat(e.target.value)} value={chat} ></textarea>
                    <button className="btn btn-primary btn-lg" onClick={send}><FontAwesomeIcon icon={faPaperPlane}/></button>
                </div>
            </div>
        )
}

export default Chatbody
