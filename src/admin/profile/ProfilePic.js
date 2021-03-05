import React,{useState,useEffect} from 'react'
import {IconButton} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons'
import {ServerUrl as url} from '../../ServerUrl';
import {Message as mess} from '../../Message';
import model from '../model/AdminModel';
function ProfilePic({user,btnupdate,isupdate,onChange,save}) {
  const [preview, setpreview] = useState({});
  const [img, setimg] = useState(null);
  const chngepp = e =>{
    setimg(e.target.files[0]);
    setpreview(URL.createObjectURL(e.target.files[0]));
  }
  const [message, setmessage] = useState({
    msg:"",
    msgclas:""
  })
  const clear = () =>{
    setTimeout(() => {
   
      setmessage({
        msg:"",
        msgclas:""
      })
    }, 5000);
   
  }
  const saveimg = (e) =>{
    e.preventDefault();
    if(img===null){
         setmessage({
           msg:"Choose image if you want to change",
          msgclas:mess[1]
         })
         clear();
    }else{
        let fd = new FormData();
        fd.append("id",JSON.parse(localStorage.getItem("user")).id);
        fd.append("pp",img,img.name);
        model.updatePic(fd).then(res=>{
            if(res.data.status===0){
              setmessage({
                msg:res.data.message,
                msgclas:mess[1]
              })
              clear();
            }else{
              setmessage({
                msg:res.data.message,
                msgclas:mess[0]
              })
              clear();
            }
        })
      }
  }
  useEffect(() => {
    setpreview(url+user.acnt_pic)
  }, [isupdate]);
  return (
        
              <div className="profile-box">
                <p className={message.msgclas}>{message.msg}</p>
                <img src={isupdate ? preview : url+user.acnt_pic} className="rounded-circle profile-pic mx-auto d-block" alt={preview}/>
                {isupdate ? (
                  <>
                  <div className="row">
                    <div className="col">
                    <input type="file" name="img" className="form-control" onChange={chngepp} />
                    </div>
                    <div className="col-md-4">
                    <IconButton aria-label="update" onClick={saveimg} className="text-primary">
                        <FontAwesomeIcon icon={faPen}/>
                    </IconButton>
                    </div>
                    
                  </div>
                  <div className="form-group">
                    <label>Firstname</label>
                    <input type="text" className="form-control" name="fname" placeholder={user.firstname} onChange={onChange}/>
                  </div>
                  <div className="form-group">
                    <label>MI</label>
                    <input type="text" className="form-control" name="mi" placeholder={user.mi} onChange={onChange}/>
                  </div>
                  <div className="form-group">
                    <label>Lastname</label>
                    <input type="text" className="form-control" name="lname" placeholder={user.lastname} onChange={onChange}/>
                  </div>
                  <div className="row">
                      <div className="col-sm-3"><button className="btn btn-primary" onClick={save}>save</button></div>
                      <div className="col-sm-3"><button className="btn btn-danger" onClick={btnupdate}>cancel</button></div>
                    </div>
                  </>
                ):(
                <>
                <h3 className="center font-color-primary ">{user.firstname+" "+user.lastname}</h3>
                <button className="btn btn-info btn-block profile-button-margin" onClick={btnupdate}>update</button>
                </>
                )}
                
              </div>
    )
}

export default ProfilePic
