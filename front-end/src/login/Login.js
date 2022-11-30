import React from 'react';
import { Form, Button } from 'react-bootstrap';

function Login() {
    return (
        <div className='navbar-dark bg-dark' style={{ margin:"auto", width:"45%"}}>
            <Form style={{width:"40%", marginLeft:"30%", marginTop:"30%"}}>
                <Form.Group >
                    <Form.Label>Enter your email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Enter your password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    )
}
export default Login;