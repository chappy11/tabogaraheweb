import {Dialog, DialogContent, DialogTitle, ListItem,List, DialogActions } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import model from '../model/Buyer_Model';
import {ServerUrl as url} from '../../ServerUrl';
import ReturnItem from './ReturnItem';
function OrderItemDialog({order_id,open,handleclose,order_status,garage_id}) {
    const [list, setlist] = useState([]);
    const [data, setdata] = useState({});
    const [req, setreq] = useState(false);        
    const [key, setkey] = useState(null);
    useEffect(() => {
        getlist();
    }, [order_id])
    const getlist = () =>{
        model.orderlistitem(order_id).then(res=>{
            if(res.data.status===1){
                setlist(res.data.data);
            }else{
                
            }
            console.log(res.data)
        })
    }
    const request = (item_id,key,orderitem_id) =>{
        setdata({
            item_id:item_id,
            orderitem_id:orderitem_id,
            garage_id:garage_id,
            order_id:order_id
        })
        setkey(key);
        setreq(true);
    }
   
    return (
        <>
        <Dialog open={open} onClose={handleclose} fullWidth={true}>

            <DialogTitle>Order list {garage_id}</DialogTitle>
            <DialogContent>
              <List>
                {list.map((val,i) => (
                    <ListItem key={i}>
                        <div className="row">
                            <div className="col">
                                <img src={url+val.item_pic1} alt={val.item_pic1} className="profile-pic"/>
                            </div>
                            <div className="col-*-*">
                                <p className="lead">{val.item_name}</p>
                                <p>{val.order_price}</p>
                                <p>{val.order_quantity+" "+val.item_unit}</p>
                                {order_status==="recieved" ? (
                                        <>
                                        {req && key===i ? 
                                        (
                                            <ReturnItem data={data}/>
                                        )
                                        :(
                                            <button className="btn btn-outline-danger btn-sm btn-block" onClick={()=>request(val.item_id,i,val.orderItem_id)} >Return item</button>
                                        )}
                                        </>
                                        

                                ):(
                                    null
                                )}
                            </div>
                        </div>
                        
                    </ListItem>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
                <button className="btn btn-danger" onClick={handleclose}>close</button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default OrderItemDialog
