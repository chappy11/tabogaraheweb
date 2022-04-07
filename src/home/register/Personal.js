import React,{useState} from 'react'
import {Message as mess} from '../../Message';
function Personal({setdat,updatecount,count,onback,dats}) {
    const [data, setdata] = useState({
        fname:dats.fname,
        mi:dats.mi,
        lname:dats.lname,
        gender:dats.gender,
        civil:dats.civil,
        bday:dats.bday
    })
    const [message, setmessage] = useState({
        msg:"",
        msgclas:""
    })

    const onChange = e =>{
        setdata({...data,[e.target.name]:e.target.value});
    }
    const clear = () => {
        setTimeout(() => {
            setmessage({
                msg:"",
                msgclas:""
            })
        }, 5000);
    }

    const next = (e) =>{
        e.preventDefault();
        if(data.fname === "" || data.mi === "" || data.lname === "" || data.bday ===""){
            setmessage({
                msg:"Fill out fields",
                msgclas:mess[1]
            })
            clear();
        }else if(data.gender===""){
            setmessage({
                msg:"Choose gender",
                msgclas:mess[1]
            })
            clear();
        }else if(data.civil===""){
            setmessage({
                msg:"Choose civil status",
                msgclas:mess[1]
            })
            clear();
        }else{
            setmessage({
                msg:"Successfully Save",
                msgclas:mess[0]
            })
            setdat(data);
            setTimeout(() => {
                updatecount(count=> count + 1);
                setmessage({msg:"",msgclas:""});
            }, 5000);
        }
    }

    return (
        <div className="register-personal ">
            <p className={message.msgclas}>{message.msg}</p>
            <div className="form-group">
                <label className="text-info">Name</label>
                <div className="row">
                    <div className="col-md-5">
                        <input className="form-control" placeholder="Firstname" name="fname" onChange={onChange} value={data.fname}/>
                    </div>
                    <div className="col-md-2">
                        <input className="form-control" placeholder="MI" name="mi" onChange={onChange} value={data.mi}/>
                    </div>
                    <div className="col-md-5">
                        <input className="form-control" placeholder="Lastname" name="lname" onChange={onChange} value={data.lname}/>
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="text-info">Sex</label>
                        <select className="form-control" name="gender" onChange={onChange}>
                            <option value=" ">Choose</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="text-info">Civil Status</label>
                        <select className="form-control" name="civil" onChange={onChange}>
                            <option value="">Choose</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Widow">Widow</option>
                            <option value="Separated">Separated</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label className="text-info">Birthday</label>
                <input type="date" className="form-control" name="bday" onChange={onChange} value={data.bday} />
            </div>
            <button className="btn btn-primary float-right" onClick={next}>Next</button>
            <button className="btn btn-danger float-left" onClick={onback}>Back</button>
            
        </div>
    )
}

export default Personal
