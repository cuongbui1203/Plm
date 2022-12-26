/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import "./Loginform.css";
import { useNavigate } from "react-router-dom";
import Notification from "../notification/notification";
import "react-toastify/dist/ReactToastify.css";
import { loginApi } from "../../API/auth";
import { useLoginContext, useSettingContext } from "../../state/hook/hooks";
import { setLoaded, setLoading } from "../../state/actions/settingActions";
import { setLoginSuccess } from "../../state/actions/loginActions";
import { SET_LOGIN_SUCCESS } from "../../state/constants";
import axios from "axios";

function LoginForm() {
  const navigation = useNavigate();
  const [setting, updateSettingState] = useSettingContext();
  const [loginState, updateLoginState] = useLoginContext();
  const [img, updateImg] = useState(null);
  async function login() {
    let data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    // console.log(data);
    // updateSetting(actions.setLoading(""));
    updateSettingState(setLoading());
    const response = await loginApi(data);
    if (response.success) {
      console.log(response);
      updateLoginState(
        setLoginSuccess(response.data.token, response.data.user)
      );
      Notification("success", "Login Success");

      //   navigation("/home");
      // console.log(state)
    } else {
      Notification("error", "Login Fail");
      //   dispatch(actions.setLoginFail(""));
    }
    updateSettingState(setLoaded());
    // console.log(state);
    console.log(loginState);
  }

  const rememberMe = () => {
    let rememberCheckBox = document.getElementById("rememberCheckBox");
    if (rememberCheckBox.checked) {
      localStorage.setItem("e", document.getElementById("email").value);
      localStorage.setItem("p", document.getElementById("password").value);
      Notification("info", "remember");
    }
  };

  return (
    <>
      <div className="login-container bg-dark variant-dark">
        <MDBContainer fluid className="p-3 my-5 ">
          <MDBRow>
            <MDBCol col="10" md="6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </MDBCol>

            <MDBCol col="4" md="6" center="true">
              <div
                style={{ marginTop: "2%", marginLeft: "2%", maxWidth: "420px" }}
              >
                <h2>Đăng nhập</h2>
                <MDBInput
                  wrapperClass="mb-4"
                  id="email"
                  type="email"
                  size="lg"
                  placeholder="Email"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  id="password"
                  type="password"
                  size="lg"
                  placeholder="Mật khẩu"
                />

                <div className="d-flex justify-content-between mx-4 mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="rememberCheckBox"
                    label="Remember me"
                    onChange={rememberMe}
                  />
                  <a href="!#">Forgot password?</a>
                </div>

                <Button
                  variant="primary"
                  className="mb-3 w-100"
                  onClick={login}
                >
                  login
                </Button>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <div id="test"></div>
    </>
  );
}

export default LoginForm;
