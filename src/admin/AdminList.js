import React,{useState,useEffect} from 'react'
import Asidebar from './navigation/Asidebar'
import Atopnav from './navigation/Atopnav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import AddAdmin from './adminlist/AddAdmin';
import model from './model/AdminModel';
import {Message as mess} from '../Message';
import ListAdmin from './adminlist/ListAdmin';
function AdminList() {
    const [open, setopen] = useState(false);
    const [isload, setisload] = useState(false);
    const [admins, setadmins] = useState([]);
    const [admin, setadmin] = useState({
        fname:"",
        lname:"",
        email:"",
        contact:"",
        sitio:"",
        brgy:""
    })
    const [searchData, setsearchData] = useState(['firstname','lastname','email','username']);
    const [q, setq] = useState("");
    const [isEmpty, setisEmpty] = useState(false);
    useEffect(() => {
       getAdmins();
    }, [open])
    const getAdmins = async() =>{
        const data = await model.adminlist("admin2").then(res=>{
            return res.data;
        }).catch(err=>{console.log(err)});
        if(data.status===0){
            setisEmpty(true);
        }else{
            setadmins(data.data);
        }
    }
   
    const [message, setmessage] = useState({
       msg:"",
       msgclas:""
   })
    const onChange = (e) =>{
        setadmin({...admin,[e.target.name]:e.target.value});
    }
    const clear =() =>{
        setTimeout(() => {
            setmessage({
                msg:"",
                msgclas:""
            })
        }, 5000);
    }
    const save = (e) =>{
        e.preventDefault();
        setisload(true);
    
        model.addAdmin(admin).then(res=>{
            if(res.data.status===0){
                setisload(false);
                setmessage({msg:res.data.message,msgclas:mess[1]});
                clear();
            }else{
                setisload(false);
                setmessage({msg:res.data.message,msgclas:mess[0]})
                clear();
            }
        })
        
    }

    const handleopen = (e) =>{
        e.preventDefault();
        setopen(true);
    }

    const handleclose = (e) =>{
        e.preventDefault();
        setopen(false);
    }
    
    function search(rows){
   
        return rows.filter((row) =>
            searchData.some(
                (column) =>
                row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
            )
        );        
    }
    return (
        <div>
            <Asidebar/>
            <Atopnav/>
            <div className="sidebody">
                    <div className="container-box">
                      <AddAdmin open={open} message={message} isload={isload} save={save} onChange={onChange} admin={admin} handleclose={handleclose}/>
                        <div className="d-flex ">
                            <div className="p-2 mr-auto"><h4><FontAwesomeIcon icon={faUserSecret} lg/> List of Admin</h4></div> 
                            <div className="p-1"><input className="form-control" name="q" onChange={(e) => setq(e.target.value)} /></div>
                            <div className="p-2"><button className="btn btn-outline-info btn-sm " disabled>Search</button></div>
                            <div className="p-2"><button className="btn btn-info btn-sm" onClick={handleopen}>Add Admin</button></div>                        
                        </div>
                        <ListAdmin admins={search(admins)}/>
                        {isEmpty ? (<p className="text-danger center">No data found</p>):null}
                    </div>
            </div>
        </div>
    )
}

export default AdminList
