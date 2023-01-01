/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { useDataContext, useLoginContext } from "../../state/hook/hooks";
import { getChucVu } from "../../layout/header/HeaderBar";
import Button from "react-bootstrap/Button";
import Notification from "../notification/notification";
import { ChangePassApi } from "../../API/auth";

export const Profile = () => {
  const [loginState, updateLoginState] = useLoginContext();
  const [user, setUser] = useState(loginState.user);
  const [data, updateData] = useDataContext();
  const { id } = useParams();
  let url_img = process.env.REACT_APP_API_ENDPOINT + loginState.user.imgPath;
  console.log(url_img);
  // "https://tinhdaunhuy.com/wp-content/uploads/2015/08/default-avatar.jpg";
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const [oldPass, setOldPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [pass1, setPass1] = useState("");
  const handleSend = async () => {
    if (pass1.length < 6) {
      Notification("info", "password phải có tối thiểu 6 ký tự");
      return;
    }
    if (pass1 !== pass2) {
      Notification("info", "Cần nhập lại password mới khớp với nhau");
      return;
    }
    const data = new FormData();
    data.append("type", "password");
    data.append("ollPass", oldPass);
    data.append("password", pass1);
    data.append("password_confirmation", pass2);
    const response = await ChangePassApi(loginState.user.id, data);
    if (response.success) {
      Notification("success", "Thay Đổi mật khẩu thành công");
      handleClose();
    } else {
      console.log(response.error.response.data.data);
      Notification("error", response.error.response.data.data[0]);
    }
  };

  useEffect(() => {
    if (id != loginState.user?.id) {
      setUser(data.data);
    } else {
      setUser(loginState.user);
    }
  }, [id]);
  console.log(user);
  return (
    <div className="profile">
      <div className="col1" style={{ margin: "20px", display: "flex" }}>
        <div
          style={{
            alignItems: "center",
            marginLeft: "1vw",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={url_img}
            style={{
              maxHeight: "30vh",
              maxWidth: "30vh",
              borderRadius: "15vh",
              paddingBottom: "10px",
            }}
          />
          <Button
            onClick={() => {
              setShow(true);
            }}
            className="btn"
            style={{ alignItems: "center", width: "70%" }}
          >
            Đổi mật khẩu
          </Button>
        </div>
        <div
          className="col2"
          style={{ display: "flex", flexDirection: "column", flex: 1 }}
        >
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Col lg={4}>
              <h4 className="float-right clear-both font-bold">Hồ sơ:</h4>
              <h4 className="float-right clear-both font-bold">ID: </h4>
              <h4 className="float-right clear-both font-bold">Tên:</h4>
              <h4 className="float-right clear-both font-bold">Email: </h4>
              <h4 className="float-right clear-both font-bold">
                Nơi làm việc:
              </h4>
            </Col>
            <Col lg={6} className="">
              <h4 className="float-left clear-both">{"Nhân Viên"}</h4>
              <h4 className="float-left clear-both">{id || "Chưa có id"}</h4>
              <h4 className="float-left clear-both">
                {user?.name || "Chưa có tên"}
              </h4>
              <h4 className="float-left clear-both">
                {user?.email || "Chưa có email"}
              </h4>
              <h4 className="float-left clear-both">
                {user?.workPlate || "Chưa có nơi làm việc"}
              </h4>
            </Col>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} className="modal-custom bg-dark">
        <Modal.Header closeButton>
          <Modal.Title>Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="wrapper" style={{ width: "auto", height: "auto" }}>
            <div className="box" style={{ width: "400px", height: "300px" }}>
              <div className="form">
                <div style={{ margin: "20px" }}>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className="register"
                      required
                      onChange={(e) => {
                        setOldPass(e.target.value);
                      }}
                    />
                    <span>Mật khẩu cũ</span>
                    <i></i>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className="register"
                      required
                      onChange={(e) => {
                        setPass1(e.target.value);
                      }}
                    />
                    <span>Mật khẩu mới</span>
                    <i></i>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className="register"
                      required
                      onChange={(e) => {
                        setPass2(e.target.value);
                      }}
                    />
                    <span>Nhập lại mật khẩu</span>
                    <i></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ width: "100%" }}
            variant="primary"
            onClick={handleSend}
          >
            Xác nhận
          </Button>
          <Button
            style={{ width: "100%" }}
            variant="secondary"
            onClick={handleClose}
          >
            Huỷ
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
