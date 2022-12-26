/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import { useDataContext } from "../../state/hook/hooks";

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, updateProduct] = useDataContext();
  console.log(product.data);
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
