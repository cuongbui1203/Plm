import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { IoAdd } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import { AiFillDelete } from "react-icons/ai";
import "./CR.css";
import { createRequestApi, getAllWorkPlatesApi } from "../../API/Other";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import AddProduct from "./AddProduct";
import { getAllProductApi, getAllProductLine } from "../../API/productApi";
import { useLoginContext } from "../../state/hook/hooks";
import Notification from "../notification/notification";
const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "#28292d",
    // match with the menu
    borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
  }),
  menu: (base) => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
    backgroundColor: "#555555",
    color: "red",
  }),
  singleValue: (style) => ({
    ...style,
    color: "red",
  }),
};

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

const loai = [
  {
    label: "Thông Báo",
    value: 1,
  },
  {
    label: "Luân chuyển",
    value: 2,
  },
];

function CR({ handleClose }) {
  const [workPlate, setWorkPlate] = useState([]);
  const [loginState, updateLoginState] = useLoginContext();
  const [dataSend, setDataSend] = useState([]);
  const [workPlateId, setWorkPlateId] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTtitle] = useState("");
  const [para, setPara] = useState("");
  const [loaiRq, setLoaiRq] = useState(0);
  // const [idDel, setIdDel] = useState(-1);
  let role = 1;
  const handleGetAllWorkPlate = async () => {
    let response = await getAllWorkPlatesApi();
    if (response.success) {
      let tg = [];
      response.data.forEach((e) => {
        if (e.roleId === role) {
          tg.push({
            label: e.name,
            value: e.id,
          });
        }
      });
      setWorkPlate(tg);
    }
  };

  const handleChangeRole = (e) => {
    role = e.value;
    handleGetAllWorkPlate();
  };

  const handleDelete = () => {
    setDataSend(
      dataSend.filter((e) => e.id != sessionStorage.getItem("idDel"))
    );
  };

  const handleCheck = (e) => {
    console.log(e.target.value);
    sessionStorage.setItem("idDel", e.target.value);
    handleDelete();
  };

  const handleChangeId = (e) => {
    setWorkPlateId(e);
  };

  const handleCloseAdd = () => setShowAdd(false);
  const handleShow = () => setShowAdd(true);
  const handleAddArr = (value) => {
    console.log(value);
    dataSend.push(value);
    setDataSend(dataSend);
  };
  console.log(dataSend);
  const handleSendRQ = async () => {
    const dataForm = new FormData();
    const metaData = {
      title: title,
      para: para,
      data: dataSend,
    };

    console.log(JSON.stringify(metaData));
    dataForm.append("loai", loaiRq);
    dataForm.append("idSender", loginState.user.id);
    dataForm.append("nameSender", loginState.user.name);
    dataForm.append("idReceiver", workPlateId.value);
    dataForm.append("nameReceiver", workPlateId.label);
    dataForm.append("data", JSON.stringify(metaData));

    const response = await createRequestApi(dataForm);
    if (response.success) {
      Notification("success", "Tạo Request thành công");
    } else {
      Notification("error", "Tạo Request thất bại");
      response.error.response.data.data.map((e, i) => {
        Notification("error", e);
      });
    }
    handleClose();
  };

  //----------------------------------
  const [data, setData] = useState([]);
  const [type, setType] = useState(0);
  const [sl, setSl] = useState(1);
  const [choose, setChoose] = useState({});
  const types = [
    {
      label: "Dòng sản phẩm",
      value: 1,
    },
    {
      label: "Sản phẩm",
      value: 2,
    },
  ];

  const onChangeType = (e) => {
    console.log(e.value);
    setData([]);
    setType(e.value);
    if (e.value === 1) {
      handleGetProductLine();
    } else {
      handleGetProduct();
    }
  };
  const handleChangeChoose = (e) => {
    setChoose(e.value);
  };
  const onChangeSL = (e) => {
    console.log(e.target.value);
    setSl(e.target.value);
  };
  const handleGetProduct = async () => {
    const response = await getAllProductApi();
    if (response.success) {
      console.log(response.data);
      const tg = [];
      response.data.map((e, index) => {
        let add = e.can === "1";
        // console.log(e.can != "1");

        for (let i = 0; i < dataSend.length; i++) {
          if (data[i].id === e.id) {
            add = false;
            break;
          }
        }
        if (add) {
          tg.push({
            label: `Tên: ${e.name} | Dòng: ${e.productLine} | Status ${e.status}`,
            value: e.productId,
          });
        }
      });
      setData(tg);
    }
  };
  const handleClose3 = () => {
    setData([]);
    setType(0);
    setSl(1);
    handleCloseAdd();
  };
  const handleAdd2 = () => {
    const dataAdd = {
      id: choose,
      sl: sl,
    };
    handleAddArr(dataAdd);
    handleClose3();
  };

  const handleGetProductLine = async () => {
    const response = await getAllProductLine();
    if (response.success) {
      const tg = [];
      response.data.map((e, i) => {
        let add = true;
        for (let i = 0; i < dataSend.length; i++) {
          if (data[i].id === e.id) {
            add = false;
            break;
          }
        }
        if (add) {
          tg.push({
            label: `Tên: ${e.name}`,
            value: e.productLineId,
          });
        }
      });
      setData(tg);
    }
  };

  return (
    <div id="wrapper" style={{ width: "auto", height: "auto" }}>
      <div className="box" style={{ minWidth: "400px", minHeight: "600px" }}>
        <div className="form">
          <h3>Gửi yêu cầu</h3>

          <div className="form-group">
            <label style={{ color: "#45f3ff" }}>Loại yêu cầu</label>
            <Select
              options={loai}
              isSearchable={true}
              defaultValue={loai[0]}
              onChange={(e) => {
                setLoaiRq(e.value);
              }}
              styles={customStyles}
            />
            <i></i>
          </div>

          <div className="form-group">
            <label style={{ color: "#45f3ff" }}>Bộ phận Nhận</label>
            <Select
              options={roles}
              isSearchable={true}
              defaultValue={roles[0]}
              onChange={handleChangeRole}
              styles={customStyles}
            />
            <i></i>
          </div>
          <div className="form-group">
            <label style={{ color: "#45f3ff" }}>Nơi Gửi Đến</label>
            <Select
              options={workPlate}
              isSearchable={true}
              styles={customStyles}
              onChange={handleChangeId}
            />
            <i></i>
          </div>

          <div className="form-group">
            <input
              className="register"
              size="sm"
              required
              onChange={(e) => {
                setTtitle(e.target.value);
              }}
            />
            <span>Tiêu đề</span>
            <i></i>
          </div>

          <div className="form-group">
            <textarea
              type="password"
              name="password"
              className="register"
              size="sm"
              required
              onChange={(e) => setPara(e.target.value)}
            />
            <span>Nội dung</span>
            <i></i>
          </div>

          <div className="form-group tbl-cr">
            <Table
              striped
              bordered
              hover
              variant="dark"
              size="sm"
              className="tb-cr"
            >
              <thead>
                <tr>
                  <th>STT</th>
                  <th>ID</th>
                  <th>Sl</th>
                  <th>Xoa</th>
                </tr>
              </thead>
              <tbody>
                {dataSend.map((e, i) => {
                  return (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{e.id}</td>
                      <td>{e.sl}</td>
                      <td>
                        <Button
                          variant="outline-danger"
                          className="bt"
                          size="sm"
                          id={e.id}
                          value={e.id}
                          onClick={handleCheck}
                        >
                          <AiFillDelete />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td>
                    <Button
                      variant="outline-success"
                      className="bt"
                      size="sm"
                      onClick={handleShow}
                      disabled={loaiRq === 1}
                    >
                      {" "}
                      <IoAdd />{" "}
                    </Button>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div align="end">
            <Button
              variant="outline-danger"
              size="sm"
              style={{ marginRight: "5px" }}
              onClick={handleClose}
            >
              Hủy
            </Button>
            <Button variant="outline-success" size="sm" onClick={handleSendRQ}>
              Gửi
            </Button>
          </div>
        </div>
      </div>
      <Modal
        show={showAdd}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        onHide={handleClose3}
      >
        <Modal.Header closeButton>Thêm</Modal.Header>
        <Modal.Body>
          <div>
            <label>Loại</label>
            <Select
              options={types}
              defaultValue={types[0].label}
              // className="bg-dark"
              // id="tetete"
              // styles={customStyles}
              onChange={onChangeType}
            />
            <div style={{ color: "red", height: "30px" }}>&#160;</div>
          </div>
          <div>
            <label>Chọn</label>
            <Select
              options={data}
              defaultValue={data[0]}
              isSearchable
              onChange={handleChangeChoose}
              // className="bg-dark"
              // id="tetete"
              // styles={customStyles}
            />
            <div style={{ color: "red", height: "30px" }}>&#160;</div>
          </div>
          {type === 1 && (
            <div>
              <label>Số Lượng</label>
              <br />
              <input
                type={"number"}
                hidden={false}
                style={{ width: "100%" }}
                // value={1}
                onChange={onChangeSL}
              />
              <div style={{ color: "red", height: "30px" }}>&#160;</div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            size="sm"
            style={{ marginRight: "5px" }}
            onClick={() => {
              handleClose3();
            }}
          >
            Hủy
          </Button>
          <Button variant="outline-success" size="sm" onClick={handleAdd2}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export { customStyles };
export default CR;
