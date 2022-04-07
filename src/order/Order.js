import React,{useState,useEffect} from 'react'
import Usersidenav from '../user/navigation/Usersidenav'
import Utopnav from '../user/navigation/Utopnav'
import model from '../buyer/model/Buyer_Model';
import {ServerUrl as url} from '../ServerUrl';
import Vieworder from './Vieworder';
import MessageDialog from '../visit/MessageDialog';
import { Avatar, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles,Paper, Typography } from '@material-ui/core';
import ViewpaymentModal from '../visit/order/ViewpaymentModal';

function pay(ispay) {
    if(ispay==1){
        return (<span style={{color:'green'}}>Paid</span>);
    }else{
        return (<span style={{color:'red'}}>Not Paid</span>)
    }
}

function order_text(text){
    if(text==="release"){
        return "Done"
    }
    else if(text==="deliver"){
        return "Order has been delivered"
    }
    else if(text==="order"){
        return "Pending"
    }
    else if(text==="cancel"){
        return "Order has been canceled";
    }
}

function text_color(text){
    if(text==="cancel"){
        return "red";
    }
    else if(text==="deliver"){
        return "blue";
    }else if(text==="release"){
        return "green";
    }
    else if(text==="order"){
        return "orange"
    }
}


function Order() {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const classes = useStyles();
    const [order_id, setorder_id] = useState(0);
    const [orderlist, setorderlist] = useState([]);
    const [open, setopen] = useState(false);
    const [isload, setisload] = useState(false);
    const [openmes, setopenmes] = useState(false);
    const [rec_id, setrec_id] = useState(0);
    const [viewpayment, setviewpayment] = useState({});
    const [isview, setisview] = useState(false);
    useEffect(() => {        
    setInterval(() => {
        getorder();   
    }, 2000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isload])
   const getorder = () =>{
       model.getOrder(id).then(res=>{
        if(res.data.status===1){
                setorderlist(res.data.data);
          //      sethavedata(true);
            }else{
        //        sethavedata(false);
            }
       })
   }    
   
    return (
        <div>
            <Utopnav/>
            <Usersidenav/>           
            <MessageDialog openmessage={openmes} setopenmessage={setopenmes} acnt_id={rec_id}/>
            <ViewpaymentModal isview={isview} setisview={setisview} payment={viewpayment} />
            <div className="sideuser">
                <div className="margin-content">
                    <div className="container">
                    <List>
                        {orderlist.map((val,i)=>(
                        
                        <Paper elevation={3} className="mb-3">
                             <ListItem classes={classes.list} style={{padding:20}}>
                                <ListItemAvatar style={{width:100,height:100}}>
                                    <Avatar src={url + val.acnt_pic} alt={val.acnt_pic} style={{width:100,height:100}}/>
                                </ListItemAvatar>
                              <ListItemText style={{marginLeft:10}} primary={val.firstname + " " +val.mi +". "+ val.lastname}
                                        secondary={
                                            <React.Fragment>
                                                <Typography style={{fontSize:13}}>
                                                    Order Date : {" "+val.order_date}
                                                </Typography>
                                                <Typography style={{fontSize:13}}>
                                                    Order Amount : {" \u20B1 "+val.total_amount}
                                                </Typography>
                                                <Typography style={{fontSize:13,color:text_color(val.order_status)}} >
                                                    Status : {order_text(val.order_status)}
                                                </Typography>
                                            </React.Fragment>
                                        }
                              />
                              <ListItemSecondaryAction>
                                  <button className="btn btn-primary" onClick={()=>window.location.pathname="/orderreq/"+val.order_id}>View</button>
                              </ListItemSecondaryAction>
                             </ListItem>
                        </Paper>
                        
                        ))}                       
                    </List>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order
const useStyles = makeStyles(()=>({
    list:{
        border:'1px solid',
        borderColor:'black'
    }
}))