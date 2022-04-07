
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import { ServerUrl } from '../ServerUrl';
import NegotiableModel from './NegotiableModel'

function NegotiableDialog({open,setopen,pakyaw_id,info}) {
    
    const [item, setitem] = useState([]);

    useEffect(() => {
        getdata();
    }, [pakyaw_id])

    const getdata = () =>{
        NegotiableModel.item(pakyaw_id).then(res=>{
            if(res.data.status===1){
                setitem(res.data.data);
            }else{
                setitem([]);
            }
        })
    }
 
    const accept = () =>{
        NegotiableModel.accept(pakyaw_id).then(res=>{
            if(res.data.status === 1){
                alert(res.data.message);
            }
        })
    }
    return (
        <Dialog
            open={open}
            onClose={()=>setopen(false)}
            fullWidth={true}
        >
            <DialogContent>
                <p>Total Amount : {" "+info.amount}</p>
                <p>Requested Price : {" "+info.total_amount}</p>
                <List>
                    {item.map((val,i)=>(
                        <ListItem>
                            <img src={ServerUrl + val.item_pic1} alt={val.item_pic1} style={{width:100,height:100}}/>
                            <div className="ml-3">
                                <div style={{fontWeight:'bold'}}>{val.item_name}</div>
                                <div style={{}}>Quantity: {val.pakyaw_quantity } piece</div>
                                <div style={{}}>Price: {"\u20B1"+parseInt(val.pakyaw_sellprice).toFixed(2)}</div>
                            </div>
                        </ListItem>
                    ))}                    
                </List>
            </DialogContent>
            <DialogActions>
                <button className="btn btn-success" onClick={accept}>Accept</button>
                <button className="btn btn-danger">Decline</button>
            </DialogActions>
        </Dialog>
    )
}

export default NegotiableDialog
