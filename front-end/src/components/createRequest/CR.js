import React from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { IoAdd } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import { AiFillDelete } from "react-icons/ai";
import "./CR.css";

function CR() {
  return (
    <div id="wrapper">
      <div className="box">
        <div className="form">
          <h3>Gửi yêu cầu</h3>
          <div className="form-group">
            <Form.Select className="rsF" size="sm">
              <option selected disabled>
                Loại
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Select>
            <i></i>
          </div>
          <div className="form-group">
            <Form.Select className="rsF" size="sm">
              <option selected disabled>
                Gửi đến
              </option>
              <option value="1">A</option>
              <option value="2">B</option>
              <option value="3">C</option>
            </Form.Select>
            <i></i>
          </div>
          <div className="form-group">
            <Form.Select className="rsF" size="sm">
              <option selected disabled>
                Tên
              </option>
              <option value="1">X</option>
              <option value="2">Y</option>
              <option value="3">Z</option>
            </Form.Select>
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
