/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { Modal, Nav } from "react-bootstrap";
import "./SideBar.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoAdd } from "react-icons/io5";
import {
  getAllProductLine,
  createProduct,
  createProductLineApi,
} from "../../API/productApi";
import Select from "react-select";
import Notification from "../../components/notification/notification";
import { MDBInput } from "mdb-react-ui-kit";
import { useSettingContext } from "../../state/hook/hooks";
import { DSP, RQ, SP, TK, WP } from "../../state/constants";
import RegisterForm from "../../components/registerForm/registerForm";
import CreateWorkPlate from "../../components/workPlates/createWorkPlate";
import CR from "../../components/createRequest/CR";
const SideBar = () => {
  const [show, setShow] = useState(false);
  const [productLines, handle] = useState([]);
  const [plShow, setPlShow] = useState(false);
  const [selectId, setId] = useState(-1);
  const [settingState, updateSettingState] = useSettingContext();
  const [btnLabel, setBtnLabel] = useState("");
  const [validate, setValidate] = useState(false);
  const [show2, setVisible] = useState("none");
  const [registerShow, setRegisterShow] = useState(false);
  const [showCreateWp, setShowCreateWp] = useState(false);
  // const []
  const handleGetProductLine = async () => {
    let response = await getAllProductLine();
    console.log(response.data);
    if (response.success) {
      let res = [];
      response.data.map((item, index) => {
        // console.log(item.name)
        // console.log(item.productLineId)
        let tg = {
          label: item.name,
          value: item.productLineId,
        };
        res.push(tg);
      });

      handle(res);
    }
  };
  const handleCloseCreateWp = () => setShowCreateWp(false);
  // const handleOpenCreateWp = () => setShowCreateWp(true);
  const handleCloseRegister = () => {
    setRegisterShow(false);
  };
  useEffect(() => {
    setVisible("block");
    switch (settingState.create) {
      case SP:
        setBtnLabel("Tạo sản phẩm mới");
        break;
      case DSP:
        setBtnLabel("Tạo dòng sản phẩm mới");
        break;
      case TK:
        setBtnLabel("Tạo tài khoản mới");
        break;
      case WP:
        setBtnLabel("Tạo Work Plate Mới");
        break;
      case RQ:
        setBtnLabel("Tạo yêu cầu mới");
        break;
      default:
        setBtnLabel("");
        setVisible("none");
    }
  }, [settingState.create]);

  const handleShow = () => {
    console.log(settingState);
    switch (settingState.create) {
      case SP:
        handleGetProductLine();
        setShow(true);
        break;
      case DSP:
        handlePlShow();
        break;
      case TK:
        setRegisterShow(true);
        break;
      case WP:
        setShowCreateWp(true);
        break;
      default:
        setBtnLabel("");
        return;
    }
  };

  const handleClose = () => {
    switch (settingState.create) {
      case SP:
        // handleGetProductLine();
        setShow(false);
        break;
      case DSP:
        handlePlClose();
        break;
      case TK:
        handleCloseRegister();
        break;

      default:
        return;
    }
  };
  const handlePlClose = () => setPlShow(false);

  const handlePlShow = () => {
    setPlShow(true);
  };

  const handleChange = (e) => {
    setId(e.value);
  };

  const vald = (e) => {
    const error = e.target.parentNode.parentNode.childNodes[1];
    // console.log(e.target.parentNode.parentNode.childNodes[1]);
    if (!e.target.value) {
      error.innerHTML = "*Không được để trống " + e.target.placeholder;
      setValidate(false);
    } else {
      error.innerHTML = "";
      setValidate(true);
    }
  };

  const handleSendCreatePL = async (e) => {
    // Notification("error", "chuwa ddien ca truong can thiets");
    const formData = new FormData();
    const info = {
      color: document.getElementById("color").value,
      mass: document.getElementById("khoiLuong").value,
      ramRom: document.getElementById("RAM/ROM").value,
      display: document.getElementById("manHinh").value,
      dec: document.getElementById("mota").value,
    };

    formData.append("name", document.getElementById("name").value);
    formData.append("info", JSON.stringify(info));
    if (document.getElementById("PLImg").files[0]) {
      const file = document.getElementById("PLImg").files[0];
      formData.append("image", file, file.name);
    }
    console.log(formData);
    const response = await createProductLineApi(formData);
    if (response.success) {
      Notification("success", "tạo dòng sản phẩm thành công");
    } else {
      console.log(response.data);
      Notification("error", "tạo dòng sản phẩm thất bại");
    }
  };

  const handleSend = async () => {
    console.log("id: " + selectId);
    console.log("sl: " + document.getElementById("numOfProduct").value);
    console.log("name: " + document.getElementById("nameOfProduct").value);
    let data = {
      idProductLine: selectId,
      name: document.getElementById("nameOfProduct").value,
      num: document.getElementById("numOfProduct").value,
    };
    let response = await createProduct(data);
    if (response.success) {
      Notification("success", "Tạo sản phẩm thành công");
    } else {
      Notification("error", "tạo sản phẩm thất bại");
    }
    handleClose();
  };

  return (
    <div>
      <Nav
        style={{ borderRight: "2px solid rgb(98, 69, 69)" }}
        id="b"
        className="col-md-12 d-none d-md-block bg-dark sidebar"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div style={{ display: show2 }}>
          <Button variant="outline-success" className="bt" onClick={handleShow}>
            {" "}
            <IoAdd />{" "}
          </Button>
          <div>{btnLabel}</div>
        </div>
        <i></i>
      </Nav>

      <Modal show={show} onHide={handleClose} className="modal-custom">
        <Modal.Header closeButton>
          <Modal.Title>Tạo sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Dòng sản phẩm</label>
            <Select
              options={productLines}
              id="idProductLineSelect"
              onChange={handleChange}
              isSearchable={true}
            />
            <span style={{ color: "red" }}></span>
          </div>
          <div>
            <label>Tên sản phẩm</label>
            <br />
            <input type="text" id="nameOfProduct"></input>
          </div>
          <div>
            <label>Số lượng Sản phẩm</label>
            <br />
            <input type="number" id="numOfProduct" max={1234}></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="primary" onClick={handleSend}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={plShow} onHide={handleClose} className="modal-custom">
        <Modal.Header closeButton>
          <Modal.Title>Tạo dòng sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <MDBInput
              // wrapperClass="mb-2"
              id="name"
              type="text"
              required
              size="lg"
              placeholder="Name"
              name="name"
              onBlur={vald}
            />
            <div
              style={{ color: "red", height: "1.5rem", paddingLeft: "2rem" }}
            ></div>
          </div>
          <div>
            <MDBInput
              // wrapperClass="mb-4"
              id="color"
              type="text"
              required
              size="lg"
              onBlur={vald}
              placeholder="Màu"
            />
            <div
              style={{ color: "red", height: "1.5rem", paddingLeft: "2rem" }}
            ></div>
          </div>
          <div>
            <MDBInput
              // wrapperClass="mb-4"
              id="khoiLuong"
              type="text"
              required
              size="lg"
              onBlur={vald}
              placeholder="Khối lượng"
              // label="kg"
            />
            <div
              style={{ color: "red", height: "1.5rem", paddingLeft: "2rem" }}
            ></div>
          </div>
          <div>
            <MDBInput
              // wrapperClass="mb-4"
              id="RAM/ROM"
              type="text"
              required
              onBlur={vald}
              size="lg"
              placeholder="RAM/ROM"
            />
            <div
              style={{ color: "red", height: "1.5rem", paddingLeft: "2rem" }}
            ></div>
          </div>
          <div>
            <MDBInput
              // wrapperClass="mb-4"
              id="manHinh"
              type="text"
              onBlur={vald}
              required
              size="lg"
              placeholder="Màn hình"
            />
            <div
              style={{ color: "red", height: "1.5rem", paddingLeft: "2rem" }}
            ></div>
          </div>
          <div>
            <MDBInput
              // wrapperClass="mb-4"
              id="mota"
              type="textarea"
              size="lg"
              rows="5"
              onBlur={vald}
              placeholder="Mô tả"
              // formNoValidate={}
            />
            <div
              style={{ color: "red", height: "1.5rem", paddingLeft: "2rem" }}
            ></div>
          </div>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" id="PLImg" accept=".jpg, .jpeg, .png" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="mb-3 ">
            cancel
          </Button>
          <Button
            variant="primary"
            className="mb-3 "
            onClick={handleSendCreatePL}
            // disabled={!validate}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={registerShow}
        onHide={handleCloseRegister}
        className="modal-custom"
      >
        {/* <Modal.Header closeButton>Tạo tài khoản</Modal.Header> */}
        <Modal.Body>
          <RegisterForm handleClose={handleCloseRegister} />
        </Modal.Body>
      </Modal>

      <Modal show={showCreateWp} onHide={handleCloseCreateWp}>
        <Modal.Header>Tạo Work Plate</Modal.Header>
        <Modal.Body>
          <CreateWorkPlate handleClose={handleCloseCreateWp} />
        </Modal.Body>
      </Modal>

      <Modal show>
        <Modal.Body>
          <CR />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SideBar;
