import React, { useEffect, useState } from 'react'
import Utopnav from '../user/navigation/Utopnav'
import {useParams} from 'react-router-dom';
import model from '../buyer/model/Buyer_Model';
import usermodel from '../user/model/Usermodel';
import {ServerUrl as url} from "../ServerUrl";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Otherlist from './productlist/Otherlist';
import {Message as mess} from '../Message';
import NegotiableDialog from './NegotiableDialog';
import Request from './negotiable/Request';
function ViewProduct() {
    const store =  JSON.parse(localStorage.getItem("user"));
    const {product_id} = useParams();
    const [product, setproduct] = useState({});
    const [others, setothers] = useState([]);    
    const [img, setimg] = useState("");    
    const [imgs, setimgs] = useState([]);
    const [haveorder, sethaveorder] = useState(false);
    const [isload, setisload] = useState(false)
    const [negstat, setnegstat] = useState("");
    const [openneg, setopenneg] = useState(false);
    const [isrequest, setrequest] = useState(false);
    const [message, setmessage] = useState({
        msg:"",
        cName:""
    });
    useEffect(() => {
        getproduct();
        getother();
        hasorder();
       }, [isload,haveorder])
    
       const getproduct = () =>{
        model.getproduct(product_id).then(res=>{
            setproduct(res.data.data[0]);
            setisload(true);
        })
        setimg(product.item_pic1);
        setimgs([product.item_pic1,product.item_pic2,product.item_pic3]);
    }
    
    const getother = async() =>{
      let data = await  usermodel.availableproduct(product.garage_id).then(res=>{
                return res.data.data;
        })
        setothers(data);
    }
    const hasorder = () =>{
        model.haveorder(store.id,product.garage_id).then(res=>{
            if(res.data.status===1){
                sethaveorder(true);
            }else{
                sethaveorder(false);
            }
        })
    }
    function filt(data){
        return (data || []).filter(res=>res.product_id!==product_id);
    }
    const setcleart = () =>{
        setTimeout(() => {
            setmessage({msg:"",cName:""})       
        }, 5000);
    }
    const addtocart =(e) =>{
        e.preventDefault();
        const dat ={
            "product_id":product_id,
            "garage_id":product.garage_id,
            "buyer_id":store.id,
        }
        model.addtocart(dat).then(res=>{
            if(res.data.status===1){
                setmessage({msg:res.data.message,cName:mess[0]})
                setcleart();
                setTimeout(() => {
                    window.location.pathname="/visitgarage/"+product.garage_id;
                }, 2000);
            }else{
                setmessage({msg:res.data.message,cName:mess[1]})
                setcleart();
            }
        })
    }
    return (
        <div >
            <Utopnav/>
            <NegotiableDialog openneg={openneg} setopenneg={setopenneg} product={product}/>
            <div className="buyerviewitem">
                <div className="row buyerviewitemcontainer" >
                    <div className="col-md-8">
                        <div className="mx-auto">
                                <div className="row justify-content-center">
                                    <div className="col-md-5">
                                        <img src={url+img} alt={product.item_pic1} className="img-lg mx-auto d-block"/>
                                        <div className="row mx-auto">
                                            {imgs.map((val,index) => (
                                                <div className="col-sm-4" key={index}>
                                                    <img src={url+val} alt={val} onClick={()=>setimg(val)} className="img-sm-box"/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-md-6 ml-3">
                                        <p className={message.cName}>{message.msg}</p>
                                        <h4>{product.item_name}</h4>
                                        <p className="text-secondary">{product.item_description}</p>
                                          <div className="row">
                                            <div className="col-md-4">
                                                <label className="text-secondary">Original Price</label>
                                            </div>
                                            <div className="col-md-8">
                                                <p className="text-danger"><del>&#x20B1; {product.item_orig_price+".00"}</del></p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label className="text-secondary">Sell Price</label>
                                            </div>
                                            <div className="col-md-8">
                                                <p className="">&#x20B1; {product.sellprice}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label className="text-secondary">Item Condition</label>
                                            </div>
                                            <div className="col-md-8">
                                                <p >{product.item_condition}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label className="text-secondary">Total left</label>
                                            </div>
                                            <div className="col-md-8">
                                                <p >{product.item_quantity+" "+product.item_unit}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label className="text-secondary">Category</label>
                                            </div>
                                            <div className="col-md-8">
                                                <p >{product.item_category}</p>
                                            </div>
                                        </div>
                                       {haveorder ? (<p className="text-danger">Note: Please complete your current transaction first</p>):(
                                        <>
                                        {product.selltype==="negotiable" ? (
                                          <>
                                            <Request product_id={product_id} setopenneg={setopenneg} addtocart={addtocart}/>
                                         </>
                                        ):(
                                           
                                            <button className="btn btn-primary btn-block" onClick={addtocart}>Add to Cart</button>
                                              
                                            )}
                                          </>
                                            )}
                                        <button className="btn btn-danger btn-block mt-3" onClick={()=>window.location.pathname="/visitgarage/"+product.garage_id}>Back</button>
                                    </div>
                                </div>                            
                        </div>
                    </div>
                    <div className="col-md-4">
                        <Otherlist others={filt(others)}/>
                    </div>
                </div>
            </div>
            
 
        </div>
    )
}

export default ViewProduct
