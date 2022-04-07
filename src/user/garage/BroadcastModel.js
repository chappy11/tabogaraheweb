import axios from "axios";
import { ServerUrl } from "../../ServerUrl";

class BroadcastModel {

    constructor(){
        this.server = ServerUrl+'broadcast/';
    }

    activate = (data) =>{
        const headers = {
            "Content-Type" : "text/plain"
        }
        return axios.post(this.server + 'insert',data,{headers});
    }
}

export default new BroadcastModel();