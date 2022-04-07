import React,{useState,useEffect} from 'react'
import Usersidenav from '../user/navigation/Usersidenav'
import Utopnav from '../user/navigation/Utopnav'
import model from '../buyer/model/Buyer_Model';
import {ServerUrl as url} from '../ServerUrl';
import ReasonDialog from './ReasonDialog';
import { List,ListItem, ListItemSecondaryAction } from '@material-ui/core';
import MessageDialog from '../visit/MessageDialog';
function total(x,y){
    return parseInt(x) * parseInt(y);
}

function color(text){
    if(text==="request"){
        return "text-primary"
    }
    else if(text==="accepted"){
        return "text-success";
    }
    else if(text==="decline"){
        return "text-danger"
    }
}

function Returnitem() {
    const [data, setdata] = useState([]);
    const id = JSON.parse(localStorage.getItem("user")).id;
    const [open, setopen] = useState(false);
    const [reason, setreason] = useState("");
    const [isload, setisload] = useState(false);
    const [openmess, setopenmess] = useState(false);
    const [reciever, setreciever] = useState("");
    useEffect(() => {
        getdata();
    }, [isload])
    const getdata = () =>{
        model.allreturn(id).then(res=>{
            
            if(res.data.status===1){
                setdata(res.data.data);
            }
        })
    }
    const viewreason = (reason) =>{
        setreason(reason);
        setopen(true);
    }
    const handleclose =()=>{
        setreason("");
        setopen(false);
    }
    const accept =(return_id) =>{
          model.reponsereturn(return_id,"accepted").then(res=>{
              if(res.data.status===1){
                    getdata();
                    setisload(!isload);
                }
          })
    }

    const msg = (acnt_id) =>{
        setopenmess(true);
        setreciever(acnt_id)
    }

    const decline = (return_id) =>{
        model.reponsereturn(return_id,"decline").then(res=>{
            if(res.data.status===1){
                setisload(!isload);
            }
        })
    }
    return (
        <div>
            <Utopnav/>
            <Usersidenav/>
            <div className="sideuser">
                <ReasonDialog open={open} reason={reason} handleclose={handleclose}/>
                <MessageDialog openmessage={openmess} setopenmessage={setopenmess} acnt_id={reciever}/>
                <div className="margin-content">
                   
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date Requested</th>
                                    <th>Total Amount</th>
                                    <th>Status</th>
                                    <th></th>
                                    <th>Action</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((val,i)=>(
                                    <tr>
                                        <td>{val.order_id}</td>
                                        <td>{val.return_date}</td>
                                        <td>{val.total_amount}</td>
                                        <td>{val.return_status}</td>
                                        <td>
                                            <button className="btn btn-primary btn-sm mr-2" onClick={()=>window.location.pathname="/orderreq/"+val.order_id }>View Order</button>
                                            <button className="btn btn-primary btn-sm " onClick={()=>viewreason(val.reason)}>View Reason</button>
                                            
                                        </td>
                                        <td>
                                            {val.return_status == "pending" &&
                                            <>
                                            <button className="btn btn-success btn-sm mr-2" onClick={()=>accept(val.return_id)}>Accept</button>
                                            <button className="btn btn-danger btn-sm " onClick={()=>decline(val.return_id)}>Decline</button>
                                            </>
                                        }
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

export default Returnitem
