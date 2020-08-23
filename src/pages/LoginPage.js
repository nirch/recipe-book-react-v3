import React, { Component, useState } from 'react';
import { Form, Col, Row, Button, Alert } from 'react-bootstrap';
import './LoginPage.css'
import { Redirect } from 'react-router-dom';
import Parse from 'parse';
import UserModel from '../model/UserModel';

function LoginPage(props) {

    const [emailInput, setEmailInput] = useState("john@john.com");
    const [pwdInput, setPwdInput] = useState("123");
    const [showInvalidCredentials, setShowInvalidCredentials] = useState(false);
    const [redirectToRecipes, setRedirectToRecipes] = useState(false);

    const { handleLogin } = props;


    function login() {

        // Pass the username and password to logIn function
        Parse.User.logIn(emailInput, pwdInput).then(user => {
            // If the login is valid: notify App and redirect to "/recipes"
            handleLogin(new UserModel(user));
            setRedirectToRecipes(true);
        }).catch(error => {
            // If the login is not valid: show an error alert
            setShowInvalidCredentials(true);
        });
    }

    if (redirectToRecipes) {
        return <Redirect to="/recipes" />
    }

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
                        <Form.Control type="email" placeholder="Email" value={emailInput} onChange={(e) => {setEmailInput(e.target.value); setShowInvalidCredentials(false)}} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Password
                        </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" placeholder="Password" value={pwdInput} onChange={(e) => {setPwdInput(e.target.value); setShowInvalidCredentials(false)}} />
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Button type="button" onClick={login} block variant="success">Login</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default LoginPage;