import axios from 'axios';
import {ServerUrl as url} from '../../ServerUrl'
class Buyer_Model{
    constructor(){
        this.url=url;
    }

    garageUser =(garage_id)=>{
        return axios.get(this.url+"garage/garageuser/"+garage_id);
    }

    getproduct = (product_id) =>{
        return axios.get(this.url+"product/checkproduct/"+product_id);
    }

    addtocart = (params) =>{
        const headers = {
            "Content-Type":"text/plain"
        }
        return axios.post(this.url+"cart/addcart",params,{headers});
    }

    getcart = (buyer_id,garage_id) =>{
        return axios.get(`${this.url}cart/getcart/${buyer_id}/${garage_id}`);
    }

    increamenItem =(cart_id) =>{
        return axios.post(this.url+"cart/addcartno/"+cart_id);
    }

    decreamentItem =(cart_id) =>{
        return axios.post(this.url+"cart/minuscartno/"+cart_id);
    }

    removeitemcart = (cart_id) =>{
        return axios.post(this.url+"cart/removeitem/"+cart_id);
    }

    removeproduct = (item_id)=>{
        return axios.post(this.url+"product/removeproduct/"+item_id);
    }

    requestnegotiable = (params) =>{
        const headers = {
            "Content-Type":"text/plain"
        }
        return axios.post(this.url+"negotiable/reqneg",params,{headers});
    }
    
    getnegotiate = (acnt_id,product_id) =>{
        return axios.get(this.url+"negotiable/getreq/"+acnt_id+"/"+product_id);
    }

    viewrequest = (acnt_id) =>{
        return axios.get(this.url+"negotiable/viewrequest/"+acnt_id);
    }
    acceptnego = (neg_id) =>{
        return axios.post(this.url+"negotiable/accept/"+neg_id);
    }
}

export default new Buyer_Model();