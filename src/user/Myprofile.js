import React,{useState,useEffect} from 'react'
import Usersidenav from './navigation/Usersidenav'
import Utopnav from './navigation/Utopnav'
import model from './model/Usermodel';
import Prof1 from './myprofile/Prof1';
import Prof2 from './myprofile/Prof2';
import {Message as mess} from '../Message';
function Myprofile() {
    const store = JSON.parse(localStorage.getItem("user"));
    const [user, setuser] = useState([]);
    const [isUpdate, setisUpdate] = useState(false);
    const [message, setmessage] = useState({
        msg:"",
        cName:""
    })
    const [updateuser, setupdateuser] = useState({
        fname:"",
        mi:"",
        lname:"",
        contact:"",
        gender:"",
        civil:"",
        bday:"",
        sitio:"",
        brgy:""
    })
    useEffect(() => {
        getprofile();
        setupdateuser({
            fname:"",
            mi:"",
            lname:"",
            contact:"",
            bday:"",
            gender:"",
            civil:"",
            sitio:"",
            brgy:""
        })
    }, [isUpdate])
    const getprofile = () =>{
        model.myprofile(store.id).then(res=>{
            setuser(res.data.data[0]);
        }).catch(err=>console.log(err));
    }
    
    const onChange=(e)=>{
        setupdateuser({...updateuser,[e.target.name]:e.target.value});
    }
    const clearmess = () =>{
        setTimeout(() => {
            setmessage({msg:"",cName:""})
        }, 5000);
    }
    const save = (e) =>{
        e.preventDefault();
    
        const data = {
            id:store.id,
            fname:updateuser.fname==="" ? user.firstname : updateuser.fname,
            mi:updateuser.mi==="" ? user.mi : updateuser.mi,
            lname:updateuser.lname==="" ? user.lastname : updateuser.lname,
            contact:updateuser.contact ==="" ? user.contact : updateuser.contact,
            bday: updateuser.bday === "" ? user.birthdate : updateuser.bday,
            gender: updateuser.gender === "" ? user.gender : updateuser.gender,
            civil: updateuser.civil === "" ? user.civil_status : updateuser.civil,
            sitio: updateuser.sitio === "" ? user.sitio : updateuser.sitio,
            brgy: updateuser.brgy === "" ? user.brgy : updateuser.brgy
        }
        model.updateinfo(data).then(res=>{
            let response =  res.data;
            if(response.status===1){
                setmessage({msg:response.message,cName:mess[0]})
                clearmess();
            }else{
                setmessage({msg:response.message,cName:mess[1]});
                clearmess();
            }
        })
    }
    
    return (
        <div>
            <Utopnav/>
            <Usersidenav/>
            <div className="sideuser">
                <div className="margin-content">
                    <div className="row">
                        <div className="col-md-4">
                           <Prof1 user={user} isUpdate={isUpdate} setisUpdate={setisUpdate} save={save} onChange={onChange}/>
                        </div>
                        <div className="col-md-8">
                            <Prof2 user={user} isUpdate={isUpdate} onChange={onChange}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Myprofile
