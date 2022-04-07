
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import {Barangay} from '../../Barangay';
import GroupModel from '../../visit/GroupModel';
import BroadcastModel from './BroadcastModel';

function Broadcast({open,setopen,garage_id}) {
    const [broad, setbroad] = useState("");
    const [groups, setgroups] = useState([]);
    const id = JSON.parse(localStorage.getItem('user')).id;
    const [brgy, setbrgy] = useState("");
    const [group_id, setgroup_id] = useState("");

    const activate = () =>{
        const data = {
            option:broad,
            garage_id:garage_id,
            seller_id:id,
            brgy:brgy,
            group_id:group_id,

        }
        BroadcastModel.activate(data).then(res=>{
            if(res.data.status===1){
                setTimeout(() => {
                        setopen(false);
                }, 2000);
            }
            alert(res.data.message);
        })
    }

    useEffect(() => {
        getgroups();
    }, [open,garage_id])
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
        <Dialog
            open={open}
            onClose={()=>setopen(false)}
            fullWidth={true}
        >
            <DialogTitle>
                Promote Garage
            </DialogTitle>
        <DialogContent>
                <div className="form-group">
                    <select className="form-control" onChange={(e)=>setbroad(e.target.value)}>
                        <option>Broadcast to</option>
                        <option value="group"> Your Group</option>
                        <option value="location"> Barangay</option>
                    </select>
                </div>
                
                {broad === "group" &&
                    <>
                    <div className="form-group">
                        <label>Group</label>
                           <select className="form-control" onChange={(e)=>setgroup_id(e.target.value)}>
                                <option value="">Choose Group</option>
                                {groups.map((val,i)=>(
                                    <option value={val.group_id}>{val.group_name}</option>
                                ))}
                            </select>
                    </div>
                    <p>This option will allow you to promote your garage to a specific group.</p>
                    <p>
                        Do you want to add group? <a href='/groups'>Manage group now</a>
                    </p>
                    </>
                }
                {broad === "location" &&
                <>
                <div className="form-group">
                        <label>Barangay</label>
                           <select className="form-control" onChange={(e)=>setbrgy(e.target.value)}>
                                {Barangay.map((val,i)=>(
                                    <option value={val}>{val}</option>
                                ))}
                            </select>
                    </div>
                    <p>This option will allow you to promote your garage in your chosen barangay</p>
                </>
                }

                
            </DialogContent>
            <DialogActions>
                <button className="btn btn-success" onClick={activate}>Activate</button>
            </DialogActions>
        </Dialog>
    )
}

export default Broadcast
