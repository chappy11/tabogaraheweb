import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import React,{useState,useEffect} from 'react'
import Addcategory from '../Addcategory'
import Asidebar from '../navigation/Asidebar'
import Atopnav from '../navigation/Atopnav'
import model from '../model/AdminModel';
import {ServerUrl as url} from '../../ServerUrl';
function CategoryData() {
    const [open, setopen] = useState(false);
    const [ctgy, setctgy] = useState([]);

    
    useEffect(() => {
        getdata();
    }, [open])
    
    
    const getdata = () =>{
        model.getcategory().then(res=>{
            if(res.data.status===1){
                setctgy(res.data.data);
            }else{

            }
        })
    }
    return (
        <div>
            <Asidebar/>
            <Atopnav/>
            <Addcategory open={open} setopen={setopen}/>
            <div className="sidebody">
                             <div className="row justify-content-center">
                        <div className="catcontainer">                       
                        <button className="btn btn-primary" onClick={()=>setopen(true)}>Add Category</button>

                         <List>
                            {ctgy.map((val,i) => (
                                <ListItem>
                                    <ListItemAvatar>
                                        <img src={url+val.cat_pic} alt={val.cat_pic} className="cat_pic rounded-circle"/>
                                    </ListItemAvatar>
                                        <ListItemText className="ml-3" primary={val.category}secondary={val.cat_desc}/>
                                </ListItem>
                            ))}
                        </List>                    
                        </div>

                </div>
            </div>
        </div>
    )
}

export default CategoryData
