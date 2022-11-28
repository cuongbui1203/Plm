import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaCannabis } from "react-icons/fa";
import "./HeaderBar.css";

function HeaderBar() {
  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Container fluid>
        <Navbar.Brand href="#home"> <FaCannabis className='cannabis'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#" disabled>"chức vụ"</Nav.Link>
            <NavDropdown title="User" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#infor">Hồ sơ</NavDropdown.Item>
              <NavDropdown.Item href="#setting">Cài đặt</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#lobby">Đổi tài khoản</NavDropdown.Item>
              <NavDropdown.Item href="#lobby">Đăng xuất</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderBar;