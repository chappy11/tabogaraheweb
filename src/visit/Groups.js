import { List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import Usersidenav from '../user/navigation/Usersidenav'
import Utopnav from '../user/navigation/Utopnav'
import GroupModel from './GroupModel'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers} from '@fortawesome/free-solid-svg-icons';

const Groups = () => {
    const id = JSON.parse(localStorage.getItem('user')).id; 
    const [groups, setgroups] = useState([]);
    const [groupname, setgroupname] = useState("");

    const addgroup = () =>{
        if(groupname===""){
            alert("Please input group name")
        }else{
            const data = {
                owner_id:id,
                group_name:groupname
            }    
            GroupModel.addgroup(data).then(res=>{
                if(res.data.status===1){
                    getgroups();
                }
                alert(res.data.message);
            })
        }
       
    }
   
   
    useEffect(() => {
        getgroups();
   }, [])

   
    const getgroups = () =>{
        GroupModel.getgroups(id).then(res=>{
            if(res.data.status===1){
                setgroups(res.data.data);
            }else{
                setgroups([]);
            }
        })        
    }
    return (
        <>
            <Utopnav/>
            <Usersidenav/>
            <div className="sideuser">
                <div className="margin-content">
                    <div className="container">
                        <div className="form-group">
                            <div className="row">
                            <input className="form-control col-sm" onChange={(e)=>setgroupname(e.target.value)} placeholder="Group Name"/>
                            <button className="btn btn-primary" onClick={addgroup}>Add Group</button>
                            </div>
                        </div>
                        <List>
                            {groups.map((val,i)=>(
                                <ListItem>
                                    <ListItemAvatar>
                                        <FontAwesomeIcon icon={faUsers} size='lg' />
                                    </ListItemAvatar>                     
                                    <ListItemText primary={val.group_name}/>
                                    <ListItemSecondaryAction>
                                        <button className="btn btn-info" onClick={()=>window.location.pathname="/member/"+val.group_id}>View Members</button>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}


                        </List>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Groups
