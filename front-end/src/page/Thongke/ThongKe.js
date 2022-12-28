import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { getAllProductLine } from "../../API/productApi";

export const ThongKe = () => {
  const [listPrd, setListPrd] = useState([]);
  const [listPrdt, setListPrdt] = useState([]);
  const loadAllPrd = async () => {
    const response = await getAllProductLine();
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
            <th>Dòng Sản phẩm</th>
            <th>Mô tả</th>
            <th>Số lượng</th>
          </tr>
        </thead>
        <tbody>
          {listPrd.map((prd, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{prd.name}</td>
                <td>{prd.info}</td>
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
