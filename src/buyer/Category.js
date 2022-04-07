import React, { useState,useEffect } from 'react'
import {useParams} from 'react-router-dom';
import BuyerSidebar from '../user/navigation/BuyerSidebar';
import Utopnav from '../user/navigation/Utopnav';
import model from './model/Buyer_Model'
import {ServerUrl, ServerUrl as url} from '../ServerUrl';
function Category() {
    const {category} = useParams();
    const [product, setproduct] = useState([]);
    const [catg, setcatg] = useState({});
    const store = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        getproduct();
        getcategory();
    }, [])
    
    const getproduct =() =>{
        model.category(category,store.id).then(res=>{
            if(res.data.status===1){
                setproduct(res.data.data);  
            }
            
        })
    }

    const getcategory = () =>{
        model.current_category(category).then(res=>{
         
            if(res.data.status===1){
                setcatg(res.data.data[0]);
            }
        })    
    }
    return (
        <div>
        <Utopnav/>
        <BuyerSidebar/>
            <div className="categoryside">
                <div className="row align-items-center" style={{marginTop:'100px'}}>
                        <img src={ServerUrl+catg.cat_pic} style={{width:'200px',height:'200px'}} className="rounded-circle" alt={catg.cat_pic}/>
                        <h1 className="display-4 ml-3">{catg.category}</h1>
                </div> 
                <div className="row">
                    {product.map((val,index)=>(
                        <div className="col-sm-3 mt-3" key={index} onClick={()=>window.location.pathname="/visitgarage/"+val.garage_id}>
                            <div className="product_card mx-auto shadow-lg">
                                <img src={url+val.item_pic1} alt={val.item_pic1} className="product_pic mx-auto d-block"/>
                                <div classname="product-info">
                                    <div className="prdouct-price" style={{lineHeight:"1.2"}}>{"\u20B1 " + parseInt(val.sellprice).toFixed(2)}</div>
                                    <div style={{lineHeight:1.2}}>{val.item_name}</div>
                                    <div className="text-info">{val.garage_name}</div>
                                </div>
                            </div>
                        </div>     
                    ))}
                   
                </div>
            </div>     
        </div>
    )
}

export default Category
