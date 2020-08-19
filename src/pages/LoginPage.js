import React, { Component } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import './LoginPage.css'

class LoginPage extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            emailInput: "",
            pwdInput: ""
        }

        this.login = this.login.bind(this);
    }
    
    login() {
        const { emailInput, pwdInput } = this.state;

        alert(emailInput + " " + pwdInput);
    }

    render() {

        const { emailInput, pwdInput } = this.state;

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
                            <Form.Control type="email" placeholder="Email" value={emailInput} onChange={(e) => this.setState({emailInput: e.target.value})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" placeholder="Password" value={pwdInput} onChange={(e) => this.setState({pwdInput: e.target.value})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group>
                            <Button type="button" onClick={this.login} block variant="success">Login</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default LoginPage;