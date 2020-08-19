import React, { Component } from 'react';
import { Form, Col, Row, Button, Alert } from 'react-bootstrap';
import './LoginPage.css'

class LoginPage extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            emailInput: "",
            pwdInput: "",
            showInvalidCredentials: false
        }

        this.login = this.login.bind(this);
    }
    
    login() {
        const { emailInput, pwdInput } = this.state;
        const { users } = this.props;

        // Check if the login is valid (if a user with the same 
        // email and pwd was found in the users array)
        const userFound = users.find(user => emailInput === user.email && pwdInput === user.pwd);

        if (userFound) {
            // If the login is valid: notify App and redirect to "/recipes"
            alert("found");

        } else {
            // If the login is not valid: show an error alert
            this.setState({
                showInvalidCredentials: true
            })
        }
    }

    render() {

        const { emailInput, pwdInput, showInvalidCredentials } = this.state;

        return (
            <div className="p-login">
                <h1>Login to Recipe Book</h1>
                or <a href="#/signup">create a new account</a>
                <Form>
                    {showInvalidCredentials ? <Alert variant="danger">
                        Invalid Credientails! Incorrect email or password
                    </Alert> : null}
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="Email" value={emailInput} onChange={(e) => this.setState({emailInput: e.target.value, showInvalidCredentials: false})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" placeholder="Password" value={pwdInput} onChange={(e) => this.setState({pwdInput: e.target.value, showInvalidCredentials: false})}/>
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