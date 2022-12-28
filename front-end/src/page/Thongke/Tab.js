import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { ThongKe } from "./ThongKe";
import { TK } from "./TK";

function TabE() {
    const [key, setKey] = useState("ThongKe");
    
  return (
    <Tabs
      defaultActiveKey="ThongKe"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="ThongKe" title="Theo Dòng Sản Phẩm" >
        <ThongKe />
      </Tab>
      <Tab eventKey="TK" title="Theo Sản Phẩm">
        <TK />
      </Tab>
    </Tabs>
    );
    
}

export default TabE;
