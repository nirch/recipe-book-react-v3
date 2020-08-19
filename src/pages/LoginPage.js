import React, { Component } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import './LoginPage.css'

class LoginPage extends Component {
    render() {
        return (
            <div className="p-login">
                <h1>Login to Recipe Book</h1>
                or <a href="#/signup">create a new account</a>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="Email" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" placeholder="Password" />
                        </Col>
                    </Form.Group>

                    <Form.Group>
                            <Button type="submit" block variant="success">Login</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default LoginPage;