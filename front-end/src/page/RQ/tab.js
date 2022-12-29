import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { CrRQ } from "./crRQ";
import { NRQ } from "./nRQ";

function TabRQ() {
//   const [key, setKey] = useState("ThongKe");

  return (
    <Tabs
      defaultActiveKey="crRQ"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="crRQ" title="Gửi">
        <CrRQ />
      </Tab>
      <Tab eventKey="nRQ" title="Nhận">
        <NRQ />
      </Tab>
    </Tabs>
  );
}

export default TabRQ;
