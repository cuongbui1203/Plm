import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "./registerForm.css";
import Button from "react-bootstrap/Button";
import { getWorkPlatesApi } from "../../API/Other";
import { customStyles } from "../createRequest/CR";
import Select from "react-select";
import { registerApi } from "../../API/auth";
import Notification from "../notification/notification";
import { isEmail, isEmpty } from "../../hook/OtherHook";
const roles = [
  {
    label: "Ban Điều Hành",
    value: 1,
  },
  {
    label: "Nhà Máy",
    value: 2,
  },
  {
    label: "Trung Tâm Điều Phối",
    value: 3,
  },
  {
    label: "Trung Tâm Bảo Hành",
    value: 4,
  },
];

export default function RegisterForm({ handleClose }) {
  const [wp, setWp] = useState([]);

  // validator
  const [name, setName] = useState("");
  const [emai, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [wpId, setWpId] = useState("");
  const [role, setRole] = useState(-1);
  const [validateMess, setValidateMess] = useState({});
  const [file, setFile] = useState(null);
  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };
  console.log(file);
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  const validateAll = () => {
    const msg = {};
    let i = 0;
    if (isEmpty(name)) {
      msg.name = "Không được để trống";
      i++;
    }
    if (isEmpty(password)) {
      i++;
      msg.password = "Không được để trống";
    } else if (password.length <= 6) {
      i++;
      msg.password = "Password phải dài hơn 6 ký tự";
    }
    if (isEmpty(password2)) {
      i++;
      msg.password2 = "Không được để trống";
    } else if (password !== password2) {
      i++;
      msg.password2 = "Mật khẩu không khớp";
    }
    if (isEmpty(emai)) {
      i++;
      msg.email = "Không được để trống";
    } else if (!isEmail(emai)) {
      i++;
      msg.email = "Vui lòng nhập email hợp lệ";
    }
    if (!wpId) {
      i++;
      msg.wp = "Không được để trống";
    }
    setValidateMess(msg);
    return i === 0;
  };

  //end validator
  const handleChangeWP = (e) => {
    if (e) {
      setWpId(e.value);
    } else {
      setWpId(null);
    }
  };
  const handleChanelRole = async (e) => {
    console.log(e.value);
    // selectInputRef.current.select.clearValue();
    setRole(e.value);
    const response = await getWorkPlatesApi(e.value);
    if (response.success) {
      const tg = [];
      response.data.map((element, i) => {
        tg.push({
          label: element.name,
          value: element.id,
        });
      });
      setWp(tg);
    }
    console.log(response.data);
  };
  // console.log(wpId);

  const register = async () => {
    if (!validateAll()) {
      console.log("ok");
      return;
    }

    // handleClose();
    const data = new FormData();
    data.append("name", name);
    data.append("email", emai);
    data.append("password", password);
    data.append("password_confirmation", password2);
    data.append("workPlateId", wpId);
    data.append("roleId", role);
    if (file) {
      data.append("image", file, "name");
    }
    const response = await registerApi(data);
    if (response.success) {
      Notification("success", "Tạo tài khoản thành công");
    } else {
      Notification("error", "Tạo tài khoản thất bại");
    }
    handleClose();
  };

  return (
    <div id="wrapper">
      <div className="box">
        <div className="form">
          <h3>Tạo tài khoản</h3>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="register"
              required
              onChange={onChangeName}
            />
            <span>Tên</span>
            <i></i>
          </div>
          <div style={{ color: "red" }}>&#160;{validateMess.name}</div>
          <div className="form-group">
            <input
              type="text"
              name="email"
              id="email"
              className="register"
              required
              onChange={onChangeEmail}
            />
            <span>Email</span>
            <i></i>
          </div>
          <div style={{ color: "red", height: "30px" }}>
            &#160;{validateMess.email}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              className="register"
              required
              onChange={onChangePassword}
            />
            <span>Mật khẩu</span>
            <i></i>
          </div>
          <div style={{ color: "red", height: "30px" }}>
            &#160;{validateMess.password}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password_confirm"
              className="register"
              required
              onChange={onChangePassword2}
            />
            <span>Nhập lại mật khẩu</span>
            <i></i>
          </div>
          <div style={{ color: "red", height: "30px" }}>
            &#160;{validateMess.password2}
          </div>
          <div className="form-group">
            <Select
              defaultValue={roles[0]}
              options={roles}
              isSearchable={true}
              isClearable
              styles={customStyles}
              onChange={handleChanelRole}
            />
            <i></i>
          </div>
          <div style={{ color: "red", height: "30px" }}>&#160;</div>
          <div className="form-group">
            <Select
              defaultInputValue=""
              options={wp}
              value={wp[0]}
              isClearable
              isSearchable={true}
              styles={customStyles}
              onChange={handleChangeWP}
            />
            <i></i>
          </div>
          <div style={{ color: "red", height: "30px" }}>
            &#160;{validateMess.wp}
          </div>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
              type="file"
              controlid="PLImg"
              accept=".jpg, .jpeg, .png"
              onChange={onChangeFile}
            />
          </Form.Group>
          <div className="btn-container">
            <Button variant="secondary" className="btn" onClick={handleClose}>
              cancel
            </Button>
            <Button variant="primary" className="btn" onClick={register}>
              create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
