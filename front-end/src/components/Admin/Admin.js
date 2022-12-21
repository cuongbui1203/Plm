import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MDBContainer, MDBCol, MDBRow, MDBInput } from "mdb-react-ui-kit";

import "./Admin.css";

function Admin() {
  return (
    <div className="admin">
      <>
        <div className="login-container">
          <MDBContainer fluid className="p-3 my-5 ">
            <MDBRow>
              <MDBCol col="10" md="6">
                <div className="cr">
                  <h2>Tạo dòng sản phẩm</h2>
                  <MDBInput
                    wrapperClass="mb-4"
                    id="name"
                    type="text"
                    size="lg"
                    placeholder="Name"
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    id="mota"
                    type="text"
                    size="lg"
                    placeholder="Mô tả"
                  />
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" />
                  </Form.Group>
                  <Button variant="primary" className="mb-3 w-100">
                    Tạo
                  </Button>
                </div>
              </MDBCol>

              <MDBCol col="4" md="6" center="true">
                <div className="cr">
                  <h2>Tạo sản phẩm</h2>
                  <Form.Select className="rsA" size="lg">
                    <option selected disabled>
                      Dòng sản phẩm
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>

                  <i style={{ color: "white" }}>mệt mỏi</i>

                  <Form.Select className="rsA" size="lg">
                    <option selected disabled>
                      Tên sản phẩm
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                  <i style={{ color: "white" }}>mệt mỏi</i>
                  <MDBInput
                    wrapperClass="mb-4"
                    id="name"
                    type="text"
                    size="lg"
                    placeholder="Số lượng"
                  />
                  <Button variant="primary" className="mb-3 w-100">
                    Tạo
                  </Button>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </>
    </div>
  );
}
export default Admin;
