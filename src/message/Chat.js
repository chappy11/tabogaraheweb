import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom';
import Utopnav from '../user/navigation/Utopnav';
import Chatbody from './Chatbody';
import Sidechat from './Sidechat';
function Chat() {
    const {chat_id} = useParams();
    return (
        <div>
            <Utopnav/>           
            <Sidechat chat_id={chat_id}/>
            {chat_id==0 ? (null): <Chatbody chat_id={chat_id}/>}
           
        </div>
    )
}

export default Chat
