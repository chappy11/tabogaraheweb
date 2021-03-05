import React from 'react'
import {ServerUrl as url} from '../../ServerUrl';
function Listp({product}) {
    console.log(product);
    return (
        <div className="row">
            {product.map((val,index)=>(
                <div key={index} className="col-md-3" onClick={()=>window.location.pathname="/viewproduct/"+val.product_id}>
                        <div className="product_card shadow-lg">
                            <img src={url+val.item_pic1} alt={val.item_pic1} className="product_pic mx-auto d-block"/>
                            <div className="product-info">
                            <div style={{lineHeight:"1.2"}} className="product-price"><span >&#x20B1;</span> {val.sellprice}</div>
                            <div style={{lineHeight:"1.2"}}>{val.item_name.slice(0,22)}</div>

                            </div>
                        </div>
                        
                </div>
            ))}   
        </div>
    )
}

export default Listp
