import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import {ServerUrl as url} from './ServerUrl'
function Viewloc({open,setopen,garage_loc}) {
    return (
        <div>
            <Dialog open={open} onClose={()=>setopen(false)} fullScreen={true}>
                <DialogTitle>Sreenshot of Location</DialogTitle>
                <DialogContent>
                    <img src={url+garage_loc} alt={garage_loc} style={{width:'100%',height:'100%'}}/>
                </DialogContent>
                <DialogActions>
                    <button className="btn btn-danger" onClick={()=>setopen(false)}>Close</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Viewloc
