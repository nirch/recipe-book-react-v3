import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

class RecipeNavbar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#/">Recipe Book</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#/recipes">Recipes</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="#/login">Login</Nav.Link>
                        <Nav.Link href="#/signup">Signup</Nav.Link>
                        <Nav.Link href="javascript:void(0)">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default RecipeNavbar;