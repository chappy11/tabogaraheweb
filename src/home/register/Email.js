import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch as spinner,faEnvelope } from "@fortawesome/free-solid-svg-icons";
import model from "../model/HomeModel";
import { Message as mes } from "../../Message";
function Email({ setdat, count, updatecount }) {
  const [data, setdata] = useState({
    email: "",
    code: Math.floor(1000 + Math.random() * 900000),
  });
  const [btnshow, setbtnshow] = useState(true);
  const [message, setmessage] = useState({
    msg: "",
    msgclas: "",
  });

  const onChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const setmes = () => {
    setTimeout(() => {
      setmessage({
        msg: "",
        msgclas: "",
      });
      setbtnshow(true);
    }, 5000);
  };
  const send = (e) => {
    e.preventDefault();

    if (data.email === "") {
      setmessage({
        msg: "Fill out all fields",
        msgclas: mes[1],
      });
      setmes();
    } else {
      setbtnshow(false);
      model.email(data).then((res) => {
        console.log(res);
        if (res.data.status === 0) {
          setmessage({
            msg: res.data.message,
            msgclas: mes[1],
          });
          setmes();
         
        } else {
          setdat(data);
          setmessage({
            msg: res.data.message,
            msgclas: mes[0],
          });
          setTimeout(() => {
            updatecount((count) => count + 1);
            setmessage({
              msg:"",
              msgclas:""
            })
          }, 5000);
        }
      });
    }
  }
  return (
    <div className="register-email">
      <p className="register-text-email lead center font-color-primary">
        <FontAwesomeIcon icon={faEnvelope} className="text-secondary"/> Enter your email here and we wil send you a code..
      </p>
      <div className="form-group">
        <label className="text-info">Email</label>
        <input
          className="form-control form-control-lg"
          onChange={onChange}
          name="email"
        />
      </div>
      {btnshow ? (
        <button className="btn btn-primary" onClick={send}>
          Send Code
        </button>
      ) : (
        <p className="font-color-primary center">
          <FontAwesomeIcon icon={spinner} spin /> Sending,Please wait....
        </p>
      )}
      <p className={message.msgclas}>{message.msg}</p>
    </div>
  );
}

export default Email;
