import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { getAllProductApi, getAllProductLine } from "../../API/productApi";
import { FaRandom } from "react-icons/fa";

export const TTBHPage = () => {
  const [listPrd, setListPrd] = useState([]);
  const [listPrdt, setListPrdt] = useState([]);
  const [listPrd2, setListPrd2] = useState([]);
  const [listPrdt2, setListPrdt2] = useState([]);

  const loadAllPrd = async () => {
    const response = await getAllProductLine();
    const response2 = await getAllProductApi();
    console.log(response.data);
    setListPrdt(response.data);
    setListPrd(response.data);
    console.log(response2.data);
    setListPrdt2(response2.data);
    setListPrd2(response2.data);
  };
  useEffect(() => {
    loadAllPrd();
  }, []);

  const [quarter, setQuarter] = useState("-1");
  const [month, setMonth] = useState("0");
  const [status, setStatus] = useState("0");
  const statusChange = async (e) => {
    // const
    setStatus(e.target.value);
    // console.log(e.target.value);
    let prdData;
    prdData = listPrdt2.filter((prd, index) => {
      return prd.statusId === Number(e.target.value);
    });

    setListPrd2(prdData);
  };

  const MonthsChange = (e) => {
    setMonth(e.target.value);
    // console.log(e.target.value);
    let prdData;
    if (Number(e.target.value) === 0) {
      prdData = listPrdt2;
    } else {
      prdData = listPrdt2.filter((prd, index) => {
        return (
          new Date(prd.created_at).getMonth() + 1 === Number(e.target.value)
        );
      });
    }
    setListPrd2(prdData);
  };

  let months, number, quarters;
  quarters = [1, 2, 3, 4];
  if (quarter !== "-1") {
    number = [1, 2, 3];
    months = number.map((i) => {
      return quarter * 3 + i;
    });
  }
  const yearChange = (e) => {};
  const quarterChange = (e) => {
    setQuarter(e.target.value);
    let Number = [1, 2, 3];
    let Months = Number.map((i) => {
      return e.target.value * 3 + i;
    });

    console.log(Months);
    let prdData;
    // if (Number(e.target.value) === 5) {
    //   prdData = listPrdt2;
    // } else {
    prdData = listPrdt2.filter((prd, index) => {
      const Month = new Date(prd.created_at).getMonth() + 1;
      console.log(Month);
      if (Months.includes(Month)) {
        return (
          Month === Months[0] || Month === Months[1] || Month === Months[2]
        );
      }
    });
    // }
    setListPrd2(prdData);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Dòng sản phẩm</th>
            <th style={{ width: "300px" }}>
              <Form.Select
                style={{ border: "none", fontWeight: "bold" }}
                onChange={statusChange}
              >
                <option value={0}>Trạng thái</option>
                <option value={5}>Đang sửa chữa bảo hành</option>
                <option value={6}>Đã bảo hành xong</option>
                <option value={7}>Đã trả lại bảo hành cho khách hàng</option>
                <option value={8}>Lỗi, cần trả về nhà máy</option>
              </Form.Select>
            </th>
            <th>Số lượng</th>
            <th>
              <Form.Select
                style={{ border: "none", fontWeight: "bold" }}
                onChange={yearChange}
              >
                {listPrd2
                  .map((prd, index) => {
                    return new Date(prd.created_at).getFullYear();
                  })
                  .filter((value, index, self) => {
                    return self.indexOf(value) === index;
                  })
                  .map((year, index) => {
                    return (
                      <option value={year} key={index}>
                        {" "}
                        Năm {year}
                      </option>
                    );
                  })}
              </Form.Select>
            </th>
            <th>
              <Form.Select
                style={{ border: "none", fontWeight: "bold" }}
                onChange={quarterChange}
              >
                <option value={"-1"}>Quý</option>
                {quarters?.map((quart) => {
                  return (
                    <option value={quart - 1} key={quart}>
                      {" "}
                      Quý {quart}
                    </option>
                  );
                })}
              </Form.Select>
            </th>
            <th>
              <Form.Select
                style={{ border: "none", fontWeight: "bold" }}
                id="countries"
                onChange={MonthsChange}
                disabled={quarter == "-1" ? true : false}
              >
                <option value={0}>Tháng</option>
                {months &&
                  months.map((mon) => {
                    return (
                      <option value={mon} key={mon}>
                        {" "}
                        Tháng {mon}
                      </option>
                    );
                  })}
              </Form.Select>
            </th>
          </tr>
        </thead>
        <tbody>
          {listPrd.map((prd, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{prd.name}</td>
                <td>{prd.status}</td>
                <td>{Math.floor(Math.random() * 10)}</td>
                <td>{new Date(prd.created_at).getFullYear()}</td>
                <td>
                  {Math.floor(new Date(prd.created_at).getMonth() / 3 + 1)}
                </td>
                <td>{new Date(prd.created_at).getMonth() + 1}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
