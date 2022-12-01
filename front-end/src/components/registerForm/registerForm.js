import React from 'react';
import axios from 'axios';

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
        <>
            <div className='d-flex justify-content-center sm'>
                <img src='Logo.jpg' alt='Logo' ></img>
            </div> 
            <div className="Auth-form-container">
            


            <div className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Register</h3>
                    <div className="form-group mt-3">
                        <label>name</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter name"
                            id="name"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            id='email'
                        />
                    </div>
                    
                    <div className="form-group mt-3">
                        <label>Address</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter address"
                            id='address'
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1 "
                            placeholder="Enter password"
                            id='password'
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password confirm</label>
                        <input
                            type="password"
                            className="form-control mt-1 "
                            placeholder="Enter password confirm"
                            id='password_confirm'
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            onClick={register} 
                        >
                                Submit
                        </button>
                    </div>
                        <div className='d-flex justify-content-center'>
                    </div>
                </div>
            </div>
    </div>
    </>
  );
}
