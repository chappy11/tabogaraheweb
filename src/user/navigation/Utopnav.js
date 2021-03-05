import React,{useState,useEffect} from 'react'
import {Usernavdata as usrnav} from '../navdata/Usernavdata';
import logo from '../../images/JOHN_LOGO.png'
import {ServerUrl as url} from '../../ServerUrl'
import model from '../model/Usermodel'
function Utopnav() {
    const [notifcount, setnotifcount] = useState(0);
    const data =    JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        const notif = () =>{
            const inter = setInterval(() => {
                model.notifCounter(data.id).then(res=>{
                    setnotifcount(res.data.count);
                })
            }, 1000);
            return inter;
        }
        notif();
    }, [])
  
    return (
        <div className="usernav">
            <ul className="usr-logo"><img src={logo} alt={logo} className="myuserlogo"/></ul>
            <ul className="usr-ul">
                {usrnav.map((val,index)=>(
                    <li key={index} 
                    onClick={()=>window.location.pathname=val.url}
                    id={window.location.pathname===val.url ? "active" : ""}
                    className={val.cName}>
                        {index===1 ? (<><img src={url+data.pic} alt={data.pic} className="atopnav-img rounded-circle"/> {data.fname}</>):(<>{val.title}{index===3?(<span className="badge badge-danger">{notifcount}</span>):null}</>)} </li>    
                ))}
            </ul>
        </div>
    )
}

export default Utopnav
 