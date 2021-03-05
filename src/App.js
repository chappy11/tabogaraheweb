import React from "react";
import "leaflet/dist/leaflet.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./home/Home";
import Myprofile from './user/Myprofile';
import About from "./home/About";
import Account from "./home/Account";
import Userpage from "./user/Userpage";
import Admin from "./admin/Admin";
import Adminprofile from "./admin/Adminprofile";
import AdminList from "./admin/AdminList";
import Userlist from "./admin/Userlist";
import Itemlist from "./admin/Itemlist";
import ViewUser from "./ViewUser";
import Inventory from "./user/Inventory";
import Logout from "./Logout";
import CheckItem from "./admin/CheckItem";
import Decline from "./admin/Decline";
import Notif from "./user/Notif";
import UviewItem from './user/inventory/UviewItem';
import Garage from "./user/Garage";
import Viewmap from "./map/Viewmap";
import Updategarage from "./user/garage/Updategarage";
import Category from "./buyer/Category";
import Visitgarage from "./Visitgarage";
import ViewProduct from "./visit/ViewProduct";
import Order from "./order/Order";
import Negotiable from "./negotiable/Negotiable";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/account" component={Account} />
          {/* user page */}
          <Route path="/user" component={Userpage} />
          {/* admin page */}
          <Route path="/admin" component={Admin} />
          <Route path="/adminprofile" component={Adminprofile}/>
          <Route path="/adminlist" component={AdminList}/>
          <Route path="/userlist" component={Userlist}/>
          <Route path="/itemlist" component={Itemlist}/>
          <Route path="/viewuser/:id" component={ViewUser}/>
          <Route path="/checkitem/:item_id/:user_id" component={CheckItem}/>
          <Route path="/decline/:item_id/:user_id" component={Decline}/>
          {/* user page */}
          <Route path="/userinventory" component={Inventory}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/notification" component={Notif}/>
          <Route path="/uviewitem/:item_id" component={UviewItem}/>
          <Route path="/myprofile" component={Myprofile}/>
          <Route path="/mygarage" component={Garage}/>
          <Route path="/viewmap/:lat/:lng" component={Viewmap}/>
          <Route path="/updategarage/:garage_id" component={Updategarage}/>
          <Route path="/category/:category" component={Category}/>
          <Route path="/visitgarage/:garage_id" component={Visitgarage}/>
          <Route path="/viewproduct/:product_id" component={ViewProduct}/>
          <Route path="/negotiable" component={Negotiable} />
          <Route path="/order" component={Order}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
