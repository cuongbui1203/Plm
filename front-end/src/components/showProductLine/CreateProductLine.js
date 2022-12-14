import { MDBInput } from "mdb-react-ui-kit";
import { Button, Form } from "react-bootstrap";
import "../Admin/Admin.css";
const CreateProductLine = () => {
  return (
    <div className="login-container">
      <div className="cr">
        <h2 style={{ color: "black" }}>Tạo dòng sản phẩm</h2>
        <MDBInput
          wrapperClass="mb-4"
          id="name"
          type="text"
          size="lg"
          placeholder="Name"
        />
        <MDBInput
          wrapperClass="mb-4"
          id="color"
          type="text"
          size="lg"
          placeholder="Màu"
        />
        <MDBInput
          wrapperClass="mb-4"
          id="khoiLuong"
          type="text"
          size="lg"
          placeholder="Khối lượng"
          // label="kg"
        />
        <MDBInput
          wrapperClass="mb-4"
          id="RAM/ROM"
          type="text"
          size="lg"
          placeholder="RAM/ROM"
        />
        <MDBInput
          wrapperClass="mb-4"
          id="manHinh"
          type="text"
          size="lg"
          placeholder="Màn hình"
        />
        <MDBInput
          wrapperClass="mb-4"
          id="mota"
          type="textarea"
          size="lg"
          rows="5"
          placeholder="Mô tả"
        />
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" />
        </Form.Group>
        <Button variant="primary" className="mb-3 w-100">
          Tạo
        </Button>
      </div>
    </div>
  );
};

export default CreateProductLine;
