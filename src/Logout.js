import {useHistory} from 'react-router-dom';
import React from 'react';
import logo from './images/JOHN_LOGO.png'
function Logout() {
    const store = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();
    const onClick = () =>{
        localStorage.clear();
        window.location.pathname="/account";
    }
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',width:'100vw'}}>
                <div style={style.card}>
                    <h3 className="lead text-center">Thank You For Using TaboGarahe</h3>
                    <div style={style.container}>
                        <img src={logo} alt={logo} style={style.img}/>
                    </div>
                    <div className="row align-contents-center justify-content-center">
                            <button className="btn btn-danger m-3" onClick={onClick}>Logout</button>
                            <button className="btn btn-outline-danger m-3" onClick={()=>history.goBack()}>Back</button>
                    </div>
                </div>
        </div>
    )
}

export default Logout

const style = {
    card:{
        width:'30%',
        height:'50%',
        border:'1px solid lightgray',
        padding: '10px',
        borderRadius:'2%',
        boxShadow:'5px 5px lightgray',
        justifyContent:'center'
    },
    img:{
        width:'150px',
        height:'150px',       
    },
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    }
    

}