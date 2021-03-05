import React,{useEffect,useState} from 'react'
import Vheader from './viewuser/Vheader'
import { useParams } from 'react-router-dom';
import {ServerUrl as url} from './ServerUrl';
import axios from 'axios';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faEnvelope, faMapMarkedAlt, faPhoneAlt, faRing, faUserSecret, faVenusMars } from '@fortawesome/free-solid-svg-icons';
function ViewUser() {
    const {id} =useParams();
    const [user, setuser] = useState({});
    
    useEffect(() => {
        getProfile();
    }, [])
    const getProfile = async() =>{
        const data = await axios.get(url+"account/profile/"+id).then(res=>{
            return res.data.data[0];
        }).catch(err=>console.log(err));
            setuser(data);
    }

    
    return (
        <div>
            <Vheader/>            
            <div className="sidebody">
                <div className="container-box">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={url+user.acnt_pic} alt={user.acnt_pic} className="mx-auto d-block rounded-circle profile-pic"/>
                            <h4 className="font-color-primary center">{user.firstname+" "+user.lastname}</h4>
                        </div>
                        <div className="col-md-6">
                            <List>
                            <h5 className="font-color-primary">Profile info</h5>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FontAwesomeIcon icon={faEnvelope}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={user.email}/>
                            </ListItem>
                            <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FontAwesomeIcon icon={faPhoneAlt}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.gender==="" ? "N/A" : user.contact}/>    
                                </ListItem>
                            {user.type==="admin2" ? (<ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FontAwesomeIcon icon={faUserSecret}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.username}/>
                                </ListItem>):null}
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FontAwesomeIcon icon={faVenusMars}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.gender==="" ? "N/A" : user.gender}/>    
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FontAwesomeIcon icon={faRing}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.gender==="" ? "N/A" : user.civil_status}/>    
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FontAwesomeIcon icon={faBirthdayCake}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.gender==="" ? "N/A" : user.birthdate}/>    
                                </ListItem>    
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FontAwesomeIcon icon={faMapMarkedAlt}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.gender==="" ? "N/A" : user.sitio+" "+user.brgy}/>    
                                </ListItem>
                            </List>
                             

                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ViewUser
