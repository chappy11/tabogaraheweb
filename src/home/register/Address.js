import React,{useState} from 'react'
import {Message as mess} from '../../Message';
import {Barangay as brgys} from '../../Barangay';
function phonenumber(phone){
    var phoneno = /^\d{11}$/;
    if(!phone.match(phoneno)){
        return true;
    }else{
        return false;
    }
}
function Address({dats,updatecount,count,setdat,onback}) {
    const [data, setdata] = useState({
        contact:dats.contact,
        sitio:dats.sitio,
        brgy:""
    })
    const [message, setmessage] = useState({
        msg:"",
        msgclas:""
    })

    const clear = () =>{
        setTimeout(() => {
            setmessage({
                msg:"",
                msgclas:"",
            })
        }, 5000);
    }
    const onChange = e =>{
        setdata({...data,[e.target.name]:e.target.value});
    }
    const onnext = e =>{
        e.preventDefault()
        if(data.contact==="" || data.sitio===""){
            setmessage({
                msg:"Fill out all fields",
                msgclas:mess[1]
            })
            clear();
        }else if(data.brgy===""){
            setmessage({
                msg:"Please choose your barangay",
                msgclas:mess[1]
            });
            clear();
        }else if(phonenumber(data.contact)){
            setmessage({
                msg:"Invalid Contact Number",
                msgclas:mess[1]
            })
            clear();
        }else{
            setmessage({
                msg:"Completed",
                msgclas:mess[0]
            })
            setdat(data);
            setTimeout(() => {
                updatecount(count => count + 1);
                setmessage({msg:"",msgclas:""})
            }, 5000);
        }
    }
    return (
        <div className="register-address">
            <div className="form-group">
                <label className="text-info">Contact NO.</label>
                <input type="number" name="contact" onChange={onChange} className="form-control" placeholder="09*********" value={data.contact}/>
            </div>
            <div className="form-group">
                <label className="text-info">Sitio/St.</label>
                <input type="text" name="sitio" onChange={onChange} className="form-control" value={data.sitio} placeholder="Enter your Sitio or Street"/>
            </div>
            <div className="form-group">
                <label className="text-info">Barangay</label>
                <select className="form-control" name="brgy" onChange={onChange}>
                    {brgys.map((val,index)=>(
                        <option key={index} value={val}>{val}</option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary float-right" onClick={onnext}>Next</button>
            <button className="btn btn-danger float-left" onClick={onback}>Back</button>
            <p className={message.msgclas}>{message.msg}</p>
        </div>
    )
}

export default Address
