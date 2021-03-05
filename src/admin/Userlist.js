import React,{useEffect,useState} from 'react'
import Asidebar from './navigation/Asidebar'
import Atopnav from './navigation/Atopnav'
import model from './model/AdminModel';
import ListUser from './adminlist/ListUser';

function Userlist() {
    const [users, setusers] = useState([]);
    const [column, setcolumn] = useState(['firstname','lastname','email'])
    const [isEmpty, setisEmpty] = useState(false);
    const [q, setq] = useState("")

    useEffect(() => {
        getUser();
    }, [])
    const getUser = async() =>{ 
        const data = await model.adminlist('user').then(res=>{
            return res.data;
        }).catch(err=>{
            console.log(err);
        })
        if(data.status===0){
            setisEmpty(true);
        }else{
            setusers(data.data);
        }
    }   

    const updateStatus = (id) =>{
        
        const filter = users.filter(res=>res.acnt_id===id);
        const stat =  filter[0].status==="active" ? "inactive" : "active";
       
        model.updatestatus(id,stat).then(res=>{
            if(res.data.status===1){
                getUser();
            }else{
                
            }
        })
    
    }

    function search(rows){
        return rows.filter((row) => 
            column.some((col) => row[col].toString().toLowerCase().indexOf(q.toLowerCase()) > -1)
        );
    }
    return (
        <div>
            <Asidebar/>
            <Atopnav/>
            <div className="sidebody">
                <div className="container-box">
                    <div className="d-flex">
                        <div className="mr-auto p-2"><h5>User's List</h5></div>
                        <div className="p-1"><input  className="form-control" name="q" onChange={(e)=> setq(e.target.value)}/></div>
                        <div className="p-2"><button className="btn btn-outline-primary btn-sm" disabled>search</button></div>
                    </div>
                        <ListUser users={search(users)} update={updateStatus}/>
                        {isEmpty ? (<p className="text-danger center">No data found</p>): null}
                </div>
            </div>        
        </div>
    )
}

export default Userlist
