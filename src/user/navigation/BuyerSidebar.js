/* eslint-disable eqeqeq */
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import React,{useEffect, useState} from 'react'
//import {Categorydata as cat} from '../../Categorydata';
import {useParams} from 'react-router-dom';
import AdminModel from '../../admin/model/AdminModel';
import logo from '../../images/JOHN_LOGO.png'
import { ServerUrl } from '../../ServerUrl';

function rep(str){
    return str.replace(" ",'%20');
}

function BuyerSidebar() {
    const { category} = useParams();
    const [cat, setcat] = useState([]);
    

    useEffect(() => {
        getdata();
    }, [category])
    
    const getdata = () =>{
        AdminModel.getcategory().then(res=>{
            if(res.data.status===1){
                setcat(res.data.data);
            }
        })
    }
    
    function addall(arr){
        const dat = {
            cat_id:0,
            category:'',
            cat_pic:logo,
            cat_desc:"All Items",
        }
        return arr.splice(0,0,dat);
    }
    
    return (
        <div className="buyersidebar">
            <div className="mylist">
            <List>
               <ListItem onClick={()=>window.location.pathname="/user"} selected={window.location.pathname==="/user"} >
                   <ListItemAvatar>
                       <img src={logo} alt={logo} style={styles.images}/>
                   </ListItemAvatar>
                   <ListItemText primary="Garages"/>
               </ListItem>
               {cat.map((val,i)=>(
                   <ListItem key={i.toString()} selected={window.location.pathname==="/category/"+rep(val.category)} onClick={()=>window.location.pathname="/category/"+val.category} >
                       <ListItemAvatar>
                           <img src={ServerUrl+val.cat_pic} alt={val.cat_pic} style={styles.images}/>
                        </ListItemAvatar>                  
                        <div className="ml-3">
                        <ListItemText primary={val.category}/>
                        </div>
                    </ListItem>
               ))}
            </List>
            </div>
        </div>
    )
}

export default BuyerSidebar

const styles = {
    images:{
        width:'100px',
        height:'100px',
        borderRadius:'100%'
    },
    scrol:{
        overflowY:'scroll',
        height:'100%',
        width:'100%',
    }
}