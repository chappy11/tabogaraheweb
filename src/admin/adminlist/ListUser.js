import React from 'react'
import {ServerUrl as url} from '../../ServerUrl';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserTimes } from "@fortawesome/free-solid-svg-icons";
function ListUser({users,update}) {
    return (
        <table className="table table-borderless">
            <thead>
                <tr>
                    <th className="text-center">{' '}</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((val,index)=>(
                    <tr key={index}>
                        <td><img src={url+val.acnt_pic} alt={val.acnt_pic} className="rounded-circle tbl-img"/></td>
                        <td className="text-center"><a href={`/viewuser/${val.acnt_id}`}>{val.firstname+" "+val.lastname}</a></td>
                        <td className="text-center">{val.email}</td>
                        <td className={val.status==="active" ? "text-success center" : "text-danger center"}>{val.status}</td>
                        <td className="text-center">{val.status==="active" ? (<button className="btn btn-outline-danger btn-sm" onClick={(e) => update(e.target.value)} value={val.acnt_id}><FontAwesomeIcon icon={faUserTimes} />{' '} deactivate</button>):(<button  className="btn btn-outline-success btn-sm" onClick={(e) => update(e.target.value)} value={val.acnt_id}><FontAwesomeIcon icon={faUserCheck}/>{' '} activate</button>)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ListUser
