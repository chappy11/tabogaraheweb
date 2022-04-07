import axios from "axios";
import {ServerUrl as myurl} from "../../ServerUrl";

class AdminModel{
    constructor(){
        this.url = myurl;
    }

    profile = (id) =>{
        return axios.get(this.url+"account/profile/"+id);
    }

    updateAdmin = (params) =>{
        const headers = {
            "Content-Type":"text/plain"
        }
        return axios.post(this.url+"account/updateDetails",params,{headers});
    }

    updatePic = (params) =>{
        const headers = {
            "Content-Type":"multipart/form-data"
        }
        return axios.post(this.url+"account/updatepic",params,{headers});
    } 

    updatepass = (params) =>{
        const headers = {
            "Content-Type":"text/plain"
        }
        return axios.post(this.url+"account/updatePassword",params,{headers})
    }

    adminlist = (type) =>{
        return axios.get(this.url+"account/userlist/"+type);
    }

    addAdmin = (params) =>{
        const headers = {
            "Content-type":"text/plain"
        }
        return axios.post(this.url+"account/createadmin",params,{headers});

    }

    updatestatus = (id,status) => {
        return axios.post(this.url+"account/updateStatus/"+id+"/"+status);
    }

    getItems = () =>{
        return axios.get(this.url+"item/toValidated");
    }

    viewItem = (item_id)=>{
        return axios.get(this.url+"item/getItem/"+item_id);
    }

    acceptItem = (id,status)=>{
        return axios.post(this.url+"item/updateStatus/"+id+"/"+status);
    }

    decline = (params) =>{
        const headers = {
            "Content-Type":"text/plain"
        }
        return axios.post(this.url+"notif/createNotif",params,{headers});
    }

    getcategory = () =>{
        return axios.get(this.url+"category/categories");
    }

    addcat = (params) =>{
        const headers={
            "Content-Type":"multipart/form-data"
        }
        return axios.post(this.url+"category/addcat",params,{headers});
    }
  
}

export default new AdminModel();