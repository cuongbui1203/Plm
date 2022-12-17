import React, { useEffect, useState } from "react";
import { Container, Modal, Nav, NavDropdown, NavItem } from "react-bootstrap";
import "./SideBar.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoRefresh } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { getAllProductLine, createProduct } from "../../API/productApi";
import Select from "react-select";
import Notification from "../../components/notification/notification";
const SideBar = () => {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [productLines, handle] = useState([]);

  const [selectId, setId] = useState(-1);
  

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

  const handleShow = () => {
    handleGetProductLine();
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setId(e.value);
  };

  const handleSend = async () => {
    console.log("id: " + selectId);
    console.log("sl: " + document.getElementById("numOfProduct").value);
    let data = {
      idProductLine: selectId,
      name: "string",
      num: document.getElementById("numOfProduct").value,
      isStatus: 0,
      batch: "string",
    };
    let response = await createProduct(data);
    if (response.success) {
      Notification("success", "Tạo sản phẩm thành công");
    } else {
      Notification("error", "tạo sản phẩm thất bại");
    }
    handleClose();
  };

  const handleClick = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    console.log(visible);
  }, [visible]);

  return (
    <div>
      <Nav
        style={{ borderRight: visible ? "2px solid rgb(98, 69, 69)" : "" }}
        id="b"
        className="col-md-12 d-none d-md-block bg-dark sidebar"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
        <Button onClick={handleClick}>
          <AiFillDelete />
        </Button>
        <div style={{ display: visible ? "block" : "none" }}>
          <Button variant="outline-success" className="bt" onClick={handleShow}>
            {" "}
            <IoAdd />{" "}
          </Button>
          <Button variant="outline-danger" className="bt">
            <AiFillDelete />
          </Button>
          <Button variant="outline-primary" className="bt">
            <IoRefresh />
          </Button>
        </div>
        {/* )} */}

        {/* {visible && ( */}
        <div style={{ display: visible ? "block" : "none" }}>
          <ul className="list-group list-group-flush">
            {" "}
            &ensp;Search by:
            <li className="list-group-item">
              {" "}
              {/* ID: */}
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="ID"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" className="btns">
                  <IoAdd />
                </Button>
              </Form>
            </li>
            <li className="list-group-item">
              {/* Date: */}
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Date"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" className="btns">
                  <IoAdd />
                </Button>
              </Form>
            </li>
            <li className="list-group-item">
              {/* Kho: */}
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Kho"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" className="btns">
                  <IoAdd />
                </Button>
              </Form>
            </li>
            <li className="list-group-item">
              {/* Time: */}
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Time"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" className="btns">
                  <IoAdd />
                </Button>
              </Form>
            </li>
          </ul>

          <ul className="list-group list-group-flush sort" id="sortList">
            {" "}
            &ensp;Sort by:
            <li className="list-group-item sortBy" id="SortA-Z">
              A-Z
              <span className="arrow"></span>
            </li>
            <li className="list-group-item sortBy" id="SortDate">
              Date
              <span class="arrow"></span>
            </li>
            <li className="list-group-item sortBy" id="SortQ">
              Quantity
              <span class="arrow"></span>
            </li>
          </ul>
        </div>
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
            />
          </div>
          <div>
            
          </div>
          <div>
            <label>Số lượng Sản phẩm</label>
            <br />
            <input type="number" id="numOfProduct"></input>
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
    </div>
  );
};

export default SideBar;