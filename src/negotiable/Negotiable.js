import React,{useState,useEffect} from 'react'
import Usersidenav from '../user/navigation/Usersidenav'
import Utopnav from '../user/navigation/Utopnav'
import model from '../buyer/model/Buyer_Model';
import {ServerUrl as url} from '../ServerUrl';
import NegotiableModel from './NegotiableModel';
import NegotiableDialog from './NegotiableDialog';
function Negotiable() {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const [data, setdata] = useState([]);
    const [pakyaw_id, setpakyaw_id] = useState("");
    const [open, setopen] = useState(false);
    const [info, setinfo] = useState({});
    
    useEffect(() => {
        setInterval(() => {
            getdata();
        }, 2000);
    }, [])
    const getdata = () =>{
        NegotiableModel.pakyaw(id).then(res=>{
            if(res.data.status===1){
                setdata(res.data.data);
            }else{
                setdata([]);
            }
        })
    }

    const accept = (pakyaw_id,info) =>{
        setopen(true)
        setpakyaw_id(pakyaw_id)
        setinfo(info);
    }


    return (
        <div>
            <Utopnav/>
            <Usersidenav/>
            <div className="sideuser">
                <div className="margin-content">
                    <NegotiableDialog pakyaw_id={pakyaw_id} open={open} setopen={setopen} info={info}/>
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th>Buyer</th>
                                <th>Total Amount</th>
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
                                        {"\u20B1 " +parseInt(val.amount).toFixed(2)}
                                    </td>
                                    <td>
                                        {"\u20B1" +parseInt(val.total_amount).toFixed(2) }
                                    </td>
                                    <td>
                                        <button className="btn btn-primary btn-sm" onClick={()=>accept(val.pakyaw_id,val)}>View</button>
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
