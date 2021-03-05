/* eslint-disable eqeqeq */
import React from 'react'
import {Categorydata as cat} from '../../Categorydata';
import {useParams} from 'react-router-dom';

function BuyerSidebar() {
    const { category} = useParams();
 
    return (
        <div className="buyersidebar">
            <ul className="categorylist">
                {cat.map((val,i)=>(
                    <li key={i} id={val==category ? "active" : ""} onClick={()=>i===0 ? window.location.pathname="/user" : window.location.pathname="/category/"+val}  className="catitem">{i===0 ? "all" : val}</li>
                ))}
            </ul>
        </div>
    )
}

export default BuyerSidebar
