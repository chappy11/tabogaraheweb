import React,{useState,useEffect} from 'react'
import Asidebar from './navigation/Asidebar'
import Atopnav from './navigation/Atopnav'
import {useParams,useHistory} from 'react-router-dom';
import model from './model/AdminModel';
import {Message as mess} from '../Message'
function Decline() {
    const {item_id,user_id} = useParams();
    const history = useHistory();
    const [item, setitem] = useState({});
    const [reason, setreason] = useState("");
    const [message, setmessage] = useState({
        msg:"",
        cName:""
    })
    useEffect(() => {
        const data = async() =>{
            const dat = await model.viewItem(item_id).then(res=>{
                return res.data.data[0];
            }).catch(err=>{console.log(err)})            
            setitem(dat);
        }
        data();
    }, [])
    const onChange=e=>{
        setreason(e.target.value);
    }
    const decline = (e) =>{
        e.preventDefault();
        if(reason===""){
            setmessage({msg:"Fill otu all fields",cName:mess[1]})
        }else{
        const reson = "your item "+item.item_name+" with "+item.item_quantity+" "+item.item_unit+" has been declined by the admin due to "+reason;
        const params = {
            item_id:item_id,
            acnt_id:user_id,
            reason:reson,
        }
            model.decline(params).then(res=>{
                let resp = res.data;
                if(resp.status===0){
                    setmessage({msg:resp.message,cName:mess[1]})
                    setTimeout(() => {
                        setmessage({msg:"",cName:""})
                    }, 5000);
                }else{
                    setmessage({msg:resp.message,cName:mess[0]})
                    setTimeout(() => {
                        setmessage({msg:"",cName:""})
                        window.location.pathname="/itemlist";
                    }, 5000);
                }                
            })        
        }
    }
    return (
        <div>
            
            <Asidebar/>
            <Atopnav/>
            <div className="sidebody">
                <div className="item-container mx-auto">
                    <div className="form-group">
                        <label>Reason for declining</label>
                        <textarea className="form-control" cols="4" rows="3" onChange={onChange}/>
                    </div>
                    <button className="btn btn-primary" onClick={decline}>Decline</button>{" "}
                    <button className="btn btn-danger" onClick={()=>history.goBack()}>back</button>

                </div>
            </div>
        </div>
    )
}

export default Decline
