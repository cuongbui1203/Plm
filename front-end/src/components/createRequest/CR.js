import React from 'react';
import Form from "react-bootstrap/Form";
import Table from 'react-bootstrap/Table';
import { IoAdd } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import { AiFillDelete } from "react-icons/ai";
import './CR.css';

var chks = document.getElementsByName("chk");
for (let i = 0; i < chks.length; i++)
	chks[i].onchange = function() {
			if (this.checked) {
				this.parentNode.parentNode.classList.add("selectedr");
				let c = document.getElementsByName("chk");
				let j = 0;
				for (; j < c.length; j++) 
					if (!c[j].checked) break;
				if (j == c.length) document.getElementById("chkall").checked = true;
				else document.getElementById("chkall").checked = false;
				document.querySelector("div.group-op").classList.remove("nodisplay");
			} else {
				this.parentNode.parentNode.classList.remove("selectedr");
				document.getElementById("chkall").checked = false;
				let c = document.getElementsByName("chk");
				let j = 0;		
				for (; j < c.length; j++)
					if (c[j].checked) break;
				if (j == c.length) document.querySelector("div.group-op").classList.add("nodisplay");
				else document.querySelector("div.group-op").classList.remove("nodisplay");
				
			}
	};

//
// KĂ­ch check all
//
document.getElementById("chkall").onchange = function() {
	let c = document.getElementsByName("chk");			
	for (let i = 0; i < c.length; i++) {
		c[i].checked = this.checked;
		if (c[i].checked) c[i].parentNode.parentNode.classList.add("selectedr");
		else c[i].parentNode.parentNode.classList.remove("selectedr");		
	}
	if (this.checked) document.querySelector("div.group-op").classList.remove("nodisplay");
	else document.querySelector("div.group-op").classList.add("nodisplay");
};

// XÓa
document.querySelector(".group-op-delete").onclick = function() {
	let c = document.getElementsByName("chk");	 		
	for (let i = c.length-1; i >= 0; i--)
		if (c[i].checked) {
			c[i].parentNode.parentNode.parentNode.removeChild(c[i].parentNode.parentNode);
		}
}

export default function CR() {
    return (
        <div id="wrapper">
          <div className="box" >
              <div className='form'>
                <h3>Gửi yêu cầu</h3>
                <div className="form-group">
                    <Form.Select className='rsF' size='sm'>
                    <option selected disabled >Loại</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </Form.Select>
                    <i></i>  
                </div>
                <div className="form-group">
                    <Form.Select className='rsF' size='sm'>
                    <option selected disabled >Gửi đến</option>
                        <option value="1">A</option>
                        <option value="2">B</option>
                        <option value="3">C</option>
                    </Form.Select>
                    <i></i>  
                </div>
                <div className="form-group">
                    <Form.Select className='rsF' size='sm'>
                    <option selected disabled >Tên</option>
                        <option value="1">X</option>
                        <option value="2">Y</option>
                        <option value="3">Z</option>
                    </Form.Select>
                    <i></i>
                </div>
                <div className="form-group">
                    <textarea type="password" name="password" className='register' size='sm' required />
                    <span>Nội dung</span>
                    <i></i>
                </div>
    <div class="group-op-container" align="end">
		<div class="group-op nodisplay">
			<Button variant="outline-danger" className="bt" size='sm'><AiFillDelete /></Button> 
		</div>
	</div>
    <div className="form-group tbl-cr">
        <Table striped bordered hover variant="dark" size="sm" className='tb-cr'>
      <thead>
        <tr>
          <th>STT</th>
          <th>ID</th>
          <th>Số Lượng</th>
          <th>
            <input type="checkbox" id="chkall"></input>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>1</td>
          <td>
            <input type="checkbox" name="chk"></input>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>2</td>
          <td>
            <input type="checkbox" name="chk"></input>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Jacob</td>
          <td>2</td>
          <td>
            <input type="checkbox" name="chk"></input>
          </td>
        </tr>
        
        <tr>
          <td><Button variant="outline-success" className="bt" size="sm">
            {" "}
            <IoAdd />{" "}
          </Button></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
                    </div>  
                    <div align="end">
                        <Button variant="outline-danger" size='sm' style={{marginRight: "5px"}}>Hủy</Button>
                        <Button variant="outline-success" size='sm'>Gửi</Button>
                    </div>
               </div>
            </div>
        </div>
    )
}