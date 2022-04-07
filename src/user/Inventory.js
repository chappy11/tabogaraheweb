import React, { useEffect, useState } from 'react';
import { ServerUrl as url } from '../ServerUrl';
import AddInventory from './inventory/AddInventory';
import Additem from './inventory/Additem';
import model from './model/Usermodel';
import Usersidenav from './navigation/Usersidenav';
import Utopnav from './navigation/Utopnav';
function Inventory() {
    const [isLoad, setisLoad] = useState(false);
    const [showMess, setshowMess] = useState(false);
    const [item, setitem] = useState([]);
    const [counter, setcounter] = useState(0);
    const id = JSON.parse(localStorage.getItem("user")).id;
    useEffect(() => {
    getItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const getItem = ()=>{
           let inter = setInterval(() => {
               model.myitem(id).then(res=>{
                   if(res.data.status===1){
                        setitem(res.data.data);
                        setshowMess(false)
                    }else{
                       setshowMess(true)
                        setitem([]);
                    }
               })
           }, 1000); 
           return inter;
        }
    
    return (
        <>
            <Utopnav/>
            <Usersidenav/>         
            <div className="sideuser">
                <div className="margin-content">        
                <div className="heading">
                    <h1 className="  lead"></h1>
                    <Additem/>
                </div>
                {showMess ? (<p className="text-danger center">No Item</p>):""}
                <div className="row mt-3">
                    {item.map((val,i)=>(
                        <div key={i} className="col-sm-3" >
                            <div className={val.item_status==="validated" ? "product_card mx-auto shadow-lg ":"product_card mx-auto shadow-lg "} onClick={()=> window.location.pathname="/uviewitem/"+val.item_id}>
                            <img src={url+val.item_pic1} alt={val.item_pic1} className={val.item_status==="validated" ? "product_pic mx-auto d-block":"product_pic mx-auto d-block toValidate"}/>
                                <div className="product-info">
                                
                                    {val.item_status!=="toValidate" ? (
                                        <>
                                        <div className="product-price">{val.item_name}</div>      
                                        </>
                                    ):(<p className="text-center text-danger" style={{fontSize:14}}>Note: The approval of the item is on process</p>)}
                                </div>
                            </div>
                        </div>
                    ))}
                    </div> 
                    </div>
                    </div>
      </>
    )
}

export default Inventory
