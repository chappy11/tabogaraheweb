
class RouteModel{
    constructor(){
        this.homeroute = ["/","/about","/account"];
        this.adminroute = ["/admin"];
        this.userroute = ["/user"];
        this.type = localStorage.getItem("type");
    }

    check = (link) =>{
        if(this.type!==null){
            if(this.type==="admin" || this.type === "admin2"){
                let rot = this.adminroute.some(res=> res===link);
                return rot ? "" : window.location.pathname="/admin";
            }else if(this.type==="user"){
                let rot = this.userroute.some(res=> res===link);
                return rot ? "" : window.location.pathname="/user";
            }
        }else{
            let rot = this.homeroute.some(res=>res===link);
            return rot ? "" : window.location.pathname="/show_404";
        }
    }
}

export default new RouteModel();