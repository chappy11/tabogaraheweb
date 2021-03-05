import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import {ServerUrl as url} from '../../ServerUrl';
import model from '../model/Usermodel';
import {Message as mess} from '../../Message';
function ProductDialog({open,item,setopen,handleclose}) {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const [product, setproduct] = useState({
        sellprice:"",
        selltype:""
    })
   const [itm, setitm] = useState({})
    const [message, setmessage] = useState({msg:"",cName:""});

    const onChange = (e) =>{
        setproduct({...product,[e.target.name]:e.target.value});
    }
    const save = () =>{
        const data = {
            sellprice:product.sellprice,
            selltype:product.selltype,
            item_id:item.item_id,
            acnt_id:id
        }
        model.addProduct(data).then(res=>{
                if(res.data.status===1){
                    setmessage({msg:res.data.message,cName:mess[0]});
                    setTimeout(() => {
                        setmessage({msg:"",cName:""});
                        handleclose();
                    }, 5000);
                }else{
                    setmessage({msg:res.data.message,cName:mess[1]});
                    setTimeout(() => {
                        setmessage({msg:"",cName:""});
                    }, 5000);
                }
        }).catch(err=>{
            console.log(err);
        })
    }    
    useEffect(() => {
       setitm(item)         
    }, [open])
    
    return (
        <div>
            <Dialog fullWidth={true} open={open} onClose={handleclose}>
                <DialogTitle>Sell this Item</DialogTitle>
                   <DialogContent>
                        <p className={message.cName}>{message.msg}</p>
                        <div className="row">
                            <div className="col-md-5">
                                <img src={url+itm.item_pic1} alt={itm.item_pic1} className="img-card"/>
                                <img src={url+itm.item_pic2} alt={itm.item_pic2} className="img-card"/>
                                <img src={url+itm.item_pic3} alt={itm.item_pic3} className="img-card"/>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-5">
                                        <p>Name</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <p>{itm.item_name}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5">
                                        <p>Description</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <p>{itm.item_description}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5">
                                        <p>Orig. Price</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <p>{itm.item_orig_price+".00"}</p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Sell Price</label>
                                    <input type="number" className="form-control" name="sellprice" onChange={onChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Sell type</label>
                                    <select className="form-control" name="selltype" onChange={onChange}>
                                        <option>choose</option>
                                        <option value="negotiable">Negotiable</option>
                                        <option value="fixed">Fixed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </DialogContent> 
                    <DialogActions>
                        <button className="btn btn-success" onClick={save}>Add now</button>
                        <button className="btn btn-danger" onClick={handleclose}>close</button>
                    </DialogActions>
            </Dialog>            
        </div>
    )
}

export default ProductDialog
