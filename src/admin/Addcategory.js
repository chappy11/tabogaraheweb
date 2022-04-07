import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React, { useState } from 'react'
import {Message as mess} from '../Message';
import model from './model/AdminModel';
function Addcategory({open,setopen}) {
    const [file, setfile] = useState(null);
    const [data, setdata] = useState({name:"",desc:""});
    const [message, setmessage] = useState({msg:"",cName:""})
    const [img, setimg] = useState(null)
    const imgfile =(e)=>{
        setfile(URL.createObjectURL(e.target.files[0]));
        setimg(e.target.files[0]);        
    }
    const onChange= (e) =>{
        setdata({...data,[e.target.name]:e.target.value});
    }
    const cleart = () =>{
        setTimeout(() => {
            setmessage({});
        }, 5000);
    }
    const save = (e) =>{
        e.preventDefault();
        
        if(file==null){
            setmessage({msg:"Pls, put an image",cName:mess[1]});
            cleart();
        }
        else if(data.name==="" || data.desc===""){
            setmessage({msg:"Fill out fieds",cName:mess[1]})
            cleart()
        }else{
            let fd = new FormData();
            fd.append("pic",img,img.name);
            fd.append("name",data.name);
            fd.append("desc",data.desc);
            model.addcat(fd).then(res=>{
                if(res.data.status===1){
                    setmessage({msg:res.data.message,cName:mess[0]})    
                    setfile(null);
                    setdata({name:"",desc:""});
                    cleart();
                }else{
                    setmessage({msg:res.data.message,cName:mess[1]})
                    cleart();
                }
            })
        }
    
       
    }
    
    return (
        <Dialog open={open} onClose={()=>setopen(false)} fullWidth={true}>
            <DialogTitle>
                    Add Category 
            </DialogTitle>
            <DialogContent>
                
                <div className="row justify-content-center">
        
                    <div className="">
                    <p className={message.cName}>{message.msg}</p>
                    <div className="form-group">
                            <img src={file} alt={file} className="formcatimg d-block mx-auto"/>
            
                            <input type="file" className="form-control mt-2" onChange={imgfile}/>
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" onChange={onChange} className="form-control"/>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" name="desc" onChange={onChange}  row="15" style={{resize:false}}/>
                        </div>
                        
                    </div>
                 </div>   
            </DialogContent>
            <DialogActions>
                <button className="btn btn-primary" onClick={save}>Save</button>
                <button className="btn btn-danger" onClick={()=>setopen(false)}>close</button>
            </DialogActions>
        </Dialog>
    )
}

export default Addcategory
