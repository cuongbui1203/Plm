/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProductApi } from "../../API/productApi";
import Notification from "../../components/notification/notification";
import { useDataContext } from "../../state/hook/hooks";

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, updateProduct] = useDataContext();
  const navi = useNavigate();
  const info = JSON.parse(product.data.info);
  const infoCustomer = JSON.parse(
    product.data.infoCustomer
      ? product.data.infoCustomer
      : '{"name":"nan","address":"nan"}'
  );
  console.log(product.data);

  const handleDelete = async () => {
    const response = await deleteProductApi(id);
    if (response.success) {
      Notification("success", `xoa san pham cos id ${id} thanh cong`);
      navi("/home/products");
    }
  };

  return (
    <div className="product-detail">
      <img
        style={{
          marginLeft: "20%",
          maxHeight: "40vh",
          maxWidth: "50vw",
          paddingBottom: "10px",
        }}
        src={product.data.imgUrl}
      />
      <Button onClick={handleDelete}>
        <AiFillDelete />
      </Button>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Nội dung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ID</td>
            <td>{id}</td>
          </tr>
          <tr>
            <td>Tên</td>
            <td>{product.data.name}</td>
          </tr>
          <tr>
            <td>Dòng sản phẩm</td>
            <td>{product.data.productLine}</td>
          </tr>
          <tr>
            <td>Mô tả</td>
            <td>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <td>Thuộc tính</td>
                    <td>Giá trị</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Màu</td>
                    <td>{info.color}</td>
                  </tr>

                  <tr>
                    <td>Khối Lượng</td>
                    <td>{info.mass} Kg</td>
                  </tr>

                  <tr>
                    <td>Màn hình</td>
                    <td>{info.display} inch</td>
                  </tr>

                  <tr>
                    <td>RAM/ROM</td>
                    <td>{info.ramRom}</td>
                  </tr>
                  <tr>
                    <td>Mô tả thêm</td>
                    <td>{info.dec}</td>
                  </tr>
                </tbody>
              </Table>
            </td>
          </tr>
          <tr>
            <td>Trạng thái</td>
            <td>{product.data.status}</td>
          </tr>
          <tr>
            <td>Thông tin khách hàng</td>
            <td>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <td>Thuộc tính</td>
                    <td>Giá trị</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tên</td>
                    <td>{infoCustomer.name}</td>
                  </tr>

                  <tr>
                    <td>Địa Chỉ</td>
                    <td>{infoCustomer.address}</td>
                  </tr>
                </tbody>
              </Table>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
