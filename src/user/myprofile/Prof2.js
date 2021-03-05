import React,{useState} from 'react'
import { Avatar, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faEnvelope, faLock, faMapMarked, faMapMarkedAlt, faMarker, faPencilAlt, faPhoneAlt, faRing, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import {Barangay as bgy} from '../../Barangay';
import UpdatePassword from './UpdatePassword';
function Prof2({user,isUpdate,setisUpdate,onChange}) {
    const [open, setopen] = useState(false);

    const dialoghandler = () =>{
        setopen(!open);
    }
    return (
        <div className="container-box shadow">
            <h4>Profile</h4>
            <div className="line"></div>
            <UpdatePassword handler={dialoghandler} open={open}/>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <Avatar>
                        <FontAwesomeIcon icon={faEnvelope}/>
                        </Avatar>
                    </ListItemIcon>
                    
                    <ListItemText primary={user.email}/>
                </ListItem>
                <ListItem>
                    <ListItemIcon >
                        <Avatar>
                            <FontAwesomeIcon icon={faPhoneAlt}/>
                        </Avatar>
                    </ListItemIcon>
                        {isUpdate ?(
                            <input className="form-control" name="contact" onChange={onChange} placeholder={user.contact}/>
                        ):(
                            <ListItemText primary={user.contact}/>
                        )}
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Avatar>
                            <FontAwesomeIcon icon={faLock}/>
                        </Avatar>
                    </ListItemIcon>
                    <ListItemText primary={"**********"}/>
                    <IconButton onClick={dialoghandler}>
                                <FontAwesomeIcon icon={faPencilAlt}/>
                    </IconButton>
                  
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Avatar>
                            <FontAwesomeIcon icon={faBirthdayCake}/>
                        </Avatar>
                    </ListItemIcon>
                    {isUpdate ? (
                        <input type="date" name="bday" onChange={onChange} className="form-control"/>
                    ):(
                        <ListItemText primary={user.birthdate}/>
                    ) }
                </ListItem>
                
                <ListItem>
                    <ListItemIcon>
                        <Avatar>
                            <FontAwesomeIcon icon={faVenusMars}/>
                        </Avatar>
                    </ListItemIcon>
                    {isUpdate ? (
                        <>
                        <select name="gender" onChange={onChange} className="form-control">
                            <option>{user.gender}</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        </>
                    ):(
                        <>
                        <ListItemText primary={user.gender}/>
                        </>
                    )}
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Avatar>
                            <FontAwesomeIcon icon={faRing}/>
                        </Avatar>
                    </ListItemIcon>
                    {isUpdate ? (
                        <>
                            <select className="form-control" name="civil" onChange={onChange}>
                                <option>{user.civil_status}</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Widowed">Widowed</option>
                                <option value="Separated">Separated</option>
                            </select>
                        </>
                    ):(
                        <ListItemText primary={user.civil_status}/>
                    )}
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Avatar>
                            <FontAwesomeIcon icon={faMapMarkedAlt}/>
                        </Avatar>
                    </ListItemIcon>
                    {isUpdate ? (
                        <>
                            <input type="" className="form-control" name="sitio" onChange={onChange} placeholder={user.sitio}/>
                        </>
                    ):(
                        <ListItemText primary={user.sitio+" "+user.brgy} />
                    )}
                </ListItem>        
                {isUpdate ? (<ListItem>
                    <ListItemIcon>
                        <Avatar>
                            <FontAwesomeIcon icon={faMapMarked}/>
                        </Avatar>
                    </ListItemIcon>
                    
                    <select className="form-control" name="brgy" onChange={onChange}>
                        {bgy.map((val,index)=>(
                            <option value={index===0? user.brgy: val} key={index}>{index===0? user.brgy:val}</option>
                        ))}
                    </select>
                
                </ListItem>
                ):null}
               
            </List>
        </div>
    )
}

export default Prof2
