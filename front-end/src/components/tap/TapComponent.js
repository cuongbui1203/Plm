import { Tab, Tabs } from "react-bootstrap";

const TapComponent = () => {
  return (
    <Tabs
      defaultActiveKey="ThongKe"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="ThongKe" title="Theo Dòng Sản Phẩm">
        {/* <ThongKe /> */}
      </Tab>
      <Tab eventKey="TK" title="Theo Sản Phẩm">
        {/* <TK /> */}
      </Tab>
    </Tabs>
  );
};

export default TapComponent;
