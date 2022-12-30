import { useState } from "react";
import { Button, Modal, NavLink } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaCannabis } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { logoutApi } from "../../API/auth";
import { banApi, getAllProductApi } from "../../API/productApi";
import { Executive_Board, Factory, Shop, TTBH } from "../../auth/Role";
import Notification from "../../components/notification/notification";
import {
  setLogoutFail,
  setLogoutSuccess,
} from "../../state/actions/loginActions";
import {
  setCreate,
  setLoaded,
  setLoading,
} from "../../state/actions/settingActions";
import { useLoginContext, useSettingContext } from "../../state/hook/hooks";
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
function HeaderBar() {
  const navig = useNavigate();
  const [settingState, updateSettingState] = useSettingContext();
  const [loginState, updateLoginState] = useLoginContext();
  const [btns, setBtns] = useState(headerButton(loginState.user.roleId));
  const [showModal, setShowModal] = useState(false);
  const [idSp, setIdSp] = useState("");
  const [sp, setSP] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
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
    updateSettingState(setCreate(e.target.title));
    navig(e.target.name);
    console.log(e.target.title);
  };

  const navigateProfile = () => {
    navig(`/home/profile/${loginState.user.id}`);
  };
  const isShop = () => {
    if (loginState.user.roleId === 3) {
      return (
        <>
          <NavLink
            key={4}
            name={"Bán"}
            title={"Bán"}
            onClick={() => {
              getAllProduct().then((e) => {
                setShowModal(true);
              });
            }}
          >
            {"Bán"}
          </NavLink>
        </>
      );
    }
    return <></>;
  };
  const handleBan = async () => {
    console.log(idSp);
    console.log(name);
    console.log(address);
    const info = {
      name: name,
      address: address,
    };
    const data = new FormData();
    data.append("info", JSON.stringify(info));
    const response = await banApi(idSp, data);
    if (response.success) {
      Notification("success", "thanh cong");
    } else {
      Notification("error", "that bai");
    }
    setShowModal(false);
  };
  const getAllProduct = async () => {
    const response = await getAllProductApi();
    if (response.success) {
      const tg = [];
      response.data.map((e, index) => {
        if (e.status != 3) {
          tg.push({
            label: `Tên: ${e.name} | Dòng: ${e.productLine} | Status ${e.status}`,
            value: e.productId,
          });
        }
      });
      setSP(tg);
    }
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
                    title={item.const}
                    onClick={gotoPage}
                  >
                    {item.label}
                  </NavLink>
                );
              })}
              {isShop()}
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

      <Modal
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>Nhập thông tin người mua</Modal.Header>
        <Modal.Body>
          <div>
            <label>Chọn Sản phẩm</label>
            <Select
              
              options={sp}
              isSearchable
              defaultValue={sp[0]}
              onChange={(e) => {
                setIdSp(e.value);
              }}
              // styles={customStyles}
            />
          </div>
          <div style={{ padding: "5px" }}>
            <label>Tên</label>
            <input
              style={{ float: "right", width: "380px" }}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div style={{ padding: "5px" }}>
            <label>Địa chỉ</label>
            <input
              style={{ float: "right", width: "380px" }}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          {/* <div></div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button onClick={handleBan}>OK</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export { getChucVu };
export default HeaderBar;
