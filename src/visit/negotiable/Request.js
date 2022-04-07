import React,{useState,useEffect} from 'react'
import model from '../../buyer/model/Buyer_Model';
function Request({product_id,setopenneg,setrequest,addtocart}) {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const [negotiate, setnegotiate] = useState({});
    const [isRequest, setisRequest] = useState(false);
    
    useEffect(() => {
    setInterval(() => {
        getnegotiate(); 
    }, 1000);
    }, [product_id,isRequest])
 
    const getnegotiate = () =>{
        model.getnegotiate(id,product_id).then(res=>{
    
            if(res.data.status===1){
                setnegotiate(res.data.data);
                setisRequest(true);
            }else{
                setisRequest(false);
            }
        })
    }
    const removereq = (neg_id) =>{
        model.removenegotiable(neg_id).then(res=>{
            if(res.data.status===1){
                setisRequest(false);            
            }else{
                setisRequest(true);
            }
        }).catch(err=>console.log(err));
    }
    return (
        <div>
            {isRequest ? 
                (<>
                    {negotiate.neg_status==="accept" ? (
                        <>
                        <p>Price of {"\u20B1"+negotiate.neg_price} has been accepted</p>
                        <button className="btn btn-primary btn-block" onClick={addtocart}>Add to Cart</button>
                        </>
                    ):(
                        <>
                        <p>Negotiable price of {"\u20B1"+negotiate.neg_price} is still on process of approval</p>
                        <button className="btn btn-secondary btn-block" onClick={()=>removereq(negotiate.nego_id)}>Cancel Request</button>
                        </>
                    )}
                    
                </>)
                :
                (<>
                <button className="btn btn-success btn-block" onClick={()=>setopenneg(true)}>Negotiate Price</button>
                <button className="btn btn-primary btn-block" onClick={addtocart}>Add to Cart</button>
                </>
                )
            }            
        </div>
    )
}

export default Request
