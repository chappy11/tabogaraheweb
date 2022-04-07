import { Dialog, DialogContent, ListItem, ListItemText,List, DialogActions, ListItemSecondaryAction } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import { ServerUrl } from '../ServerUrl';
import GroupModel from './GroupModel';

function Addmember({open,setopen,group_id,getuser}) {
    const id = JSON.parse(localStorage.getItem('user')).id;
    const [user, setuser] = useState([]);
    
    useEffect(() => {
       getusers();
    }, [])

    const addmember = (acnt_id) =>{
        GroupModel.addmember(group_id,acnt_id).then(res=>{
            if(res.data.status===1){
                let filter = user.filter(item=>item.acnt_id !== acnt_id);
                setuser(filter);
                getuser();
            }
            alert(res.data.message);
        })
    }
        const getusers = () =>{
        GroupModel.getuser(id).then(res=>{
            if(res.data.status===1){
                setuser(res.data.data);
            }else{
                setuser([]);
            }
        })
    }
   
    return (
      <Dialog open={open} onClose={()=>setopen(false)} fullWidth={true}>
        <DialogContent >
            <List>
                {user.map((val,i)=>(
                    <ListItem>
                        <img src={ServerUrl + val.acnt_pic} style={{width:100,height:100}} />
                        <ListItemText primary={val.firstname+" "+val.mi+" "+val.lastname}/>
                    <ListItemSecondaryAction>
                        <button className="btn btn-primary" onClick={()=>addmember(val.acnt_id)}>Add</button>
                    </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </DialogContent>
        <DialogActions>
            <button className="btn btn-danger" onClick={()=>setopen(false)}>Close</button>
        </DialogActions>
      </Dialog>
    )
}

export default Addmember
