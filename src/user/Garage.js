import React,{useState,useEffect} from 'react'
import Usersidenav from './navigation/Usersidenav'
import Utopnav from './navigation/Utopnav'
import model from './model/Usermodel';
import CreateGarage from './garage/CreateGarage';
import Mygarage from './garage/Mygarage';
function Garage() {
    const store = JSON.parse(localStorage.getItem("user"));
    const [open, setopen] = useState(false);
    const [message, setmessage] = useState("");
    const [mygarage, setmygarage] = useState({});
    const [havegarage, sethavegarage] = useState(false);
    const [product, setproduct] = useState([]);
    const [isEmpty, setisEmpty] = useState(false);
    const [isload, setisload] = useState(false);
    const handleopen = () =>{
        model.getvalidated(store.id).then(res=>{
            console.log(res);
            if(res.data.count > 0){
                setopen(true);
            }else{
                setmessage("You Cannot create garage if you dont have item in your inventory")
                setTimeout(() => {
                    setmessage();
                }, 5000);
            }
        })
    }
    const handleclose=()=>{
        setopen(false);
    }
    
    useEffect(() => {
        model.mygarage(store.id).then(res=>{
            if(res.data.status===1){
                sethavegarage(true);
                setmygarage(res.data.data[0])
                getproduct(res.data.data[0].garage_id);
            }else{
                sethavegarage(false);
                setmygarage([]);
            }
        })
    }, [open,havegarage,isload])
    const getproduct = (garage_id) =>{
        model.viewProduct(garage_id).then(res=>{
            if(res.data.status===1){
                setisEmpty(false);
                setproduct(res.data.data);
            }else{
                setisEmpty(true);
            }
        })
    }

    const activate = (e) =>{
        e.preventDefault();
        model.activategarage(mygarage.garage_id,mygarage.week).then(res=>{
            if(res.data.status===1){
               setisload(true);
            }else{
                alert(res.data.message);
            }
        });
    }
    
    
    return (
        <div>
            <Utopnav/>
            <Usersidenav/>
           
            <div className="sideuser">
                {open ? (<CreateGarage setopen={setopen} handleclose={handleclose}/>):(
                <>
                    {havegarage ? (
                        <Mygarage setload={setisload} garage={mygarage} product={product} activate={activate}/>
                    ):(
                        <>
                             <div className="garage-container shadow">
                                  <p className="animate__animated animate__fadeInDown center text-warning">{message}</p>
                                        <div className="d-flex">    
                                             <div className="mr-auto p-2">
                                                 <h4>Your Garage</h4>
                                            </div>
                                             <div className="p-2">      
                                                 <button className="btn btn-primary" onClick={handleopen}>Create Garage</button>
                                              </div>
                                        </div>
                             </div>        
                        </>        
                    )}
               
                    </>
                    )}
                
            </div>

        </div>
    )
}

export default Garage
