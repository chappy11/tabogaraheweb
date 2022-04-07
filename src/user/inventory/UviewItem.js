/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import Usersidenav from '../navigation/Usersidenav'
import Utopnav from '../navigation/Utopnav'
import {useParams,useHistory} from 'react-router-dom';
import buyermodel from '../../buyer/model/Buyer_Model'
import model from '../model/Usermodel';
import {ServerUrl as url} from '../../ServerUrl';
//import {Categorydata as catg} from '../../Categorydata';
import {Unitdata as unt} from '../../Unitdata';
import {Message as mess} from '../../Message';
import ProductDialog from '../product/ProductDialog';
import Categorydata from '../../Categorydata';
import UpdateItem from './UpdateItem';
import ProductInfo from './ProductInfo';
function UviewItem() {
    const history = useHistory();
    const {item_id} = useParams();
    const [isload, setisload] = useState(false);
    const [open, setopen] = useState(false);
    const [item, setitem] = useState({})
    const [imglg, setimglg] = useState("");
    const [imgs, setimgs] = useState([])
    const [update, setupdate] = useState(false);
    const [message, setmessage] = useState({msg:"",cName:""})
    const [updated, setupdated] = useState({
        id:"",
        name:"",
        desc:"",
        category:"",
        orig_price:"",
        quantity:"",
        unit:""
    })
    const cleart = () =>{
        setTimeout(() => {
            setmessage({msg:"",cName:""});
        }, 5000);
    }
    useEffect(() => {
    const getdata = async()=>{
           const data = await model.getItem(item_id).then(res=>{
                return res.data.data[0];
           }).catch(err=>console.log(err))
           setitem(data);
           setimglg(url+data.item_pic1);
           setimgs([url+data.item_pic1,url+data.item_pic2,url+data.item_pic3])
        }
        getdata();
    }, [open,isload,update])
    const onChange = (e) =>{
        setupdated({...updated,[e.target.name]:e.target.value})
    }

    const save = () =>{
        model.update(updated).then(res=>{
            if(res.data.status===1){
                setmessage({msg:res.data.message,cName:mess[0]})
                cleart();
            }else{
                setmessage({msg:res.data.message,cName:mess[1]});
                cleart();
            }
        }).catch(err=>console.log(err));
    }
    
    const handleopen = () =>{
        if(item.item_quantity==0){
            setmessage({msg:"You cannot add garage if its out stock",cName:mess[1]})
            cleart();
        }else{
            setopen(true);
        }
        
    }

    const handleclose =()=>{
        setopen(false);
    }

    const remove =()=>{
        buyermodel.removeproduct(item_id).then(res=>{
            if(res.data.status===1){
                setmessage({msg:res.data.message,cName:mess[0]})
                cleart();
                setisload(!isload)
            }else{
                setmessage({msg:res.data.message,cName:mess[1]});
                cleart()
            }
        })
    }

    const deleteitem = () =>{
        model.removeitem(item_id).then(res=>{
            if(res.data.status===1){
                alert("Successfully Removed!");
                window.location.pathname="/userinventory";
            }else{
                alert("error while removing");
            }
        })
    }
    return (
        <div>
            <Utopnav/>
            
            <ProductDialog handleopen={handleopen} item={item} open={open} handleclose={handleclose}/><Usersidenav/>
           <UpdateItem update={update} setupdate={setupdate} item={item}/>
            <div className="sideuser">
            <div className="margin-content"></div>
            <div className="heading">
                    <h1 className="lead">Item Information</h1>
                    <div className="btn-group">
                          
                            {/* {item.item_status === 'validated' ? (
                                <>
                                 
                                </>
                            ):( 
                                
                            )} */}
                            {item.item_status==="validated" &&
                                <button className="btn btn-primary" onClick={()=>setopen(true)}>Add to Garage</button>
                            }
                            {item.item_status==="toValidate" &&
                                <button className="btn btn-info" onClick={()=>setupdate(true)}>Edit Item</button>
                            }
                           {item.item_status === "garage" ?(
                               <button className="btn btn-danger" onClick={remove}>Remove from Garage</button>
 
                           ):(
                            <button className="btn btn-danger" onClick={deleteitem}>Remove from Inventory</button>
                           )}
                                                       
                    </div>
            </div>
                <div className="row justify-content-center mt-3">
                        <div className="item-container mb-3">
                            <div className="row">
                                <div>
                                    <img src={imglg} className="img-lg" alt={imglg}/>
                                    <div className="row  justify-content-center">
                                    {imgs.map((val,i)=>(
                                        <img src={val} alt={val} onClick={()=>setimglg(val)} className="img-sm m-2" key={i.toString()}/>
                                    ))}
                                    </div>
                                </div>
                                <div className="ml-3" style={{display:'flex',flex:'1',flexDirection:'column'}}>
                                    {item.item_status==='toValidate' ? (
                                        <p className="text-danger">Note: The approval of the item is on process, please wait.</p>
                                    ):null}
                                    <h4 >{item.item_name}</h4>
                                    <p className="ml-3 text-secondary">{item.item_description}</p>
                                    <div className="ml-3">
                                        {item.item_status==='garage' &&
                                             <ProductInfo item_id={item.item_id} status={item.item_status} />
                                        }
                                       
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <label className="text-secondary" style={{fontSize:'15px'}}>Original Price: </label>
                                            </div>
                                            <div className="col">
                                                <p className=" ml-3" style={{fontSize:'15px'}}><span>&#8369;</span>{item.item_orig_price+".00"}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <label className="text-secondary" style={{fontSize:'15px'}}>Item Category: </label>
                                            </div>
                                            <div className="col">
                                                <p className=" ml-3" style={{fontSize:'15px'}}>{item.item_category}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <label className="text-secondary" style={{fontSize:'15px'}}>Item Quantity: </label>
                                            </div>
                                            <div className="col">
                                                <p className=" ml-3" style={{fontSize:'15px'}}>{item.item_quantity+" "+item.item_unit}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <label className="text-secondary" style={{fontSize:'15px'}}>Date Added: </label>
                                            </div>
                                            <div className="col">
                                                <p className=" ml-3" style={{fontSize:'15px'}}>{item.date_added}</p>
                                            </div>
                                        </div>



                                   
                                        
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                  
                </div>
        </div>
    )
}

export default UviewItem
