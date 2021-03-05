import React, { useEffect, useState } from 'react'
import {ServerUrl as url} from '../../ServerUrl';
function Otherlist({others}) {
  
    return (
        <div className="list-group">
           {others.map((val,i)=>(
               <div key={i} className="list-group-item" onClick={()=>window.location.pathname="/viewproduct/"+val.product_id}>
                   <div className="row">
                       <div className="col-sm-4" >
                            <img src={url+val.item_pic1} alt={others.item_pic1} className="img-sm" />
                       </div>
                       <div className="col-sm-8">
                            <div className="lead">{val.item_name}</div>                         
                            <div>{val.sellprice}</div>
                            <div>{val.selltype}</div>
                       </div>
                   </div>
               </div>
           ))} 
        </div>
    )
}

export default Otherlist
