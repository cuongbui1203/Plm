import React from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./Profile.css"

export const Profile = () => {
  return (
    <div className='profile'>
      <h1 className="text-5xl clear-both">Hồ sơ: </h1>
      <Row className="mt-10">
        <div className="relative border-2 border-[#003eb3] px-8 rounded-xl">
          <Row className="flex items-center justify-center h-full">
            <Col lg={4}>
              <h4 className="float-right clear-both font-bold">Tên: </h4>
              <h4 className="float-right clear-both font-bold">Email: </h4>
              <h4 className="float-right clear-both font-bold">
                Nơi làm việc:
              </h4>
            </Col>
            <Col lg={2} />
            <Col lg={6} className="">
              <h4 className="float-left clear-both">{"ming"}</h4>
              <h4 className="float-left clear-both">{"sexgay@gmail.com"}</h4>
              <h4 className="float-left clear-both">{"Chức VỤ"}</h4>
            </Col>
          </Row>
        </div>
      </Row>
    </div>
  );
}
