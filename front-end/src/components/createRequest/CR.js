import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { IoAdd } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import { AiFillDelete } from "react-icons/ai";
import "./CR.css";
import { getAllWorkPlatesApi } from "../../API/Other";
import Select from "react-select";
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
function CR() {
  const [workPlate, setWorkPlate] = useState([]);
  const [dataSend, updateDataSend] = useState([]);
  const [workPlateId, setWorkPlateId] = useState(-1);

  const handleGetAllWorkPlate = async () => {
    let response = await getAllWorkPlatesApi();
    if (response.success) {
      let tg = [];
      response.data.forEach((e) => {
        tg.push({
          label: e.name,
          value: e.id,
        });
      });
      setWorkPlate(tg);
    }
  };
  useEffect(() => {
    handleGetAllWorkPlate();
    console.log(workPlate);
  }, []);
  console.log(workPlate);

  const handleChangeId = (e) => {
    setWorkPlateId(e.value);
  };

  return (
    <div id="wrapper">
      <div className="box">
        <div className="form">
          <h3>Gửi yêu cầu</h3>
          <div className="form-group">
            <Select
              options={workPlate}
              isSearchable={true}
              // className="bg-dark"
              id="tetete"
              styles={customStyles}
            />
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
          <div class="group-op-container" align="end">
            <div class="group-op nodisplay">
              <Button
                variant="outline-danger"
                className="bt"
                size="sm"
                id="btnDelete"
              >
                <AiFillDelete />
              </Button>
            </div>
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
                  <th>Số Lượng</th>
                  <th>
                    <input type="checkbox" id="chkall"></input>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>1</td>
                  <td>
                    <input type="checkbox" name="chk"></input>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>2</td>
                  <td>
                    <input type="checkbox" name="chk"></input>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Jacob</td>
                  <td>2</td>
                  <td>
                    <input type="checkbox" name="chk"></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Button variant="outline-success" className="bt" size="sm">
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
    </div>
  );
}

export default CR;
