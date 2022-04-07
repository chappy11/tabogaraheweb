import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import React from 'react'

function ReasonDialog({reason,open,handleclose}) {
    return (
       <Dialog open={open} onClose={handleclose} fullWidth={true}>
           <DialogTitle>
               Reason of Returning
           </DialogTitle>
           <DialogContent>
           <DialogContentText>
               {reason}
           </DialogContentText>
           </DialogContent>
           <DialogActions>
               <button className="btn btn-danger" onClick={handleclose}>
                   close
               </button>
           </DialogActions>
       </Dialog>
    )
}

export default ReasonDialog
