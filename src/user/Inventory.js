import React,{useState,useEffect} from 'react'
import AddInventory from './inventory/AddInventory';
import Usersidenav from './navigation/Usersidenav'
import Utopnav from './navigation/Utopnav'
import model from './model/Usermodel';
import {ServerUrl as url} from '../ServerUrl';
function Inventory() {
    const [isLoad, setisLoad] = useState(false);
    const [showMess, setshowMess] = useState(false);
    const [item, setitem] = useState([]);
    const [counter, setcounter] = useState(0);
    const id = JSON.parse(localStorage.getItem("user")).id;
    useEffect(() => {
    getItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoad]);
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
           }, 3000); 
           return inter;
        }
    
    return (
        <div>
            <Utopnav/>
            <Usersidenav/>
         
            <div className="sideuser">
                <div className="margin-content">
                <div className="d-flex">
                    <div className="mr-auto p-2"><h3 className="p-2">Inventory</h3></div>
                    <div className="p-2"><AddInventory setisLoad={setisLoad} /></div>
                </div>
                {showMess ? (<p className="text-danger center">No Item</p>):""}
                <div className="row">
                {item.map((val,i)=>(
                    <div key={i} className="col-sm-3" >
                        <div className={val.item_status==="validated" ? "product_card mx-auto shadow-lg ":"product_card mx-auto shadow-lg toValidate"} onClick={()=> val.item_status==="toValidate" ? "":window.location.pathname="/uviewitem/"+val.item_id}>
                           <img src={url+val.item_pic1} alt={val.item_pic1} className="product_pic mx-auto d-block"/>
                            <div className="product-info">
                              
                                {val.item_status!=="toValidate" ? (
                                    <>
                                      <div className="product-price">{val.item_name}</div>      
                                    </>
                                ):(<p className="text-center text-info">This item is currently not accpeted by the admin pls wait</p>)}
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                </div>
            </div>
        </div>
    )
}

export default Inventory
