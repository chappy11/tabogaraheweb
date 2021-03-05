import axios from 'axios';
import {ServerUrl as myurl} from '../../ServerUrl';
class HomeModel {
    constructor(){
        this.url = myurl;
    }

    login = (params) =>{
        const headers = {
            "Content-Type":"text/plain"
        }
        return axios.post(this.url+"account/login",params,{headers});
    }
    email = (params) =>{
        const headers = {
            "Content-Type":"text/plain"
        }
        
        return axios.post(this.url+"email/sendEmail",params,{headers});
    }

    register = (params) =>{
        const headers={
            "Content-Type":"text/plain"
        }
        return axios.post(this.url+"account/register",params,{headers});
    }
    
}
export default new HomeModel();