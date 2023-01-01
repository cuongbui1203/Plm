import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { getAllProductLine } from "../../API/productApi";

export const ThongKe = () => {
  const [listPrd, setListPrd] = useState([]);
  const [listPrdt, setListPrdt] = useState([]);
  // const [info, setInfo] = useState("");
  const loadAllPrd = async () => {
    const response = await getAllProductLine();
    console.log(response.data);
    setListPrdt(response.data);
    setListPrd(response.data);
    // setInfo(JSON.parse());
    console.log(response.data);
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
            const info = JSON.parse(prd.info);
            console.log(info);
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{prd.name}</td>
                <td>
                  <Table striped bordered hover>
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
                <td>{prd.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
