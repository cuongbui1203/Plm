import React from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import './registerForm.css';

function register(){
    // const CircularJSON = require('circular-json');
    let request = {
        'email': document.getElementById('email').value,
        'name': document.getElementById('name').value,
        'password': document.getElementById('password').value,
        'address': document.getElementById('address').value,
        'password_confirmation': document.getElementById('password_confirm').value     
    }

    axios.post('http://127.0.0.1:8000/api/user/register', request).then(res=>{
            console.log('thanh cong')
            console.log(res.response)
        }).catch(res=>{
            console.log('error')
            console.log(res.response)
        });

}

export default function RegisterForm() {
  return (
        <div id="wrapper">
          <div className="box" >
              <div className='form'>
                <h3>Tạo tài khoản</h3>
                <div className="form-group">
                    <input type="text" name="name" className='register' required />
                    <span>Tên</span>
                    <i></i>  
                </div>
                <div className="form-group">
                    <input type="text" name="email" className='register' required />
                    <span>Email</span>
                    <i></i>  
                </div>
                <div className="form-group">
                    <input type="password" name="password" className='register' required />
                    <span>Mật khẩu</span>
                    <i></i>
                </div>
                <div className="form-group">
                    <input type="password" name="password" className='register' required />
                    <span>Nhập lại mật khẩu</span>
                    <i></i>
                </div>
                <div className="form-group">
                    <Form.Select className='rsF'>
                    <option selected disabled >Chức vụ</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <i></i>
                </div>
                <div className="form-group">
                    <Form.Select className='rsF'>
                    <option selected disabled>Nơi làm việc</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <i></i>
                    
                </div>  
                <input type="submit" defaultValue="Đăng nhập" id="btn-login" />
               </div>
            </div>
        </div>

  );
}
