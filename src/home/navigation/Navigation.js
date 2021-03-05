import React,{useEffect} from "react";
import { homedata } from "../navdata/homedata";
import logo from "../../images/JOHN_LOGO.png";
import RouteModel from "../../RouteModel";
function Navigation() {
  
  useEffect(() => {
    RouteModel.check(window.location.pathname);
  }, [])
  return (
    <div>
      <div className="homenav shadow-sm">
        <img src={logo} className="nav-logo" alt={logo} />
        <ul className="nav-ul">
          {homedata.map((item, index) => {
            return (
              <li
                className={item.cName}
                key={index}
                id={window.location.pathname === item.url ? "active" : ""}
                onClick={() => {
                  window.location.pathname = item.url;
                }}
              >
                {item.title}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
