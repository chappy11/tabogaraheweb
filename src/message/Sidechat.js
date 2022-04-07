import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import model from '../buyer/model/Buyer_Model';
import {ServerUrl as url} from '../ServerUrl';
function Sidechat({chat_id}) {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const [chatmate, setchatmate] = useState([]);
    
    useEffect(() => {
        getmessage();
    }, [])
    
    const getmessage = () =>{
        model.getallmessage(id).then(res=>{
            if(res.data.status===1){
                setchatmate(res.data.data);
            }
        })
    }
    return (
        <div className="message-contain">
            <div className="sidemessage">
            <List>
            {chatmate.map((val,index)=>(
            <ListItem button key={index} selected={chat_id===val.acnt_id} onClick={()=>window.location.pathname="/message/"+val.acnt_id}>
                <ListItemAvatar>
                    <Avatar src={url+val.acnt_pic} alt={val.acnt_pic} />
                </ListItemAvatar>
                <ListItemText primary={val.firstname+" "+val.mi+" "+val.lastname} secondary={val.mess_date}/>
            </ListItem>
            ))}
            
        </List>
            </div>
        </div>
        
    )
}

export default Sidechat
