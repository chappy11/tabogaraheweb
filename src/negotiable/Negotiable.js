import React,{useState,useEffect} from 'react'
import Usersidenav from '../user/navigation/Usersidenav'
import Utopnav from '../user/navigation/Utopnav'
import model from '../buyer/model/Buyer_Model';
import {ServerUrl as url} from '../ServerUrl';
function Negotiable() {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const [data, setdata] = useState([]);

    useEffect(() => {
        setInterval(() => {
            getdata();
        }, 2000);
    }, [])
    const getdata = () =>{
        model.viewrequest(id).then(res=>{
            if(res.data.status===1){
                setdata(res.data.data);
            }else{

            }
        })
    }

    const accept = (neg_id) =>{
        
        model.acceptnego(neg_id).then(res=>{
            let filt = data.filter(res => res.nego_id !== neg_id);
            setdata(filt);
        })
    }
    return (
        <div>
            <Utopnav/>
            <Usersidenav/>
            <div className="sideuser">
                <div className="margin-content">
                    Price request
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th>Buyer</th>
                                <th>Item</th>
                                <th>Sellprice</th>
                                <th>Request Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((val,index)=>(
                                <tr key={index}>
                                    <td>
                                        <img src={url+val.acnt_pic} alt={val.acnt_pic} className="tbl-img rounded-circle"/>
                                         {val.firstname+" "+val.mi+" "+val.lastname}
                                    </td>
                                    <td>
                                        <img src={url+val.item_pic1} alt={val.item_pic1} className="tbl-img rounded-circle"/>
                                        {val.item_name}
                                    </td>
                                    <td>
                                        {val.sellprice}
                                    </td>
                                    <td>
                                        {val.neg_price}
                                    </td>
                                    <td>
                                        <button className="btn btn-success btn-sm" onClick={()=>accept(val.nego_id)}>accept</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Negotiable
