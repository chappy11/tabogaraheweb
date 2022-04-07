import {ServerUrl as url} from '../../ServerUrl';
function GetProduct({garage_id,open,product}) {
   
  
    return (
        <div>
            {/* {isEmpty  ? (<p className="text-danger center">No product in this garage</p>):null} */}
            <div className="row">
                {product.map((val,idx)=>(
                    <div className="col-sm-3 mt-2" onClick={()=>window.location.pathname="/uviewitem/"+val.item_id} key={idx}>
                        <div className="product_card mx-auto shadow-lg">
                            <img src={url+val.item_pic1} alt={val.item_pic1} className="product_pic mx-auto d-block"/>
                            <div className="product-info">
                                <div className="product-price" style={{lineHeight:"1.2"}}>{"\u20B1 " +parseInt(val.sellprice).toFixed(2) }</div>
                                <div style={{lineHeight:"1.2"}}>{val.item_name}</div>
                                 {/* eslint-disable-next-line eqeqeq */}
                                <div  className={val.item_quantity==0 ? "text-danger":""} style={{lineHeight:"1.2"}}>{val.item_quantity==0 ? "Out of stock":null}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GetProduct
