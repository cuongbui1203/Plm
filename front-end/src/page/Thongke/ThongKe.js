import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { getAllProductApi, getAllProductLine } from "../../API/productApi";

export const ThongKe = () => {
  const [listPrd, setListPrd] = useState([]);

  const loadAllPrd = async () => {
    const response1 = await getAllProductApi();
    const response2 = await getAllProductLine();
    console.log(response1.data);
    console.log(response2.data);
    for (let i = 0; i < response1.data.length; i++) {
      for (let j = 0; j < response2.data.length; j++) {

       }
    }
    // setListPrd(response.data);
  };
  useEffect(() => {
    loadAllPrd();
  }, []);

  const [status, setStatus] = useState("0");
  const statusChange = (e) => {
    setStatus(e.target.value);
    // console.log(e.target.value);
  };
  
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Sản phẩm</th>
            <th style={{ width: "300px" }}>
              <Form.Select
                style={{ border: "none", fontWeight: "bold" }}
                onChange={statusChange}
              >
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
          {listPrd.map((prd, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{prd.name}</td>
                <td>{prd.status}</td>
                <td>{prd.quantity}</td>
              </tr>
            );
          })}
          {/* <tr>
            <td>a</td>
            <td>a</td>
            <td>a</td>
            <td>@mdo</td>
          </tr> */}
        </tbody>
      </Table>
    </div>
  );
};
