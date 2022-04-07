import React,{useState,useEffect} from 'react'
import BuyerSidebar from './navigation/BuyerSidebar'
import Utopnav from './navigation/Utopnav'
import model from '../user/model/Usermodel';
import {ServerUrl as url} from '../ServerUrl';
function Userpage() {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const [garages, setgarages] = useState([]);
    const [isload, setisload] = useState(false);
    useEffect(() => {
        setInterval(() => {
            getgarages();    
        }, 2000);
        setisload(true);
    }, [])
    const getgarages = () =>{
        model.allgarages(id).then(res=>{
          //  console.log(res);            
            if(res.data.status===1){
                setgarages(res.data.data);
            }else{
                
            }
        })
    }
    
    return (
        <div>
             <BuyerSidebar isload={isload}/>
             <Utopnav/>

            <div className="categoryside">
                    <div className="g-margin">
                        <div className="row">
                        {garages.map((val,i) =>(
                            <div key={i} className="col-sm-4">
                                <div className="mycard mx-auto shadow">
                                    <img src={url+val.garage_photo} alt={garages.garage_photo} className="img-card mx-auto d-block"/>
                                    <div className="card-body">
                                        <p className="text-center lead">{val.garage_name}</p>
                                        <p style={{fontSize:"15px"}} className="center">Owned by : {val.firstname+" "+val.lastname}</p>
                                        <p style={{fontSize:"15px"}} className="center">Start/end: {val.date_start+" / "+val.date_end}</p>
                                        <a href={`/visitgarage/${val.garage_id}`} className="btn btn-outline-primary btn-block float-bottom">Visit garage</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                            
                        </div>
                    </div>
            </div>
       </div>
    )
}

export default Userpage
