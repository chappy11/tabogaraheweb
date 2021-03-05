import React,{useState,useEffect}from 'react'
import {useParams} from 'react-router-dom';
import model from './model/AdminModel';
import Asidebar from './navigation/Asidebar'
import Atopnav from './navigation/Atopnav'
import {ServerUrl as url} from '../ServerUrl';
function CheckItem() {
    const {item_id,user_id} = useParams();
    const [item, setitem] = useState({})
    const [imglg, setimglg] = useState("");
    const [imgs, setimgs] = useState([])
    useEffect(() => {
    const getdata = async()=>{
           const data = await model.viewItem(item_id).then(res=>{
                return res.data.data[0];
           }).catch(err=>console.log(err))
           setitem(data);
           setimglg(url+data.item_pic1);
           setimgs([url+data.item_pic1,url+data.item_pic2,url+data.item_pic3])
        }
        getdata();
    }, [])
   
    //console.log(imgs)
    return (
        <div>
        <Asidebar/>
        <Atopnav/>
        <div className="sidebody">
            <div className="item-container mx-auto shadow">
                    <h5 className="text-info center">Item Info</h5>
                    <div className="row">
                        <div className="col-md-6">
                            
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
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Name<span className="float-right">:</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p>{item.item_name}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Description<span className="float-right">:</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p>{item.item_description}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Category<span className="float-right">:</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p>{item.item_category}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Original Price<span className="float-right">:</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p>{item.item_orig_price+".00"}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Quantity<span className="float-right">:</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p>{item.item_quantity+" "+item.item_unit}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Date added<span className="float-right">:</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p>{item.date_added}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <button className="btn btn-success ">accept</button>
                                </div>
                                <div className="col-sm-4">
                                    <button className="btn btn-danger">decline</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>           
        </div>
    )
}

export default CheckItem
