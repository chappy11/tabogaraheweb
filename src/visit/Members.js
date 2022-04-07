import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import Usersidenav from '../user/navigation/Usersidenav';
import Utopnav from '../user/navigation/Utopnav';
import Addmember from './Addmember';
import GroupModel from './GroupModel';

function Members() {
    const {group_id} = useParams();
    
    const [user, setuser] = useState([]);
    const [open, setopen] = useState(false);

    useEffect(() => {
        getuser();    
    }, [])
    
    const getuser = () =>{
        GroupModel.member(group_id).then(res=>{
            console.log(res.data);
            if(res.data.status===1){
                setuser(res.data.data);
            }else{
                setuser([]);
            }
        })   
    }

   
    return (
        <>
        <Utopnav/>
        <Usersidenav/>
        <div className="sideuser">
            <div className="margin-content">
                <div className="container">
                <Addmember open={open} setopen={setopen} group_id={group_id} getuser={getuser}/>
                <button className="btn btn-primary" onClick={()=>setopen(true)} >Add Member</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Members</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((val,i)=>(
                            <tr key={i.toString()}>
                                <td>{val.firstname+" "+val.mi+" "+val.lastname}</td>
                                <td><button className="btn btn-danger">Remove</button></td>
                            </tr>
                        ))}      
                    </tbody>
                </table>
                </div>
            </div>
        </div>         
        </>
    )
}

export default Members
