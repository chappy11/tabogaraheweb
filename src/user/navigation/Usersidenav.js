import { List, ListItem, ListItemIcon,makeStyles, ListItemText, Divider } from '@material-ui/core';
import React from 'react'
import {Usersidedata as data} from '../navdata/Usersidedata';
import {Sellerside as seller} from '../navdata/Sellerside';
const useStyle =  makeStyles((theme)=>({
    notselected:{
        color:'#4A0F60',
   
    },
    selected:{
        color:'#f97E5D',
   
    },
    lisitem:{
        backgroundColor:"whitesmoke"
    }


    
}))

function Usersidenav() {
    const cls = useStyle();
   
    return (
        <div className="usersidebar">
            <List>
               {data.map((val,i)=>(
                   <ListItem 
                   className={cls.lisitem}
                       key={i}
                    button
                    onClick={()=>window.location.pathname=val.link}
                 
                   >
                       <ListItemIcon className={val.link==window.location.pathname ? cls.selected:cls.notselected}>
                           {val.icon}
                        </ListItemIcon>
                       <ListItemText primary={val.title} className={val.link==window.location.pathname ? cls.selected:cls.notselected}/>
                   </ListItem>
               ))}
            </List>
            <Divider/>
            <List>
                {seller.map((val,i)=>(
                    <ListItem
                        button
                        onClick={()=>{window.location.pathname=val.link}}
                        key={i} 
                    >
                        <ListItemIcon className={val.link===window.location.pathname ? cls.selected : cls.notselected}>
                            {val.icon}
                        </ListItemIcon>
                        <ListItemText primary={val.title} className={val.link===window.location.pathname ? cls.selected : cls.notselected}/>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default Usersidenav
