import React, { useEffect, useState } from "react";
import { Container, Modal, Nav, NavDropdown, NavItem } from "react-bootstrap";
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
      
    </div>
  );
};

export default SideBar;