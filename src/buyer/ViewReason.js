import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,  } from '@material-ui/core'
import React from 'react'

function ViewReason({open,setopen,reason}) {
    return (
        <Dialog
            open={open}
            onClose={()=>setopen(false)}
            fullWidth={true}
        >
            <DialogTitle>
                Reason of Returning
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {reason}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button className="btn btn-danger" onClick={()=>setopen(false)}> close</button>
            </DialogActions>
        </Dialog>
    )
}

export default ViewReason
