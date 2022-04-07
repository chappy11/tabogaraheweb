import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React,{useState} from 'react'
import {Message as msg} from '../Message';
import model from '../buyer/model/Buyer_Model';

function OrderDialog({items,setopenOrder,openOrder,total,garage_id,haveorder}) {
    const [data, setdata] = useState({
        method:'',
        deliver:''
    })
    const [mymess, setmymess] = useState({
        message:'',
        cName:''
    })

    const store = JSON.parse(localStorage.getItem('user')).id;
    
    const onChange = (e) =>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    
    const clear = () =>{
        setTimeout(() => {
            setmymess({
                message:'',
                cName:''
            })    
        }, 5000);
        
    }

    const makeorder = () =>{
        
        if(items.length===0){
            setmymess({
                message:"Your cart is empty!",
                cName:msg[1]
            })
            clear();
        }else if(data.method===''){
            setmymess({
                message:"Please choose payment method",
                cName:msg[1]
            })
            clear();
        }else{
            const mydata = {
                listitem:items,
                total:total,
                buyer_id:store,
                garage_id,
                getitemby:data.deliver,
                payment:data.method,
            }
     
            model.makeorder(mydata).then(res=>{
                if(res.data.status===1){
                    setmymess({
                        message:res.data.message,
                        cName:msg[0]
                        
                    })
                    haveorder();
                    clear();
                }else{
                    setmymess({
                        message:res.data.message,
                        cName:msg[1]
                    })
                    clear();
                }
            })
         }
    }
    
    return (
        <Dialog open={openOrder} onClose={()=>setopenOrder(false)} fullWidth={true}>
            <DialogContent>
                <div className="m-3 p-3">
                <p>Total Amount of Order: {'\u20b1' + parseInt(total).toFixed(2)}</p>
                <p className={mymess.cName}>{mymess.message}</p>
                <div className='form-group'>
                    <label>Payment Method </label>
                    <select className="form-control" name="method" onChange={onChange}>
                        <option value="">Choose</option>
                        <option value="COP">(COP) Cash on Pickup</option>
                        <option value="E-Pay">Electronic Payment</option>
                    </select>
                </div>
                {data.method !='COP' &&
                <div className="form-group">
                    <label>Get Order Through</label>
                    <select className="form-control" onChange={onChange} name="deliver">
                        <option value="">Choose</option>
                        <option value="Pick up">Pick up</option>
                        <option value="deliver">Delivery</option>
                    </select>
                </div>
                }   
                </div>
            </DialogContent>
            <DialogActions>
                <button className="btn btn-primary" onClick={makeorder}>Confirm Order Now</button>
                <button className="btn btn-danger" onClick={()=>setopenOrder(false)}>Close</button>
            </DialogActions>
        </Dialog>
    )
}

export default OrderDialog
