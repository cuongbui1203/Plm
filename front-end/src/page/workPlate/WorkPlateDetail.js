/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { delWpApi, getWorkPlatesByIdApi } from "../../API/Other";
import { deleteProductApi } from "../../API/productApi";
import Notification from "../../components/notification/notification";
import OkOrNot from "../../components/OkOrNot/OkOrNotComponent";
import { useDataContext } from "../../state/hook/hooks";

export const WorkPlatesDetail = () => {
  const { id } = useParams();
  const [product, updateProduct] = useState({});
  const [show, setShow] = useState(false);
  const navi = useNavigate();
  useEffect(() => {
    // console.log
    getWorkPlatesByIdApi(id).then((res) => {
      updateProduct(res.data[0]);
      console.log(product);
    });
  }, []);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handle = async () => {
    const response = await delWpApi(id);
    if (response.success) {
      Notification("success", `Xoá Work Plate có ID: ${id} thành công`);
      navi("/home/work-plate");
    } else {
      Notification("error", `Xoá Work Plate có ID: ${id} thất bại`);
    }
  };
  return (
    <div className="product-detail">
      <Button onClick={handleShow}>
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
            <td>{product.name}</td>
          </tr>
          <tr>
            <td>Địa Chỉ</td>
            <td>{product.address}</td>
          </tr>
          <tr>
            <td>Số lượng nhân viên</td>
            <td>{product.employees}</td>
          </tr>
        </tbody>
      </Table>
      <OkOrNot
        show={show}
        handle={handle}
        handleClose={handleClose}
        noiDung={`Xác nhận xoá work plate có ID: ${id}`}
      />
    </div>
  );
};
