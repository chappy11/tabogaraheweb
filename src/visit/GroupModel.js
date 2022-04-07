import { ServerUrl } from "../ServerUrl"
import axios from 'axios';


class GroupModel{
    constructor(){
        this.server = ServerUrl + "groups/";
    }

    getgroups = (acnt_id) =>{
        return axios.get(this.server + "getgroup/"+acnt_id);
    }

   

    getuser = (acnt_id) =>{
        return axios.get(this.server + 'getusers/'+acnt_id);
    }
    
    member = (group_id) =>{
        return axios.get(ServerUrl + 'member/members/'+group_id);
    }

    addmember = (group_id,acnt_id) =>{
        return axios.post(ServerUrl + 'member/addmember/'+group_id+'/'+acnt_id);
    }

    addgroup = (data) =>{
        const headers = {
            "Content-Type":"text/plain"
        }
        return axios.post(this.server + 'addgroup',data,{headers});
    }

}

export default new GroupModel
