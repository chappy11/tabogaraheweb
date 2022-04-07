import { Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react';
import Category from "../../Categorydata";
import { ServerUrl } from '../../ServerUrl';
import { Unitdata as un } from "../../Unitdata";
import Usermodel from '../model/Usermodel';
import {Message as msgs} from '../../Message';
function UpdateItem({update,setupdate,item}) {
    const [imagepreview, setimagepreview] = useState({
        image1:null,
        image2:null,
        image3:null,
    })
    const [data, setdata] = useState({
        pic1:null,
        pic2:null,
        pic3:null,
        name:"",
        desc:"",
        cond:"",
        prc:"",
        catg:"",
        qty:"",
        unit:"",
    });
    const [message, setmessage] = useState({
        msg:"",
        msgclas:"",
    })
    const inputfile1 = React.useRef(null);
    const inputfile2 = React.useRef(null);
    const inputfile3 = React.useRef(null);
   
    const img1 = () =>{
        inputfile1.current.click();
    }

    const img2 = () =>{
        inputfile2.current.click();
    }

    const img3 = () =>{
        inputfile3.current.click();
    }

    const onChange =(e) =>{
        setdata({...data,[e.target.name]:e.target.value});
    }
    const onchangeimg1 = (e) =>{
        setimagepreview({...imagepreview,image1:URL.createObjectURL(e.target.files[0])});
        setdata({...data,pic1:e.target.files[0]})
     }
   
     const onchangeimg2 = (e) =>{
         setimagepreview({...imagepreview,image2:URL.createObjectURL(e.target.files[0])});
         setdata({...data,pic2:e.target.files[0]})
     }
   
     const onchangeimg3 = (e) =>{
         setimagepreview({...imagepreview,image3:URL.createObjectURL(e.target.files[0])});
         setdata({...data,pic3:e.target.files[0]});
     }

     const clear = () =>{
            setTimeout(() => {
                setmessage({msg:"",msgclas:""});
            }, 5000);
     }
     const save = () =>{
        let fd =  new FormData();
        if(data.pic1!=null){
            fd.append("pic1",data.pic1,data.pic1.name);
        }
        if(data.pic2 != null){
            fd.append("pic2",data.pic2,data.pic2.name);
        }
        if(data.pic3 != null){
            fd.append("pic3",data.pic3,data.pic3.name);
        }   
            fd.append('id',item.item_id);
            fd.append('name',data.name);
            fd.append('desc',data.desc);
            fd.append('cond',data.cond);
            fd.append('prc',data.prc);
            fd.append('catg',data.catg);
            fd.append('qty',data.qty);
            fd.append('unit',data.unit);
           // console.log(data);
            Usermodel.updateItem(fd).then(res=>{
                console.log(res);
                if(res.data.status===1){
                    setmessage({msg:res.data.message,msgclas:msgs[0]});
                    clear();
                }else{
                    setmessage({msg:res.data.message,msgclas:msgs[1]});
                    clear();
                }
            }).catch(err=>{
                console.log(err);
            })
    }
    return (
        <Dialog open={update} onClose={()=>setupdate} fullScreen={true}>
            
                    <input type="file"  id='file' ref={inputfile1} onChange={onchangeimg1} style={{display:'none'}}/>
                        
                        <input type="file"  id='file' ref={inputfile2} style={{display:'none'}} onChange={onchangeimg2}/>
                        
                        <input type="file"  id='file' ref={inputfile3} style={{display:'none'}} onChange={onchangeimg3}/>
                <div className="row justify-content-center">
                    <div className="img-box m-3" onClick={img1}>
                        {imagepreview.image1===null ?(
                            <img src={ServerUrl+item.item_pic1} alt={item.item_pic1} className="payment-img"/>
                        ):(<img src={imagepreview.image1} alt={imagepreview.image1} className="payment-img"/>)}
                    </div>
                    <div className="img-box m-3" onClick={img2}>
                        {imagepreview.image2===null ?(
                            <img src={ServerUrl+item.item_pic2} alt={item.item_pic2} className="payment-img"/>
                        ):(<img src={imagepreview.image2} alt={imagepreview.image2} className="payment-img"/>)}
                    </div>
                    <div className="img-box m-3" onClick={img3}>
                        {imagepreview.image3===null ?(
                            <img src={ServerUrl+item.item_pic3} alt={item.item_pic3} className="payment-img"/>
                        ):(<img src={imagepreview.image3} alt={imagepreview.image3} className="payment-img"/>)}
                    </div>
                    
                </div>
                    <div className="row justify-content-center">
                        <div className="inventory-form">
                            <p className={message.msgclas}>{message.msg}</p>
                            <div className="form-group">
                                <label>Item name</label>
                                <input type="text" className="form-control" placeholder={item.item_name} name="name" onChange={onChange}/>
                            </div>
                            <div className="form-group">
                                <label>Item Description</label>
                                <textarea rows="5" placeholder={item.item_description} className="form-control" name="desc" onChange={onChange}/>
                            </div>
                            <div className="form-group">
                                <label>Item Condition</label>
                                <select className="form-control" onChange={onChange} name="cond">
                                    <option value="">{item.item_condition}</option>
                                     <option value="Used">Used</option>
                                    <option value="Slightly Used">Slightly Used</option>
                                    <option value="BrandNew">BrandNew</option>
                                </select>
                            </div>
                            <div className="row">
                            <div className="col-md-6">      
                                 <div className="form-group">
                                    <label>Item Category</label>
                                    <select className="form-control" onChange={onChange} name="catg" >
                                            <option value="">{item.item_category}</option>
                                            <Category/>
                                    </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                    <div className="form-group">
                                    <label>Original Price of Item</label>
                                        <input type="number" placeholder={item.item_orig_price} className="form-control" name="prc" onChange={onChange}/>
                                </div>
                              </div>
                           </div>
                           <div className="row">
                               <div className="col-md-6">
                                   <div className="form-group">
                                       <label>Item Quantity</label>
                                        <input type="number" className="form-control" name="qty" placeholder={item.item_quantity} onChange={onChange}/>
                                   </div>
                               </div>
                               
                               <div className="col-md-6">
                                    <p style={{paddingTop:30}} className="text-secondary">piece/s available</p>
                               </div>
                           </div>
 
                        </div>        
                    </div>
            <DialogActions>
                <button className="btn btn-primary" onClick={save}>save</button>
                <button className="btn btn-danger" onClick={()=>setupdate(false)}>close</button>
            </DialogActions>
        </Dialog>        
    )
}

export default UpdateItem
