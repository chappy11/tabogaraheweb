import React,{useState} from 'react'
import { Avatar, IconButton, List, ListItem,ListItemAvatar,ListItemSecondaryAction,ListItemText } from '@material-ui/core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faEnvelope, faLock, faRing, faUserAlt, faVenusMars, faMapMarkerAlt, faHouseUser,faPhone, faPen } from '@fortawesome/free-solid-svg-icons';
import {Barangay as barangay} from '../../Barangay';
import ChangePassword from './ChangePassword';
function ProfileData({isUpdate,user,onChange,message}) {
    const [open, setopen] = useState(false);

    const handleopen = (e) =>{
        setopen(true);
    }

    const handleclose = (e) =>{
        setopen(false);
    }
    return (
        <div className="container-box">
            <ChangePassword open={open} handleclose={handleclose}/>
            <p className={message.msgclas}>{message.msg}</p>
            <List>
                <p></p>
                <h4>Account Info</h4>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <FontAwesomeIcon icon={faUserAlt}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.username}/>
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <FontAwesomeIcon icon={faEnvelope}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText  className="text-info" primary={user.email}/>
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <FontAwesomeIcon icon={faPhone}/>
                        </Avatar>
                    </ListItemAvatar>
                        <ListItemText  className="text-info" primary={user.contact}/> 
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <FontAwesomeIcon icon={faLock}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText  className="text-secondary" primary={"***********"}/>
                    <ListItemSecondaryAction>
                        <IconButton className="text-info"onClick={handleopen}>
                            <FontAwesomeIcon icon={faPen}/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <h4 className="font-color-primary">Personal Info</h4>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <FontAwesomeIcon icon={faBirthdayCake}/>
                        </Avatar>
                    </ListItemAvatar>
                    {isUpdate ?
                    (<input type="date" name="bday" onChange={onChange} className="form-control"/>)
                    :
                    (<> <ListItemText  className="text-secondary" primary={user.birthdate}/></>)}
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <FontAwesomeIcon icon={faVenusMars}/>
                        </Avatar>
                    </ListItemAvatar>
                    {isUpdate ?
                    (<select  className="form-control" name="gender" onChange={onChange}>
                        <option value="">choose</option>    
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>)
                    :
                    (<> <ListItemText  className="text-secondary" primary={user.gender}/></>)}
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <FontAwesomeIcon icon={faRing}/>
                        </Avatar>
                    </ListItemAvatar>
                    {isUpdate ?
                    (<select  className="form-control" name="civil" onChange={onChange}>
                        <option value="">choose</option>    
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Widow">Widow</option>
                        <option value="Separated">Separated</option>
                    </select>)
                    :
                    (<> <ListItemText  className="text-secondary" primary={user.civil_status}/></>)}
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <FontAwesomeIcon icon={faHouseUser}/>
                        </Avatar>
                    </ListItemAvatar>
                    {isUpdate ? 
                    (<input type="text" name="sitio" className="form-control" value={user.sitio} onChange={onChange} />):(
                        <ListItemText primary={user.sitio+" "+user.brgy}/>
                    )}
                </ListItem>
                {isUpdate ? (
                         <ListItem>
                         <ListItemAvatar>
                             <Avatar>
                                 <FontAwesomeIcon icon={faMapMarkerAlt}/>
                             </Avatar>
                         </ListItemAvatar>
                         <select  className="form-control" name="brgy" onChange={onChange}>
                             {barangay.map((val,index)=>(
                                 <option value={val} key={index}>{val}</option>
                             ))}
                         </select>
                     </ListItem>
                ):(null)}
               

            </List>
        </div>
    )
}

export default ProfileData
