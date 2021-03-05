import axios from "axios";
import {ServerUrl as url} from "../../ServerUrl";

class Usermodel {
    constructor(){
        this.url = url;

    }
    updateinfo = (params) =>{
        const headers = {
            "Content-Type":"text/plain"
        }
        return axios.post(this.url+"account/updateDetails",params,{headers});
    }

    profilepic = (params) =>{
        const headers ={
            "Content-Type":"multipart/form-data"
        }
        return axios.post(this.url+"account/updatepic",params,{headers});
    }
    add = (params) =>{
        const headers = {
            "Content-Type":"multipart/form-data"
        }
        return axios.post(this.url+"item/addItem",params,{headers});
    }

    myitem = (id) =>{
        return axios.get(this.url+"item/myItem/"+id);
    }

    notifCounter = (acnt_id) =>{
        return axios.get(this.url+"notif/countUnread/"+acnt_id);
    }

    getnotif = (acnt_id) =>{
        return axios.get(this.url+"notif/getnotif/"+acnt_id);
    }
    read = (item_id)=>{
        return axios.post(this.url+"notif/read/"+item_id);
    }

    remove = (item_id) =>{
        return axios.post(this.url+"notif/deletenotif/"+item_id);
    }

    readAll = (acnt_id) =>{
        return axios.post(this.url+"notif/readall/"+acnt_id);
    }

    removeAll = (acnt_id) =>{
        return axios.post(this.url+"/notif/removeall/"+acnt_id);
    }

    getItem = (item_id) =>{
        return axios.get(this.url+"item/getItem/"+item_id);
    }

    update = (params) =>{
        const headers = {
            "Content-Type":"text/plain"
        }
        return axios.post(this.url+"item/updateItem",params,{headers});
    }

     myprofile = (user_id) => {
        return axios.get(this.url+"account/profile/"+user_id);
    }

    updatepass = (params) =>{
        const headers= {
            "Content-Type":"text/plain"       
        }
        return axios.post(this.url+"account/updatePassword",params,{headers});
    }

    getvalidated = (id) =>{
        return axios.get(this.url+"item/countvalidated/"+id);
    }

    creategarage = (data) =>{
        const headers = {
            "Content-Type":"text/plain"
        }
        return axios.post(this.url+"garage/addGarage",data,{headers});
    }

    mygarage=(acnt_id) =>{
        return axios.get(this.url+"garage/mygarage/"+acnt_id);
    }
    updatgaragepic = (params) =>{
        const headers ={
            "Content-Type":"multipart/form-data"
        }
            return axios.post(this.url+"garage/updatepic",params,{headers});
    }
    garagebyId = (garage_id) =>{
        return axios.get(this.url+"garage/getgarageid/"+garage_id);
    }

    activategarage = (garage_id,week) =>{
        return axios.post(this.url+"garage/postgarage/"+garage_id+"/"+week);
    }

    updategarage = (params) =>{
        const headers = {
            "Content-Type" : "text/plain"
        }
        return axios.post(this.url+"garage/updategarage",params,{headers});
    }
    addProduct = (params) =>{
        const headers = {
            "Content-Type":"text/plain"
        }
        return axios.post(this.url+"product/addProduct",params,{headers});
    }

    viewProduct = (garage_id) =>{
        return axios.get(this.url+"product/viewproduct/"+garage_id);
    }

    availableproduct = (garage_id) =>{
        return axios.get(this.url+"product/availableprod/"+garage_id);
    }

    allgarages = (id) =>{
        return axios.get(this.url+"garage/allgarage/"+id);
    }
    

}


export default new Usermodel();