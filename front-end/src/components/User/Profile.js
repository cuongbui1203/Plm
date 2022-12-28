import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { useDataContext, useLoginContext } from "../../state/hook/hooks";
import { getChucVu } from "../../layout/header/HeaderBar";

export const Profile = () => {
  const [loginState, updateLoginState] = useLoginContext();
  const [user, setUser] = useState(loginState.user);
  const [data, updateData] = useDataContext();
  const { id } = useParams();
  useEffect(() => {
    if (id != loginState.user.id) {
      setUser(data.data);
    } else {
      setUser(loginState.user);
    }
  }, [id]);
  console.log(user);
  return (
    <div className="profile">
      <h1 className="text-5xl clear-both">Hồ sơ: </h1>
      <h1 className="text-5xl clear-both">{`ID: ${id}`}</h1>
      <Row className="mt-10">
        <div className="relative border-2 border-[#003eb3] px-8 rounded-xl">
          <Row className="flex items-center justify-center h-full">
            <Col lg={4}>
              <h4 className="float-right clear-both font-bold">Tên:</h4>
              <h4 className="float-right clear-both font-bold">Email: </h4>
              <h4 className="float-right clear-both font-bold">
                Nơi làm việc:
              </h4>
            </Col>
            <Col lg={2} />
            <Col lg={6} className="">
              <h4 className="float-left clear-both">{user.name}</h4>
              <h4 className="float-left clear-both">{user.email}</h4>
              <h4 className="float-left clear-both">{user.workPlate}</h4>
            </Col>
          </Row>
        </div>
      </Row>
    </div>
  );
};
