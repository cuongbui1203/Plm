import React from "react";
import {Container, Nav, NavDropdown, NavItem} from "react-bootstrap";
import './SideBar.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { IoRefresh } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";


function SideBar() {
    return (
        <div>
            <Nav id="b" className="col-md-12 d-none d-md-block bg-dark sidebar"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
        >
          
                <Button variant="outline-success" className="bt"> <IoAdd /> </Button>
                <Button variant="outline-danger" className="bt"><AiFillDelete /></Button>
                <Button variant="outline-primary" className="bt"><IoRefresh /></Button>
            
                
            <ul className="list-group list-group-flush"> &ensp;Search by:
            <li className="list-group-item"> ID:
              <Form className="d-flex">
              <Form.Control
              type="search"
              placeholder="ID"
              className="me-2"
              aria-label="Search"
              />
              <Button variant="outline-success" className="btns">Search</Button>
              </Form>
            </li>
            <li className="list-group-item">Date:
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Date"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className="btns">Search</Button>
              </Form>
            </li>
            <li className="list-group-item">Kho:
              <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Kho"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className="btns">Search</Button>
          </Form></li>
            <li className="list-group-item">Time:
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Time"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className="btns">Search</Button>
              </Form>
            </li>
          </ul>
          
          <ul className="list-group list-group-flush sort" id="sortList"> &ensp;Sort by:
            <li className="list-group-item sortBy" id="SortA-Z">
              A-Z
                    <span className="arrow"></span>
                  </li>
            <li className="list-group-item sortBy" id="SortDate">
              Date
                    <span class="arrow"></span>
                  </li>
            <li className="list-group-item sortBy" id="SortQ">
              Quantity
                    <span class="arrow"></span>
                  </li>
                </ul>
            </Nav>
          
        </div>
        );
}


export default SideBar;
