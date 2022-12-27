import { useEffect, useState } from "react";
import { NavLink } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaCannabis } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../API/auth";
import { Executive_Board, Factory, Shop, TTBH } from "../../auth/Role";
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

const getChucVu = (roleId) => {
  switch (roleId) {
    case 1:
      return "Ban điều hành";
    case 2:
      return "Nhà máy";
    case 3:
      return "Shop";
    case 4:
      return "Trung tâm bảo hành";
    default:
      return "";
  }
};
const headerButton = (roleId) => {
  switch (roleId) {
    case 1:
      return Executive_Board;
    // break;
    case 2:
      return Factory;
    case 3:
      return Shop;
    case 4:
      return TTBH;
    default:
      return null;
  }
};
function HeaderBar({ role }) {
  const navig = useNavigate();
  const [settingState, updateSettingState] = useSettingContext();
  const [loginState, updateLoginState] = useLoginContext();
  const [btns, setBtns] = useState(headerButton(loginState.user.roleId));
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
    navig(`/home/profile/${loginState.user.id}`);
  };
  const gotoPage = (e) => {
    navig(e.target.name);
    console.log(e.target.name);
  };
  const handleClickNavLink = () => {};
  const navigateProfile = () => {
    navig(`/home/profile/${loginState.user.id}`);
  };
  return (
    <div>
      <Navbar id="hd" className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Container fluid>
          <Navbar.Brand href="#home">
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
            <Nav>
              {btns.options.map((item, index) => {
                return (
                  <NavLink
                    key={item.label + index}
                    name={item.link}
                    onClick={gotoPage}
                  >
                    {item.label}
                  </NavLink>
                );
              })}
              <NavDropdown
                title={loginState.user.name}
                id="navbarScrollingDropdown"
                align="end"
              >
                <NavDropdown.Item onClick={navigateProfile}>
                  Hồ sơ
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Đăng xuất</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
export { getChucVu };
export default HeaderBar;
