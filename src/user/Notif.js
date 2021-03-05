import React,{useState,useEffect} from 'react'
import Usersidenav from './navigation/Usersidenav'
import Utopnav from './navigation/Utopnav';
import { List,ListItem,ListItemSecondaryAction,ListItemText,IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle,faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import model from './model/Usermodel';
import CheckNotif from './notif/CheckNotif';
function Notif() {
    const [notif, setnotif] = useState([]);
    const stor = JSON.parse(localStorage.getItem("user"));
    const [isload, setisload] = useState(false);
    const [noNotif, setnoNotif] = useState(false);
    const [open, setopen] = useState(false);
    const [notf, setnotf] = useState({})
    useEffect(() => {
        getNotif();
        setisload(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isload])
    const getNotif = () =>{
        model.getnotif(stor.id).then(res=>{
            if(res.data.status===1){
                setnotif(res.data.data);
                setnoNotif(false)
            }else{
                setnoNotif(true);
                setnotif([]);
            }
        })
    }
    const read = (e) =>{
        const idd = e.currentTarget.value;
        model.read(idd).then(res=>{
            console.log(res)
            setisload(true)
        })
        
    }
   const remove = (e) =>{
       const id = e.currentTarget.value;
       model.remove(id).then(res=>{
           console.log(res);
           setisload(true);
       })
   }

   const handleclose = (e) =>{
       setopen(false);
      
    }

    const removeall =(e)=>{
        e.preventDefault();
        model.removeAll(stor.id).then(res=>{
            setisload(true);
        })
    }

    const readall =(e)=>{
        e.preventDefault();
        model.readAll(stor.id).then(res=>{
            setisload(true);
        })
    }
   
    return (
        <div>
            <Utopnav/>
            <Usersidenav/>
            <CheckNotif open={open} handleclose={handleclose} notf={notf}/>
            <div className="sideuser">
                    <div className="notif-container mx-auto shadow">
                    <div className="d-flex">
                    <div className="mr-auto p-2"><h4 className="p-2">Notification</h4></div>
                    <div className="p-2" ><button onClick={readall} className="btn btn-link"><FontAwesomeIcon icon={faCheckCircle}/>Mark all read</button></div>
                    <div className="p-2"><button onClick={removeall} className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt}/>{" "}remove</button></div>
                </div>               
                    <div className="line"></div>
                        <List>
                            {notif.map((val,i)=>(
                                <>
                                {/* eslint-disable-next-line eqeqeq */}
                                <ListItem button className={val.notif_read == 1? "":"unread"} onClick={()=>{setnotf(notif[i]);
                                     setopen(true)
                                        model.read(val.notif_id).then(res=>
                                            setisload(true)
                                         );
                                    }}  
                                     key={i}>
                                    <ListItemText primary={val.notif_name} secondary={val.notif_date}/>
                                    <ListItemSecondaryAction>
                                        
                                        {val.notif_read == 1 ? (
                                            <>
                                            <IconButton color="secondary" onClick={remove} value={val.notif_id} >
                                                <FontAwesomeIcon icon={faTrashAlt}/>
                                            </IconButton>
                                            </>
                                        ):(
                                            <>
                                            <IconButton color="primary" onClick={read} value={val.notif_id}>
                                            <FontAwesomeIcon icon={faCheckCircle}/>
                                            </IconButton>
                                            </>
                                        )}
                                        
                                    </ListItemSecondaryAction>
                                </ListItem>
                                </>
                            ))}
                        {noNotif ? (<p className="text-danger center">No Notification</p>):null}
                        </List>
                    </div>
            </div>
        </div>
    )
}

export default Notif
