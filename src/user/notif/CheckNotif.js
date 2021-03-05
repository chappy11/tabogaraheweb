import React from 'react'
import {Dialog,DialogTitle,DialogContent,DialogActions} from "@material-ui/core";
function CheckNotif({notf,open,handleclose}) {
    const store = JSON.parse(localStorage.getItem("user"));
    return (
        <div>
            <Dialog fullWidth={true} open={open} onClose={handleclose}>
                <DialogTitle>Notification</DialogTitle>
                <DialogContent>
                    <p>Dear {store.fname+" "+store.lname}</p>
                    <p>We would like to infor you that</p>
                    <p>{notf.notif_body}</p>
                </DialogContent>
            </Dialog>            
        </div>
    )
}

export default CheckNotif
