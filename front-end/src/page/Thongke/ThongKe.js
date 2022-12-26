import React from 'react'
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

export const ThongKe = () => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Dòng sản phẩm</th>
            <th style={{ width: "300px" }}>
              <Form.Select style={{ border: "none", fontWeight: "bold" }}>
                <option>Trạng thái</option>
                <option>Mới sản xuất</option>
                <option>Đưa về đại lý</option>
                <option>Đã bán</option>
                <option>Lỗi, cần bảo hành</option>
                <option>Đang sửa chữa bảo hành</option>
                <option>Đã bảo hành xong</option>
                <option>Đã trả lại bảo hành cho khách hàng</option>
                <option>Lỗi, cần trả về nhà máy</option>
                <option>Lỗi, đã đưa về cơ sở sản xuất</option>
                <option>Lỗi cần triệu hồi</option>
                <option>Hết thời gian bảo hành</option>
                <option>Trả lại cơ sở sản xuất</option>
              </Form.Select>
            </th>
            <th>Số lượng</th>
            <th>
              <Form.Select style={{ border: "none", fontWeight: "bold" }}>
                <option>Năm</option>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
              </Form.Select>
            </th>
            <th>
              <Form.Select style={{ border: "none", fontWeight: "bold" }}>
                <option>Quý</option>
                <option>Quý 1</option>
                <option>Quý 2</option>
                <option>Quý 3</option>
                <option>Quý 4</option>
              </Form.Select>
            </th>
            <th>
              <Form.Select style={{ border: "none", fontWeight: "bold" }}>
                <option>Tháng</option>
                <option>Tháng 1</option>
                <option>Tháng 2</option>
                <option>Tháng 3</option>
                <option>Tháng 4</option>
                <option>Tháng 5</option>
                <option>Tháng 6</option>
                <option>Tháng 7</option>
                <option>Tháng 8</option>
                <option>Tháng 9</option>
                <option>Tháng 10</option>
                <option>Tháng 11</option>
                <option>Tháng 12</option>
              </Form.Select>
            </th>
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
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
