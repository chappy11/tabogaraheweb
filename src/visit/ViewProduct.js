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
    const [isload, setisload] = useState(false)
    const [openneg, setopenneg] = useState(false);
    const [message, setmessage] = useState({
        msg:"",
        cName:""
    });
    useEffect(() => {
        getproduct();
        getother();
       }, [isload])
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
            }else{
                setmessage({msg:res.data.message,cName:mess[1]})
                setcleart();
            }
        })
    }
    return (
        <div>
            <Utopnav/>
            <NegotiableDialog openneg={openneg} setopenneg={setopenneg} product={product}/>
            <div className="visit-container g-margin">
                <div className="row viewproduct ">
                    <div className="col-md-8">
                        <div className="mx-auto  shadow product-container">
                                <div className="row">
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
                                    <div className="col-md-7">
                                        <p className={message.cName}>{message.msg}</p>
                                        <h4>Item Information</h4>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <p>Name</p>
                                            </div>
                                            <div className="col-md-8">
                                                <p>{product.item_name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <p>Description</p>
                                            </div>
                                            <div className="col-md-8">
                                                <p>{product.item_description}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <p>Orig Price</p>
                                            </div>
                                            <div className="col-md-8">
                                                <p className=""><del>&#x20B1; {product.item_orig_price+".00"}</del></p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <p>Sell Price</p>
                                            </div>
                                            <div className="col-md-8">
                                                <p>&#x20B1; {product.sellprice}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <p>Total left</p>
                                            </div>
                                            <div className="col-md-8">
                                                <p>{product.item_quantity+" "+product.item_unit}</p>
                                            </div>
                                        </div>
                                        {product.selltype==="negotiable" ? (
                                            <>
                                                        <Request setopenneg={setopenneg} product_id={product_id}/>      
                                                        <p className="text-center">OR</p>
                                            </> 
                                        ):null}
                                        <button className="btn btn-primary btn-block" onClick={addtocart}><FontAwesomeIcon icon={faCartPlus}/>Add to cart </button>
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
