import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
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
import { useLoginContext, useSettingContext } from "../../state/hook/hooks";
import "./HeaderBar.css";

function HeaderBar() {
  const navig = useNavigate();
  const [settingState, updateSettingState] = useSettingContext();
  const [loginState, updateLoginState] = useLoginContext();
  const logout = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    updateSettingState(setLoading());
    let response = await logoutApi();
    // dispatch(actions.setLoading(''))

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
  return (
    <Navbar id="hd" className="navbar navbar-expand-lg navbar-dark bg-dark">
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
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              title="Chức vụ"
              id="navbarScrollingDropdown"
              align="end"
            >
              <NavDropdown.Item href="#infor">thêm</NavDropdown.Item>
              <NavDropdown.Item href="#setting">sửa</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#lobby">xóa</NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>Đăng xuất</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="User" id="navbarScrollingDropdown" align="end">
              <NavDropdown.Item href="#infor">Hồ sơ</NavDropdown.Item>
              <NavDropdown.Item href="#setting">Cài đặt</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#lobby">Đổi tài khoản</NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>Đăng xuất</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderBar;
