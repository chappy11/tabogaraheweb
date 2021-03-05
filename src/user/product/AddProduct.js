import React,{useState,useEffect} from 'react'
import model from '../model/Usermodel';
import {ServerUrl as url} from '../../ServerUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import ProductDialog from './ProductDialog';
function AddProduct({garage_id}) {
    const store = JSON.parse(localStorage.getItem("user"));
    const [items, setitems] = useState([]);
    const [item, setitem] = useState({});
    const [open, setopen] = useState(false);
    
    useEffect(() => {
        model.getvalidated(store.id).then(res=>{
            setitems(res.data.data);
        })
    }, [open])
    const addprod = async(e) =>{
        let id = e.target.value;
        const filtered = items.filter(res=> res.item_id===id);
        const data = setitem(filtered[0]);
        setopen(true)
        return data;
    }
    const handleclose=()=>{
        
        setopen(false)
    }
    return (
        <div>
            <ProductDialog open={open} item={item} setopen={setopen} handleclose={handleclose} garage_id={garage_id} />
            <table className="table table-border">
                <thead>
                    <tr>
                        <th> </th>
                        <th>Name</th>
                        <th>Orig Price</th>       
                        <th>Quantity</th>                            
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((val,idx)=>(
                        <tr key={idx}>
                            <td><img src={url+val.item_pic1} alt={val.item_pic1} className="tbl-img rounded-circle"/></td>
                            <td><a href={`/uviewitem/${val.item_id}`}>{val.item_name}</a></td>
                            <td>{val.item_orig_price}</td>
                            <td>{val.item_quantity+" "+val.item_unit}</td>
                            <td><button className="btn btn-primary" onClick={()=>window.location.pathname="/uviewitem/"+val.item_id}>Check item</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default AddProduct
