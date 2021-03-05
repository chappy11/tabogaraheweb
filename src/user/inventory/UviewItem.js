/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import Usersidenav from '../navigation/Usersidenav'
import Utopnav from '../navigation/Utopnav'
import {useParams,useHistory} from 'react-router-dom';
import buyermodel from '../../buyer/model/Buyer_Model'
import model from '../model/Usermodel';
import {ServerUrl as url} from '../../ServerUrl';
import {Categorydata as catg} from '../../Categorydata';
import {Unitdata as unt} from '../../Unitdata';
import {Message as mess} from '../../Message';
import ProductDialog from '../product/ProductDialog';
function UviewItem() {
    const history = useHistory();
    const {item_id} = useParams();
    const [isload, setisload] = useState(false);
    const [open, setopen] = useState(false);
    const [item, setitem] = useState({})
    const [imglg, setimglg] = useState("");
    const [imgs, setimgs] = useState([])
    const [isupdate, setisupdate] = useState(false);
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
    }, [isupdate,open,isload])
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
        setopen(true);
    }

    const handleclose =()=>{
        setopen(false);
    }

    const remove =(item_id)=>{
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
    return (
        <div>
            <Utopnav/>
            <Usersidenav/>
            <div className="sideuser">
            <ProductDialog handleopen={handleopen} item={item} open={open} handleclose={handleclose}/>
            <div className="user-item-container mx-auto shadow" style={{marginTop:"100px"}}>
                    <h5 className="text-info center">Item Info</h5>
                    <div className="row">
                        <div className="col-md-5">
                                <img src={imglg} alt={imglg} className="img-lg mx-auto d-block"/>
                            <br></br>
                            <div className="row mx-auto">
                                {imgs.map((val,i)=>(
                                    <div className="col-sm-4" key={i} onClick={()=>{setimglg(val)}} value={i}>
                                        <img src={val} alt={val} className="img-sm-box"/>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-7">
                                    <p className={message.cName}>{message.msg}</p>
                            <div className="row">
                                <div className="col-md-4">
                                    <p>Name<span className="float-right">:</span></p>
                                </div>
                                <div className="col-md-8">
                                    {isupdate?(<input className="form-control form-control-sm" name="name" onChange={onChange} placeholder={item.item_name} />):(<p>{item.item_name}</p>)}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p>Description<span className="float-right">:</span></p>
                                </div>
                                <div className="col-md-8">
                                {isupdate?(<textarea className="form-control " rows="4" name="desc" placeholder={item.item_description} onChange={onChange} />):(<p>{item.item_description}</p>)}
                                </div>
                            </div>
                            {isupdate ? (<br></br>):null}
                            <div className="row">
                                <div className="col-md-4">
                                    <p>Category<span className="float-right">:</span></p>
                                </div>
                                <div className="col-md-8">
                                {isupdate ? (
                                    <>
                                    
                                    <select className="form-control form-control-sm" onChange={onChange} name="category">
                                        {catg.map((val,i)=>(
                                            <option value={i===0 ? item.item_category:val} key={i}>{i===0 ? item.item_category:val}</option>
                                        ))}
                                    </select>
                                    </> ) :(<p>{item.item_category}</p>)}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p>Original Price<span className="float-right">:</span></p>
                                </div>
                                <div className="col-md-8">
                                {isupdate?(<input  type="number" name="orig_price" className="form-control form-control-sm" onChange={onChange} placeholder={item.item_orig_price}/>):(<p>{item.item_orig_price}</p>)}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p>Quantity<span className="float-right">:</span></p>
                                </div>
                                <div className="col-md-8">
                                {item.item_status==="garage" ? (
                                    <>
                                    <p>{item.item_quantity+" "+item.item_unit}</p>
                                    </>
                                ):(
                                    <>
                                    {isupdate?(
                                <>
                                    <div className="row">
                                        <div className="col-sm-7">
                                            <input type="number" placeholder={item.item_quantity} name="quantity" onChange={onChange} className="form-control form-control-sm"/> 
                                        </div>
                                        <div className="col-sm-5">
                                            <select className="form-control form-control-sm" name="unit" onChange={onChange}>
                                            {unt.map((val,i)=>(
                                                <option value={i===0 ? item.item_unit:val} key={i}>{i===0 ? item.item_unit:val}</option>
                                            ))}
                                            </select> 
                                        </div>
                                    </div>
                                    </>
                                    ):(<p>{item.item_quantity+" "+item.item_unit}</p>)}

                                        </>
                                    )}
                                
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p>Date added<span className="float-right">:</span></p>
                                </div>
                                <div className="col-md-8">
                                    <p>{item.date_added}</p>
                                </div>
                            </div>
                            {!isupdate?(
                                <>
                                    <div style={{margin:"0 30px"}}>
                                    {item.item_status !=="garage" ? (<button className="btn btn-success btn-block" onClick={handleopen}>Add to Garage</button>):null}
                                    {item.item_status !== "garage" ? (<button className="btn btn-primary btn-block" onClick={()=>{setisupdate(true); setupdated({...updated,id:item.item_id})}}>update</button>)
                                    :(<button className="btn btn-danger btn-block"onClick={()=>remove(item.item_id)}>Remove from Garage</button>)}
                                    <button className="btn btn-danger btn-block" onClick={()=>history.goBack()}>back</button>
                                    </div>
                                </>
                            ):(
                                <div className="row">
                                <div className="col-sm-4">
                                
                                    <button className="btn btn-success" onClick={save}>save</button>
                                </div>
                                <div className="col-sm-4">
                                    <button className="btn btn-danger" onClick={()=>setisupdate(false)}>back</button>
                                </div>
                            </div>
                            )}
                            
                        </div>
                    </div>
            </div>

            </div>
        </div>
    )
}

export default UviewItem
