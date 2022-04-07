import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import model from '../../buyer/model/Buyer_Model';
import {Message as msgs} from '../../Message';
function PaymentModal({open,setopen,order_id,setpaid}) {
    
    const [data, setdata] = useState({
        method:'',
        amount:'',
        getitemby:'',
        sender:'',
        reciever:'',
        prof:''
    })
    const [image, setimage] = useState(null);
    const [message, setmessage] = useState({msg:'',msgclas:''});
    useEffect(() => {
        setdata({method:"",amount:"",sender:"",reciever:"",prof:''});
        setimage(null);
    }, [open])
    const onChange = (e) =>{
        setdata({...data,[e.target.name]:e.target.value})
    }

    const getimage = (e) =>{
        setimage(URL.createObjectURL(e.target.files[0]));
        setdata({...data,prof:e.target.files[0]})
    }
    const clear = () =>{
        setTimeout(() => {
            setmessage({msg:'',msgclas:''});
        }, 3000);
    }
    const save = () =>{
        if(data.method===""){
            setmessage({msg:"Pls Choose Payment Method",msgclas:msgs[1]});
            clear();
        }
        else if(data.getitemby===""){
            setmessage({msg:"Pls Choose How you will get your item",msgclas : msgs[1]})
            clear();
        }
        else if(data.amount==="" || data.sender==="" || data.reciever === ""){
            setmessage({msg:'Pls fillout all fields',msgclas:msgs[1]})
            clear();
        }
        else if(data.prof==null){
            setmessage({msg:'Please put a prof of payment',msgclas:msgs[1]});
            clear();
        }else{
            let fd = new FormData();
            fd.append('order_id',order_id);
            fd.append('method',data.method);
            fd.append('getitemby',data.getitemby);
            fd.append('amount',data.amount);
            fd.append('sender',data.sender);
            fd.append('reciever',data.reciever);
            fd.append('prof',data.prof,data.prof.name);
            model.createPayment(fd).then(res=>{
                let resp = res.data;
                if(resp.status===1){
                    setpaid(true);
                    setmessage({msg:resp.message,msgclas:msgs[0]})
                    clear();
                }else{
                    setmessage({msg:resp.message,msgclas:msgs[1]});
                    clear();
                }
            })
        }
    }
    return (
        <Dialog open={open} onClose={()=>setopen(false)}fullWidth={true}>
            <DialogTitle>
                Create Payment
            </DialogTitle>
            <DialogContent>
                <p className={message.msgclas}>{message.msg}</p>
                <div className="form-group">
                    <label className="text-info">Payment Method</label>
                    <select className="form-control" name="method" onChange={onChange}>
                        <option value="">Choose Payment Method</option>
                        <option value="GCASH">GCASH</option>
                        <option value="Remitance">Remitance</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="text-info">Get Item Thru</label>
                    <select name="getitemby" className="form-control"  onChange={onChange}>
                        <option value="">Choose Payment Method</option>
                        <option value="GCASH">Walkin</option>
                        <option value="Remitance">Deliver thru courier (ex:LALAMOVE)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="text-info">Amount</label>
                    <input type="number" name="amount" className="form-control" placeholder="" onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label className="text-info">Sender</label>
                    <input type="text" name="sender" className="form-control" onChange={onChange} placeholder="Full name"/>
                </div>
                <div className="form-group">
                    <label className="text-info">Reciever</label>
                    <input type="text" name="reciever" className="form-control" placeholder="Full name" onChange={onChange}/>
                </div>
                
                <div className="form-group">
                    <div className="row justify-content-center mb-3">
                    <div className="img-box">
                        <img src={image} alt={image} className='payment-img'/>
                    </div>
                    </div>
                    <input type="file" className="form-control" onChange={getimage}/>
                    
                </div>
            </DialogContent>
            <DialogActions>
                <button className="btn btn-primary" onClick={save}>Save</button>
                <button className="btn btn-danger" onClick={()=>setopen(false)}>Close</button>
            </DialogActions>
        </Dialog>
    )
}

export default PaymentModal
