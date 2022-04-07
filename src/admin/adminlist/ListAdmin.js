import React from "react";
import {ServerUrl as url} from '../../ServerUrl';
import { IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserTimes } from "@fortawesome/free-solid-svg-icons";
function ListAdmin({admins}) {
  return (
    <table className="table table-borderless">
      <thead>
        <tr>
          <th>{''}</th>
          <th className="text-center">Name</th>
          <th className="text-center">Email</th>
          <th className="text-center">Username</th>
          <th className="text-center">Status</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
          {admins.map((val,index)=>(
              <tr key={index}>
                <td className="text-center"><img src={url+val.acnt_pic} alt={val.acnt_pic} className="tbl-img rounded-circle"/></td>
                <td className="text-center">{val.firstname+" "+val.lastname}</td>
                <td className="text-center"><a href={`/viewadmin/${val.acnt_id}`} className="btn btn-link">{val.email}</a></td>
                <td className="text-center">{val.username}</td>
                <td className={val.status==="active" ? "text-success center": "text-danger center"}>{val.status}</td>
                <td>{val.status==="active" ? (<button className="btn btn-outline-danger btn-sm"> <FontAwesomeIcon icon={faUserTimes} />{" "}deactivate</button>) : (<button className="btn btn-outline-success btn-sm"> <FontAwesomeIcon icon={faUserCheck }/>{" "}activate</button>)}</td>  
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default ListAdmin;
