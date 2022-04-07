import React,{useState,useEffect} from 'react'
import model from '../buyer/model/Buyer_Model';
import {ServerUrl as url} from '../ServerUrl';
import Utopnav from '../user/navigation/Utopnav';
import UserSidebar from '../user/navigation/Usersidenav';
import Vieworder from '../order/Vieworder';
import {List, ListItem, ListItemSecondaryAction} from '@material-ui/core'
function SalesReport() {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const [reports, setreports] = useState([]);
    const [order_id, setorder_id] = useState(0);
    const [open, setopen] = useState(false);
    const [start, setstart] = useState("");
    const [end, setend] = useState("");
    const [isgenerate, setisgenerate] = useState(false);
    
    useEffect(() => {
                getreport();
        }, [])
    const getreport = () =>{
        model.salesreport(id).then(res=>{
            if(res.data.status===1){
                setreports(res.data.data);
            }
        })
    }
    function totalsales(){
        let total =0;    
        reports.map((val)=>{
            total += parseInt(val.total_amount)
        })
        return total;
    }
    const handleclose = () =>{
        setopen(false);
    }

    const orderview =(order_id) =>{
        setorder_id(order_id);
        setopen(true);
    }

    const getbydate = () =>{
        var arr = [];
        reports.forEach(element => {
            var dat = new Date();
            var mydate =element.order_date;
            var c = new Date(mydate).getTime();
            var x = new Date(start).getTime();
            var y = new Date(end).getTime();
            var isRange = c >= x && c < y;
            if(isRange){
                arr.push(element);
            } 
        });
        setreports(arr);
        setisgenerate(true)
    }
    
    const cleargen = () =>{
        getreport();
        setisgenerate(false);
        setstart("");
        setend("")
    }
        return (
        <div>   
            <Utopnav/>
            <UserSidebar/>
            <div className="sideuser">
                <div className="margin-content">
                <div className="row">
                    <input type="date" style={{width:200}} onChange={(e)=>setstart(e.target.value)} className="form-control" value={start}/>
                    <div className=" mt-2 ml-3 mr-3">to</div>
                    <input type="date" className="form-control" style={{width:200}} onChange={(e)=>setend(e.target.value)} value={end} />
                    {isgenerate ? (
                         <button className="btn btn-dangerre ml-3 btn-sm " onClick={cleargen}>Reset</button>
                    ):(
                        <button className="btn btn-success ml-3 btn-sm " onClick={getbydate}>Generate</button>
                    )}
                   
                    <p className="mt-2 ml-3 mr-3">Total Sales :{"\u20B1"+ totalsales()+".00"} </p>
                </div>
               
                   <div className="row justify-content-center" style={{width:'100%'}}>                    
                    <List style={{width:'60%'}}>
                        {reports.map((val,i)=>(
                           <div className="card p-3" >
                           <ListItem >
                               <img src={url+val.acnt_pic} alt={val.acnt_pic} style={{width:100,height:100,borderRadius:100}}/>
                                <div className="ml-3">
                                    <div>Order ID: {val.order_id}</div>
                                    <div>Total Amount: {"\u20B1" + val.total_amount}</div>
                                    <div>Buyer: {val.firstname + " " + val.mi + " " + val.lastname}</div>
                                    <div>Date : {val.order_date}</div>
                                </div>

                           </ListItem>
                           <ListItemSecondaryAction>
                               <button className="btn btn-primary btn-sm" onClick={()=>window.location.pathname="/orderreq/"+val.order_id}>View Order</button>
                           </ListItemSecondaryAction>
                          </div>
                        ))}
                    </List>
                </div>
                </div>

            </div>
                   </div>
    )
}

export default SalesReport
