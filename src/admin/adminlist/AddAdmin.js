import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import {Barangay as bgy} from '../../Barangay'; 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
function AddAdmin({handleclose,open,onChange,save,message,isload}) {
    return (
        <div>
            <Dialog open={open} onClose={handleclose} fullWidth={`fullwidth`}>
                <DialogTitle>Add Admin</DialogTitle>
                <DialogContent>
                    {isload ? (<p className="text-info center"><FontAwesomeIcon icon={faCircleNotch} spin/> loading...</p>):""}
                    <p className={message.msgclas}>{message.msg}</p>
                    <div className="form-group">
                        <label >Name</label>
                        <div className="row">
                            <div className="col-md-6">
                                <input type="text" className="form-control" onChange={onChange} name="fname" placeholder="Firstname"/>
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="form-control" onChange={onChange} name="lname" placeholder="Lastname"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label >Email</label>
                        <input className="form-control" name="email" onChange={onChange} placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <label >Contact</label>
                        <input className="form-control" name="contact" onChange={onChange} placeholder="Phonenumber"/>
                    </div>
                    <div className="form-group">
                        <label >Sitio</label>
                        <input className="form-control" name="sitio" onChange={onChange} placeholder="Street NO./Sitio"/>
                    </div>
                    <div className="form-group">
                        <label>Barangay</label>
                        <select className="form-control" name="brgy"  onChange={onChange}>
                            {bgy.map((val,index)=>(
                                <option key={index} value={val}>{val}</option>
                            ))}
                        </select>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button className="btn btn-primary" onClick={save}>Add Admin</button>
                    <button className="btn btn-danger" onClick={handleclose}>close</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddAdmin
