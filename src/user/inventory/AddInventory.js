import React, { Component } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import {Unitdata as un} from "../../Unitdata";
import Category from "../../Categorydata";
import {Message as mess} from '../../Message';
import model from '../model/Usermodel';
export class AddInventory extends Component {
    fileObj = [];
    fileArray = [];
    filename= [];
    counter = [];
    constructor(props){
        super();
        this.state = {
            file:[null],
            id:JSON.parse(localStorage.getItem("user")).id,
            img1:null,
            img2:null,
            img3:null,
            name:"",
            descp:"",
            catg:"",
            prc:"",
            cond:"",
            unt:"",
            qty:"",
            message:{
                cName:"",
                msg:""
            },
            open:false
        }
        this.handleopen = this.handleopen.bind(this);
        this.close = this.close.bind(this);
        this.getImage = this.getImage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.save = this.save.bind(this);
        this.clear = this.clear.bind(this);
    }
    handleopen = () =>{
        
        this.setState({open:true});
        this.props.setisLoad(true);
    }
    close = () =>{
       
        this.setState({open:false})
        this.props.setisLoad(false);
        this.fileArray = [];
    }
    getImage = (e) =>{
        this.fileObj.push(e.target.files);
        for(let i=0; i<this.fileObj[0].length; i++){
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
            this.filename.push(this.fileObj[0][i]);
        }
        this.setState({file:this.fileArray});
    }

    onChange = (e) =>{
        this.setState({...this.state,[e.target.name]:e.target.value});
    }
    clear = () =>{
        setTimeout(() => {
            this.setState({message:{
                cName:"",
                msg:""
            }})    
        }, 5000);
        
    }
    save = (e) =>{
        e.preventDefault();
        let count = this.fileArray.length;
        
        // eslint-disable-next-line eqeqeq
        if(count != 3){
            this.setState({message:{
                msg:"Pls choose 3 images",
                cName:mess[1]
            }})
            this.clear();
        }else{
            const fd = new FormData();
            fd.append("id",this.state.id);
            fd.append("img1",this.fileObj[0][0],this.fileObj[0][0].name);
            fd.append("img2",this.fileObj[0][1],this.fileObj[0][1].name);
            fd.append("img3",this.fileObj[0][2],this.fileObj[0][2].name);
            fd.append("name",this.state.name);
            fd.append("desc",this.state.descp);
            fd.append("category",this.state.catg);
            fd.append("orig_price",this.state.prc);
            fd.append("quantity",this.state.qty);
            fd.append("unit",this.state.unt);
            fd.append("cond",this.state.cond);
            model.add(fd).then(res=>{
                if(res.data.status===0){
                    this.setState({message:{
                        msg:res.data.message,
                        cName:mess[1]
                    }})
                    this.clear();
                }else{
                    this.setState({message:{
                        msg:res.data.message,
                        cName:mess[0]
                    }})
                    setTimeout(()=>{
                        this.setState({message:{
                            msg:"",
                            cName:""
                        }})
                        this.close();
                    },5000)
                }
            })

        }
    }
    render() {
        console.log()
        return (
            <div>
                <button className="btn btn-primary" onClick={this.handleopen}>Add Item</button>
        <Dialog open={this.state.open}  fullWidth={true} onClose={this.close} fullScreen={true}>
                <DialogTitle>Add item in Inventory</DialogTitle>
                 <DialogContent>
              
                   <div className="row">
                       <div className="col-md-4">
                          {(this.fileArray || []).map((val,index)=>(
                              <>
                                <img src={val} alt={val} key={index} style={{width:"100px",height:"100px",margin:"2px"}}/>
                              </>
                          ))}
                       </div>
                       <div className="col-md-8">
                            <p className={this.state.message.cName}>{this.state.message.msg}</p>
                           <div className="form-group">
                               <label>Pick 3 images</label>
                                <input type="file" className="form-control" onChange={this.getImage} multiple/>
                           </div>
                           <div className="form-group">
                               <label>Item Name</label>
                                <input type="text" className="form-control" placeholder="Item Name" name="name" onChange={this.onChange}/>
                           </div>
                           <div className="form-group">
                               <label>Item Description</label>
                                <textarea type="text" className="form-control" placeholder="Item Name" name="descp"  rows="4" onChange={this.onChange}/>
                           </div>
                           <div className="form-group">
                               <label>Item Condition</label>
                                <select className="form-control" name="cond" onChange={this.onChange}>
                                    <option value="Used">Used</option>
                                    <option value="Slightly Used">Slightly Used</option>
                                </select>
                           </div>
                           <div className="row">
                            <div className="col-md-6">      
                                 <div className="form-group">
                                    <label>Item Category</label>
                                    <select className="form-control" name="catg" onChange={this.onChange}>
                                            <Category/>
                                    </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                    <div className="form-group">
                                    <label>Original Price of Item</label>
                                        <input type="number" className="form-control" name="prc" onChange={this.onChange}/>
                                </div>
                              </div>
                           </div>
                           <div className="row">
                               <div className="col-md-6">
                                   <div className="form-group">
                                       <label>Item Quantity</label>
                                        <input type="number" className="form-control" name="qty" onChange={this.onChange}/>
                                   </div>
                               </div>
                               
                               <div className="col-md-6">
                                   <div className="form-group">
                                       <label>Item Unit of Measure</label>
                                        <select className="form-control" name="unt" onChange={this.onChange}>
                                            {un.map((val,i)=>(
                                                <option value={val} key={i}>{val}</option>
                                            ))}
                                        </select>
                                   </div>
                               </div>
                           </div>
                           
                           
                       </div>
                   </div>
               </DialogContent>
               <DialogActions>
                   <button className="btn btn-primary" onClick={this.save}>save</button>
                    <button className="btn btn-danger" onClick={this.close}>close</button>
               </DialogActions>
            </Dialog>
            </div>
        )
    }
}

export default AddInventory
