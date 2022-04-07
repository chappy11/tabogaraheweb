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

    removenegotiable = (neg_id) =>{
        return axios.post(this.url+"negotiable/removeneg/"+neg_id);
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

    makeorder = (params) =>{
        const headers = {
            "Content-Type":"text/plain"
        }
        return axios.post(this.url+"order/makeOrder",params,{headers})
    }

    getOrder = (acnt_id) =>{
        return axios.get(this.url+"order/getOrder/"+acnt_id);
    }

    haveorder = (buyer_id,garage_id) =>{
        return axios.get(this.url+"order/haveOrder/"+buyer_id+"/"+garage_id);
    }

    myorder = (acnt_id) =>{
        return axios.get(this.url+"order/myorder/"+acnt_id);
    }

    orderdata = (order_id) =>{
        return axios.get(this.url+'order/orderdata/'+order_id);
    }
    salesorderdata = (order_id) =>{
        return axios.get(this.url + 'order/salesorderdata/'+order_id);
    }

    orderreq = (order_id) =>{
        return axios.get(this.url + 'order/orderreq/'+order_id);
    }

    cancelOrder = (order_id) =>{       
        return axios.post(this.url+"order/cancelOrder/"+order_id);
    }

    deliver = (order_id,status) =>{
        return axios.post(this.url+"order/deliver/"+order_id+'/'+status);
    }
    pickup = (order_id) =>{
        return axios.post(this.url+"order/pickup/"+order_id);
    }
    orderlistitem = (order_id) =>{
        return axios.get(this.url+"order/getorderitemlist/"+order_id);
    }

    getOrder = (acnt_id)=>{ 
        return axios.get(this.url+"order/getOrder/"+acnt_id);
    }

    createrate = (params) =>{
        const headers ={
            "Content-Type":"text/plain"
        }
        return axios.post(this.url+"rating/rate",params,{headers});
    }
    getrating = (send,rec) =>{
        return axios.get(this.url+"rating/getrate/"+send+"/"+rec);
    }

    mycurrentrate = (order_id,send_id,rec_id) =>{
        return axios.get(this.url + "rating/getrate/"+order_id+"/"+send_id+"/"+rec_id);
    }

    getallmessage = (id) =>{
        return axios.get(this.url+"message/recieve/"+id);
    }
    messages = (acnt_id,chatmate) =>{
        return axios.get(this.url+"message/messages/"+acnt_id+"/"+chatmate);
    }
    send = (params) =>{
        const headers={
            "Content-Type":"text/plain"
        }
        return axios.post(this.url+"message/send",params,{headers});
    }

    averagerate = (acnt_id) =>{
        return axios.get(this.url+"rating/averate/"+acnt_id);
    }

    salesreport = (acnt_id) =>{
        return axios.get(this.url+"order/salesreport/"+acnt_id);
    }

    category = (category,myid) =>{
        return axios.get(this.url+"product/category/"+category+"/"+myid);
    }

    checkreturn = (buyer_id,order_id) =>{
        return axios.get(this.url+"return_item/checkreturn/"+buyer_id+"/"+order_id);
    }
   
    returnitem = (params) =>{
        const headers = {
            "Content-Type":"text/plain"
        }
        return axios.post(this.url+"return_item/requestreturn",params,{headers});
    }

    allreturn = (seller_id) =>{
        return axios.get(this.url+"return_item/getall/"+seller_id);
    }
    reponsereturn = (return_id,status) =>{
        return axios.post(this.url+"return_item/response/"+return_id+"/"+status);
    }

    myreturn = (buyer_id) =>{
        return axios.get(this.url+"return_item/history/"+buyer_id);
    }

    createPayment = (fd) =>{
        const headers = {
           "Content-Type":"text/plain"
        }
        return axios.post(this.url + 'payment/createPayment',fd,{headers});
    }

    viewPayment = (order_id) =>{
        return axios.get(this.url + 'payment/viewPayment/'+ order_id);
    }

    current_category = (category) =>{
        return axios.get(this.url +  'category/getcat/' + category);
    }
}

export default new Buyer_Model();