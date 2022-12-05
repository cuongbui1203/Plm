import React from "react";
import axios from 'axios';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import './Loginform.css'
import { Navigate, useNavigate } from "react-router-dom";
import Notification from "../notification/notification";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleAuth } from "../../hook/authHook";
import { useStore,actions } from "../../store";
import { 
    SET_LOGIN_BEGIN, 
    SET_LOGIN_SUCCESS,
    SET_LOGIN_FAIL
} from "../../store/constants";
import { loginApi } from "../../API/auth";


function LoginForm(){
    
    const navigation = useNavigate()
    const [ state,dispatch] = useStore()
    
    async function login() {
        let data = {
            'email':document.getElementById('email').value,
            'password':document.getElementById('password').value
        }
        // console.log(data);
        dispatch(actions.setLoginBegin(''))
        const response = await loginApi(data)
        console.log(response)
        if(response.success){
            console.log(response)
            dispatch(actions.setLoginSuccess(''))
            // navi('/home')
            Notification("success","Login Success")
            navigation('/home')
            console.log(state)
        }else{
            dispatch(actions.setLoginFail(''))
            Notification('error','Login Fail')
            
        }
        console.log(state);
    }
    return(
        <>
            <MDBContainer fluid className="p-3 my-5">

                <MDBRow>

                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
                    </MDBCol>

                    <MDBCol col='4' md='6'>


                        <MDBInput wrapperClass='mb-4'  id='email' type='email' size="lg" placeholder="Email"/>
                        <MDBInput wrapperClass='mb-4'  id='password' type='password' size="lg" placeholder="Mật khẩu"/>


                        <div className="d-flex justify-content-between mx-4 mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                            <a href="!#">Forgot password?</a>
                        </div>

                        <Button variant="primary" className="mb-3 w-100" onClick={login}>login</Button>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>
            {/* <ToastContainer autoClose={false} draggableDirection="y" /> */}

        </>
    );
}

export default LoginForm