import React from 'react'
import Table from "react-bootstrap/Table";

export const ProductDetail = () => {
  return (
    <div>
      <img
        style={{
          marginLeft: "30%",
          maxHeight: "400px",
          maxWidth: "300px",
          paddingBottom: "10px",
        }}
        src={"https://news-w.com/wp-content/uploads/2022/03/poku-no-pico.jpg"}
      />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Nội dung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tên</td>
            <td>Mark</td>
          </tr>
          <tr>
            <td>Dòng sản phẩm</td>
            <td>Jacob</td>
          </tr>
          <tr>
            <td>Mô tả</td>
            <td>Larry the Bird</td>
          </tr>
          <tr>
            <td>Trạng thái</td>
            <td>Larry the Bird</td>
          </tr>
          <tr>
            <td>Thông tin khách hàng</td>
            <td>Larry the Bird</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
