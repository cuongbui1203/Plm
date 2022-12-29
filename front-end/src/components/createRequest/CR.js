import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { IoAdd } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import { AiFillDelete } from "react-icons/ai";
import "./CR.css";
import { getAllWorkPlatesApi } from "../../API/Other";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import AddProduct from "./AddProduct";
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

function CR() {
  const [workPlate, setWorkPlate] = useState([]);
  const [dataSend, setDataSend] = useState([
    {
      id: "123-123-1234",
    },
  ]);
  const [checkAllValue, setCheckAllValue] = useState(false);
  const [workPlateId, setWorkPlateId] = useState(-1);
  const [showAdd, setShowAdd] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [idDel, setIdDel] = useState([]);
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

  console.log(workPlate);

  const handleChangeRole = (e) => {
    role = e.value;
    handleGetAllWorkPlate();
  };

  const handleCheck = (e) => {
    console.log(e.target.value);
    const tg = dataSend.filter((e) => e.id !== e.target.value);
    setDataSend(tg);
  };

  const handleChangeId = (e) => {
    setWorkPlateId(e.value);
  };

  const handleClose = () => setShowAdd(false);
  const handleShow = () => setShowAdd(true);
  const handleAddArr = (value) => {};
  return (
    <div id="wrapper">
      <div className="box">
        <div className="form">
          <h3>Gửi yêu cầu</h3>
          <div className="form-group">
            <label style={{ color: "#45f3ff" }}>Loại</label>
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
              // rows={5}
              required
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
                  <th>Xoá</th>
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
            >
              Hủy
            </Button>
            <Button variant="outline-success" size="sm">
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
        onHide={handleClose}
      >
        <Modal.Header closeButton>Thêm</Modal.Header>
        <Modal.Body>
          <AddProduct handle={handleAddArr} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            size="sm"
            style={{ marginRight: "5px" }}
            onClick={handleClose}
          >
            Hủy
          </Button>
          <Button variant="outline-success" size="sm">
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export { customStyles };
export default CR;
