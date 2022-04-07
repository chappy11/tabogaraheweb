import React,{useState,useEffect} from 'react'
import Asidebar from './navigation/Asidebar'
import Atopnav from './navigation/Atopnav'
import model from './model/AdminModel';
import {ServerUrl as url} from '../ServerUrl';
function Itemlist() {
    const [items, setitem] = useState([]);
    const [showmess, setshowmess] = useState(false);
    const [isload, setisload] = useState(false);
    useEffect(() => {    
        getItem();        
        setInterval(() => {
            getItem();
        }, 10000);
    
    }, [])


    const getItem = async() =>{
        const data=  await model.getItems().then(res=>{
                return res.data;
        }).catch(err=>{
            console.log(err);
        });
            if(data.status===0){
                setshowmess(true);
            }else{
                setshowmess(false);
                setitem(data.data);
            }
    }

    const accept = (e) =>{
        e.preventDefault();
        const id = e.target.value;
        setisload(true);
        model.acceptItem(id,"validated").then(res=>{
            if(res.data.status===1){
                setitem(items.filter(res => res.item_id!==id));
            }else{
                setisload(false);
            }
        })
        
    }
    
    return (
        <div>
            <Asidebar/>
            <Atopnav/>
            <div className="sidebody">
                <div className="container-box">
                    <div className="d-flex">
                        <div className="mr-auto p-1 "><h5>Item list</h5></div>
                        <div className="p-1"><input type="text" className="form-control"/></div>
                        <div className="p-2"><button className="btn btn-outline-primary btn-sm">search</button></div>
                    </div>
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th className="text-center"></th>
                                <th className="text-center font-color-primary">Name</th>
                                <th className="text-center font-color-primary">Quantity</th>
                                <th className="text-center font-color-primary">Owner</th>
                                <th className="text-center fonnt-color-primary">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((val,i)=>(
                                <tr key={i}>
                                    <td className="text-center"><img src={url+val.item_pic1} alt={val.item_pic1} className="tbl-img rounded-circle"/></td>
                                    <td className="text-center"><a href={`/checkitem/${val.item_id}/${val.acnt_id}`}>{val.item_name}</a></td>
                                    <td className="text-center">{val.item_quantity+" "+val.item_unit}</td>
                                    <td className="text-center">{val.firstname+" "+val.lastname}</td>
                                    <td className="text-center">
                                        <button className="btn btn-outline-success btn-sm" onClick={accept} value={val.item_id}>accept</button>{" "}
                                        <a href={"/decline/"+val.item_id+"/"+val.acnt_id} className="btn btn-outline-danger btn-sm">decline</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showmess ? (<p className="text-danger center">No item</p>):""}
                </div>
            </div>
        </div>
    )
}

export default Itemlist
