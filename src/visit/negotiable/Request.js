import React,{useState,useEffect} from 'react'
import model from '../../buyer/model/Buyer_Model';
function Request({product_id,setopenneg}) {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const [negotiate, setnegotiate] = useState({});
    const [isRequest, setisRequest] = useState(false);

    useEffect(() => {
        getnegotiate();
    }, [product_id])
 
    const getnegotiate = () =>{
        model.getnegotiate(id,product_id).then(res=>{
            console.log(res);
            if(res.data.status===1){
                setnegotiate(res.data.data);
                setisRequest(true);
            }else{
                setisRequest(false);
            }
        })
    }
    console.log(isRequest);
    return (
        <div>
            {isRequest ? (<p className="text-success text-center">This item is negotiable You request {negotiate.neg_price}</p>):(<button className="btn btn-success mt-3 btn-block " onClick={()=>setopenneg(true)}>Request Price</button>)}            
        </div>
    )
}

export default Request
