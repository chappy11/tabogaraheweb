import React, { useEffect, useState } from 'react'
import model from './admin/model/AdminModel';
function Categorydata() {
    const [categories, setcategories] = useState([]);
    
    useEffect(() => {
        getCategories();
    }, [])    
    const getCategories = ()=>{
        model.getcategory().then(res=>{
            if(res.data.status===1){
                setcategories(res.data.data);
            }else{

            }
        })
    }
    return (<>{categories.map((val,i)=>(
        <option value={val.category}>{val.category}</option>
    ))}</>)
    }


export default Categorydata
