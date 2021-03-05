import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'

function MessageDialog({openmessage,setopenmessage}) {
    return (
        <div>
            <Dialog open={openmessage} onClose={()=>setopenmessage(false)} fullWidth={true}>
                <DialogTitle>Message</DialogTitle>
                <DialogContent>
                    <div className="form-group m-3">
                        <label className="text-info">Message</label>
                        <textarea row="3" className="form-control"/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button className="btn btn-success">Send</button>
                    <button className="btn btn-danger">Close</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default MessageDialog;
