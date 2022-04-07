import React from 'react'
import {Dialog,DialogTitle,DialogContent,DialogActions} from "@material-ui/core";
import Notifbutton from './Notifbutton';
function CheckNotif({notf,open,handleclose}) {
    const store = JSON.parse(localStorage.getItem("user"));
    return (
        <div>
            <Dialog fullWidth={true} open={open} onClose={handleclose}>
                <DialogTitle>Notification</DialogTitle>
                <DialogContent>
                    <p>Dear {store.fname+" "+store.lname}</p>
                    <p>We would like to inform you that {" " +notf.notif_body}</p>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>            
        </div>
    )
}

export default CheckNotif
