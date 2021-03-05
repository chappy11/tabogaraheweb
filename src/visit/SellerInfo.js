import React from 'react'
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItemAvatar, ListItemText } from '@material-ui/core'
import {ServerUrl as url} from '../ServerUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faEnvelope, faMapMarker, faPhoneAlt, faRing, faVenusMars } from '@fortawesome/free-solid-svg-icons';
function SellerInfo({openinfo,setopeninfo,user}) {
    return (
        <div>
            <Dialog open={openinfo} onClose={()=>setopeninfo(!openinfo)} fullWidth={true}>
                <DialogTitle>Seller Information</DialogTitle>
                <DialogContent>
                        <div className="row">
                            <div className="col-md-5">
                                <img src={url+user.acnt_pic} alt={user.img} className="mx-auto d-block garage-pic rounded-circle"/>
                                <p className="lead text-center">{user.firstname+" "+user.mi+" "+user.lastname}</p>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-sm-2">
                                        <p className="text-info"><FontAwesomeIcon icon={faEnvelope}/></p>
                                    </div>
                                    <div className="col">
                                        <p className="">{user.email}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <p className="text-info"><FontAwesomeIcon icon={faPhoneAlt}/></p>
                                    </div>
                                    <div className="col">
                                        <p className="">{user.contact}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <p className="text-info"><FontAwesomeIcon icon={faVenusMars}/></p>
                                    </div>
                                    <div className="col">
                                        <p className="">{user.gender}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <p className="text-info"><FontAwesomeIcon icon={faRing}/></p>
                                    </div>
                                    <div className="col">
                                        <p className="">{user.civil_status}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <p className="text-info"><FontAwesomeIcon icon={faBirthdayCake}/></p>
                                    </div>
                                    <div className="col">
                                        <p className="">{user.birthdate}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <p className="text-info"><FontAwesomeIcon icon={faMapMarker}/></p>
                                    </div>
                                    <div className="col">
                                        <p className="">{user.sitio+" "+user.brgy}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                </DialogContent>
                <DialogActions>
                    <button className="btn btn-danger" onClick={()=>setopeninfo(!openinfo)}>Close</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SellerInfo
