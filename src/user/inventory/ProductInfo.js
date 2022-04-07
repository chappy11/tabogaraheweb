import React,{useState,useEffect} from 'react';
import model from '../model/Usermodel';
function ProductInfo({item_id,status}) {
    const [product, setproduct] = useState({})
    
    useEffect(() => {
        getitem(item_id)
    }, [item_id,status]);

    const getitem = () =>{
        model.getproductitem(item_id).then(res=>{
            if(res.data.status===1){
                setproduct(res.data.data[0]);
            }
        })
    }
    return (
        <div>
            <div className="row">
                <div className="col-sm-4">
                    <label className="text-secondary" style={{fontSize:'15px'}}>Sell Price: </label>
                </div>
                <div className="col">
                    <p className=" ml-3" style={{fontSize:'15px'}}>{parseInt( product.sellprice).toFixed(2)}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <label className="text-secondary" style={{fontSize:'15px'}}>Sell Type: </label>
                </div>
                <div className="col">
                    <p className=" ml-3" style={{fontSize:'15px'}}>{product.selltype}</p>
                </div>
            </div>

        </div>
    )
}

export default ProductInfo
