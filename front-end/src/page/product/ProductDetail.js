/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { deleteProductApi } from "../../API/productApi";
import Notification from "../../components/notification/notification";
import { useDataContext } from "../../state/hook/hooks";

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, updateProduct] = useDataContext();
  console.log(product.data);

  const handleDelete = async () => {
    const response = await deleteProductApi(id);
    if (response.success) {
      Notification("success", `xoa san pham cos id ${id} thanh cong`);
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
            <td>{product.data.info}</td>
          </tr>
          <tr>
            <td>Trạng thái</td>
            <td>{product.data.status}</td>
          </tr>
          <tr>
            <td>Thông tin khách hàng</td>
            <td>Larry the Bird</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
