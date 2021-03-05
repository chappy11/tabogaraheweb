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
            if(res.data.status===1){
                setmessage({msg:res.data.message,cName:mess[0]})
            }else{
                setmessage({msg:res.data.message,cName:mess[1]});
            }
            
        })
    }
    return (
        <div>
            <Dialog open={openneg} onClose={()=>setopenneg(!openneg)} >
                <DialogTitle>Negotiate Price {product.garage_id}</DialogTitle>
                <DialogContent>
                <p className={message.cName}>{message.msg}</p>
                <label className="text-danger text-center">NOTE: If you negotiate an items you cannot add to cart it instead You have to order it directly after the seller accept price but if you this item you can add to cart it directly with price.</label>
                    <div className="form-group">
                        <label className="text-info">Negotiate Price</label>
                        <input type="number" min="0" className="form-control" onChange={onChange}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button className="btn btn-success" onClick={request}>Request</button>
                    <button className="btn btn-danger">Close</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default NegotiableDialog
