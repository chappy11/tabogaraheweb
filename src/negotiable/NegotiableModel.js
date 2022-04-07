import axios from "axios";
import { ServerUrl } from "../ServerUrl";



class NegotiableModel {

    constructor(){
        this.server = ServerUrl + "pakyaw/";
    }

    pakyaw = (acnt_id) =>{
        return axios.get(this.server + "all/"+acnt_id);
    }

    item = (acnt_id) =>{
        return axios.get(this.server + "items/"+acnt_id);
    }

    accept = (pakyaw_id) =>{
        return axios.post(this.server + 'accept/'+pakyaw_id);
    }

}

export default new NegotiableModel();