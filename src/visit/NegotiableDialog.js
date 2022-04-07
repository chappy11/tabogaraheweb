import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React,{useState} from 'react'
import {Message as mess} from '../Message';
import model from '../buyer/model/Buyer_Model';
function NegotiableDialog({product,openneg,setopenneg}) {
    const user = JSON.parse(localStorage.getItem("user")).id;
    const [negprice, setnegprice] = useState(0);
    const [message, setmessage] = useState({msg:"",cName:""})    
    const onChange = (e) =>{
            setnegprice(e.target.value);
    }
    const cleart =()=>{
        setTimeout(() => {
            setmessage({msg:"",cName:""})
        }, 5000);
    }
    const request =(e) =>{
        e.preventDefault();
        const data = {
            user_id:user,
            garage_id:product.garage_id,
            product_id:product.product_id,
            price:negprice,
        }
        model.requestnegotiable(data).then(res=>{
            console.log(res);
            if(res.data.status===1){
                setmessage({msg:res.data.message,cName:mess[0]})
                cleart();
            }else{
                setmessage({msg:res.data.message,cName:mess[1]});
                cleart();
            }
            
        })
    }
    return (
        <div>
            <Dialog open={openneg} onClose={()=>setopenneg(!openneg)} >
                <DialogContent>
                <p className={message.cName}>{message.msg}</p>
                <label className="text-danger text-center">Note: During negotiations of item, you can't add to cart yet</label>
                    <div className="form-group">
                        <label className=""><h5>Price:</h5></label>
                        <input type="number" min="0" className="form-control" onChange={onChange}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button className="btn btn-success" onClick={request}>Request</button>
                    <button className="btn btn-danger" onClick={()=>setopenneg(false)}>Close</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default NegotiableDialog
