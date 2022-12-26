import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { getAllProductApi, getAllProductLine } from "../../API/productApi";
import { number } from "prop-types";

export const ThongKe = () => {
  const [listPrd, setListPrd] = useState([]);
  const [listPrdt, setListPrdt] = useState([]);
  const loadAllPrd = async () => {
    const response = await getAllProductApi();
    console.log(response.data);
    setListPrdt(response.data);
    setListPrd(response.data);
  };
  useEffect(() => {
    loadAllPrd();
  }, []);

  const [status, setStatus] = useState("0");
  const statusChange = (e) => {
    setStatus(e.target.value);
    // console.log(e.target.value);
    const prdData = listPrdt.filter((prd, index) => {
      return prd.statusId === Number(e.target.value);
    });
    setListPrd(prdData);
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
                <td>{prd.productLineQuantity}</td>
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
