import React from 'react'
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useState } from 'react';

export const ThongKe = () => {
  const [quarter, setQuarter] = useState("-1");
  const [month, setMonth] = useState("0");
  const [status, setStatus] = useState("0");
  const statusChange = e => {
    setStatus(e.target.value);
    // console.log(e.target.value);
  }
  let months, number, quarters;
  quarters = [1, 2, 3, 4];
  if (quarter !== "-1") {
    number = [1, 2, 3];
    months = number.map((i) => {
      return quarter * 3 + i;
    });
  }
  const quarterChange = (e) => {
    setQuarter(e.target.value);
    setMonth("0");
  };
  const monthChange = (e) => {
    setMonth(e.target.value);
  };
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Dòng sản phẩm</th>
            <th style={{ width: "300px" }}>
              <Form.Select style={{ border: "none", fontWeight: "bold" }}
              onChange={statusChange} >
                <option value={"0"}>Trạng thái</option>
                <option value={"1"}>Mới sản xuất</option>
                <option value={"2"}>Đưa về đại lý</option>
                <option value={"3"}>Đã bán</option>
                <option value={"4"}>Lỗi, cần bảo hành</option>
                <option value={"5"}>Đang sửa chữa bảo hành</option>
                <option value={"6"}>Đã bảo hành xong</option>
                <option value={"7"}>Đã trả lại bảo hành cho khách hàng</option>
                <option value={"8"}>Lỗi, cần trả về nhà máy</option>
                <option value={"9"}>Lỗi, đã đưa về cơ sở sản xuất</option>
                <option value={"10"}>Lỗi cần triệu hồi</option>
                <option value={"11"}>Hết thời gian bảo hành</option>
                <option value={"12"}>Trả lại cơ sở sản xuất</option>
              </Form.Select>
            </th>
            <th>Số lượng</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>@twitter</td>
            <td></td>
            
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
