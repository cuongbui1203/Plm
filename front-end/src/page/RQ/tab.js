import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { getRequest } from "../../API/Other";
import Notification from "../../components/notification/notification";
import { useLoginContext } from "../../state/hook/hooks";

import { CrRQ } from "./crRQ";
import { NRQ } from "./nRQ";

function TabRQ() {
  //   const [key, setKey] = useState("ThongKe");
  const [data, setData] = useState([]);
  const [loginState, updateLoginState] = useLoginContext();
  useEffect(() => {
    getRequest(loginState.user.id)
      .then((res) => {
        setData(res.data);
        Notification("success", "Lấy tất cả yêu cầu thành công");
      })
      .catch((res) => {
        console.log(res);
        Notification("error", "Lấy tất cả yêu cầu thất bại");
      });
  }, []);
  return (
    <Tabs
      defaultActiveKey="crRQ"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="crRQ" title="Gửi">
        <CrRQ data={data[0]} />
      </Tab>
      <Tab eventKey="nRQ" title="Nhận">
        <NRQ data={data[1]} />
      </Tab>
    </Tabs>
  );
}

export default TabRQ;
