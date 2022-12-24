import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaCannabis } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../API/auth";
import Notification from "../../components/notification/notification";
import {
  setLogoutFail,
  setLogoutSuccess,
} from "../../state/actions/loginActions";
import { setLoaded, setLoading } from "../../state/actions/settingActions";
import {
  useDataContext,
  useLoginContext,
  useSettingContext,
} from "../../state/hook/hooks";
import "./HeaderBar.css";

function HeaderBar({ role }) {
  const navig = useNavigate();
  const [settingState, updateSettingState] = useSettingContext();
  const [loginState, updateLoginState] = useLoginContext();
  const [dataState, updateDateState] = useDataContext();
  const [roleTitle, updateRoleTitle] = useState("");
  const logout = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    updateSettingState(setLoading());
    let response = await logoutApi();
    if (response.success) {
      updateLoginState(setLogoutSuccess());
      localStorage.removeItem("token");
      Notification("success", "đăng xuất thành công");
      navig("/");
    } else {
      updateLoginState(setLogoutFail());
      Notification("error", "Đăng xuất thất bại");
    }
    updateSettingState(setLoaded());
  };
  const navigateToHome = () => {
    navig("/product");
  };

  const navigateProfile = () => {
    navig("/profile");
  };
  const getChucVu = () => {
    updateRoleTitle(loginState.isLogin ? loginState.user.role : "");
  };
  useEffect(() => {
    getChucVu();
    console.log("test");
  }, [settingState]);
  return (
    <div>
      <Navbar
        id="hd"
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        hidden={!loginState.isLogin}
      >
        <Container fluid>
          <Navbar.Brand href="home">
            {" "}
            <FaCannabis className="cannabis" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link onClick={navigateToHome}>Home</Nav.Link>
            </Nav>
            <Nav hidden={!loginState.isLogin}>
              <NavDropdown
                title={role}
                id="navbarScrollingDropdown"
                align="end"
              >
                <NavDropdown.Item href="/info">thêm</NavDropdown.Item>
                <NavDropdown.Item href="#setting">sửa</NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item href="#lobby">xóa</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="User"
                id="navbarScrollingDropdown"
                align="end"
              >
                <NavDropdown.Item onClick={navigateProfile}>
                  Hồ sơ
                </NavDropdown.Item>
                <NavDropdown.Item href="#setting">Cài đặt</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#lobby">Đổi tài khoản</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Đăng xuất</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default HeaderBar;
