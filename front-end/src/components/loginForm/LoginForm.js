import React from "react";
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBInput,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';

import './Loginform.css'

export default function LoginForm(){
    return(
        <>
            <MDBContainer fluid className="p-3 my-5">

                <MDBRow>

                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
                    </MDBCol>

                    <MDBCol col='4' md='6'>


                        <MDBInput wrapperClass='mb-4'  id='formControlLg' type='email' size="lg" placeholder="Email"/>
                        <MDBInput wrapperClass='mb-4'  id='formControlLg' type='password' size="lg" placeholder="Mật khẩu"/>


                        <div className="d-flex justify-content-between mx-4 mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                            <a href="!#">Forgot password?</a>
                        </div>

                        <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        </>
    );
}