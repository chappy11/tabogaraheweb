import React,{useState,useEffect} from 'react'
import usermodel from '../user/model/Usermodel';
import Listp from './productlist/Listp';
function Productlist({garage_id}) {
    const [productlist, setproductlist] = useState([]);
    useEffect(() => {
        setInterval(() => {
            getproductlist();
        
        }, 1000);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const getproductlist = () =>{
        usermodel.availableproduct(garage_id).then(res=>{
            console.log(res);
            if(res.data.status===1){
               setproductlist(res.data.data);
            }
        })
    }
    return (
        <div className="mt-3">
            <Listp product={productlist}/>
        </div>
        )
}

export default Productlist
