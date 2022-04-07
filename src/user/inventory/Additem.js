import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, DialogActions, DialogContent, DialogTitle, Icon } from '@material-ui/core'
import React, { useState } from 'react'
import {Unitdata as un} from "../../Unitdata";
import Category from "../../Categorydata";
import model from '../model/Usermodel';
import {Message as msgs} from '../../Message';
function Additem() {
    const [open, setopen] = useState(false);
    const id = JSON.parse(localStorage.getItem('user')).id
    const [data, setdata] = useState({
        pic1:null,
        pic2:null,
        pic3:null,
        name:'',
        descp:'',
        cond:'',
        catg:'',
        prc:'',
        qty:'',
        unt:''
        
    })
    const [message, setmessage] = useState({
        msg:'',
        msgclas:''
    })
    const [imagepreview, setimagepreview] = useState({
        image1:null,
        image2:null,
        image3:null
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
     
    const onChange = (e) =>{
        setdata({...data,[e.target.name]:e.target.value});
    }
    const clear = () =>{
        setTimeout(() => {
            setmessage({msg:"",msgclas:""});     
        }, 3000);
    }
    const save = () =>{
        if(data.pic1==null || data.pic2==null || data.pic3 == null){
            setmessage({msg:'Please complete the 3 images',msgclas:msgs[1]});
            clear();
        }else{
        let fd = new FormData();
        fd.append('id',id);
        fd.append('img1',data.pic1,data.pic1.name);
        fd.append('img2',data.pic2,data.pic2.name);
        fd.append('img3',data.pic3,data.pic3.name);
        fd.append('name',data.name);
        fd.append('desc',data.descp);
        fd.append('category',data.catg);
        fd.append('orig_price',data.prc);
        fd.append('quantity',data.qty);
        fd.append('unit',data.unt);
        fd.append('cond',data.cond);
            model.add(fd).then(res=>{
                let resp = res.data;
                if(resp.status===1){
                    setmessage({msg:resp.message,msgclas:msgs[0]});
                    setimagepreview({image1:null,image2:null,image3:null});
                    clear();
                }else{
                    setmessage({msg:resp.message,msgclas:msgs[1]});
                }
            })
        }
    }
 
    return (
        <>
        <button className="btn btn-primary" onClick={()=>setopen(true)}>Add Item</button>
        <Dialog open={open} onClose={()=>setopen(false)} fullScreen={true}>
           
                 <DialogContent>
                       <div className="row justify-content-center">
                        <div className="img-box m-3" onClick={img1}>
                            {imagepreview.image1==null ?(
                                <>
                                    <div className="disp">
                                    <FontAwesomeIcon icon={faCamera} fontSize={12}/>         
                                    </div>
                                </>
                            ):(
                                <>
                                    <img src={imagepreview.image1} className="payment-img" alt={imagepreview}/>
                                </>
                            )}
                        </div>
                        <div className="img-box m-3" onClick={img2}>
                            {imagepreview.image2==null ?(
                                <>
                                    <div className="disp">
                                    <FontAwesomeIcon icon={faCamera} fontSize={12}/>         
                                    </div>
                                </>
                            ):(
                                <>
                                    <img src={imagepreview.image2} className="payment-img" alt={imagepreview}/>
                                </>
                            )}
                        </div>
                        <div className="img-box m-3" onClick={img3}>
                            {imagepreview.image3==null ?(
                                <>
                                    <div className="disp">
                                    <FontAwesomeIcon icon={faCamera} fontSize={12}/>         
                                    </div>
                                </>
                            ):(
                                <>
                                    <img src={imagepreview.image3} className="payment-img" alt={imagepreview}/>
                                </>
                            )}
                        </div>
                          
                        <input type="file"  id='file' ref={inputfile1} onChange={onchangeimg1} style={{display:'none'}}/>
                        
                        <input type="file"  id='file' ref={inputfile2} style={{display:'none'}} onChange={onchangeimg2}/>
                        
                        <input type="file"  id='file' ref={inputfile3} style={{display:'none'}} onChange={onchangeimg3}/>
                            <div className="inventory-form">
                              <p className={message.msgclas}>{message.msg}</p>
                                <div className="form-group">
                               <label>Name</label>
                                <input type="text" className="form-control" placeholder="Item Name" name="name" onChange={onChange}/>
                           </div>
                           <div className="form-group">
                               <label>Description</label>
                                <textarea type="text" className="form-control" placeholder="Item Description" name="descp"  rows="4" onChange={onChange}/>
                           </div>
                           <div className="form-group">
                               <label>Item Condition</label>
                                <select className="form-control" name="cond"  onChange={onChange}>
                                    <option value="">Choose Item Condition</option>
                                    <option value="Used">Used</option>
                                    <option value="Slightly Used">Slightly Used</option>
                                    <option value="Brand New">Brand New</option>
                                </select>
                           </div>
                           <div className="row">
                            <div className="col-md-6">      
                                 <div className="form-group">
                                    <label>Category</label>
                                    <select className="form-control" onChange={onChange} name="catg" >
                                            <option value="">Choose Category</option>
                                            <Category/>
                                    </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                    <div className="form-group">
                                    <label>Original Price</label>
                                        <input type="number" className="form-control" name="prc" onChange={onChange}/>
                                </div>
                              </div>
                           </div>
                           <div className="row">
                               <div className="col-md-6">
                                   <div className="form-group">
                                       <label>Quantity</label>
                                        <input type="number" className="form-control" name="qty" onChange={onChange}/>
                                   </div>
                               </div>
                               
                               <div className="col-md-6">
                                   <p style={{paddingTop:30,fontSize:15}} className="text-secondary">piece/s available</p>
                               </div>
                           </div>
                           
                                
                            </div>
                        </div>
                        
                    </DialogContent>
            <DialogActions>
                <button className="btn btn-primary" onClick={save}>Save</button>
                <button className="btn btn-danger" onClick={()=>setopen(false)}>Close</button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default Additem
