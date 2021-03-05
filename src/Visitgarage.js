import React from 'react'
import Utopnav from './user/navigation/Utopnav'
import Visitheader from './visit/Visitheader'
import {useParams} from 'react-router-dom';
import Productlist from './visit/Productlist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Mycart from './visit/Mycart';
function Visitgarage() {
    const {garage_id} = useParams();
    return (
        <div>
            <Utopnav/>
            <div className="g-margin">
                        <div className="visit-container">
                                                       <div className="mt-3">
                            <div className="row mb-3">
                                <div className="col-md-8">
                                <Visitheader garage_id={garage_id}/>

                                    <Productlist garage_id={garage_id}/>
                                </div>
                                <div className="col-md-4">
                                    <div className="cart-container  mt-0">
                                    <div className="cart-header"><h4 ><FontAwesomeIcon icon={faCartPlus}/> My Cart</h4></div>
                                    <Mycart garage_id={garage_id}/>
                                    </div>
                                  
                                </div>
                            </div>
                            
                            </div>
                            
                        </div>
                    </div>
                </div>
    )
}

export default Visitgarage
