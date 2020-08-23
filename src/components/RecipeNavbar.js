import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

function RecipeNavbar(props) {

    const { activeUser, handleLogout } = props;

    // rendering the menu items depending on whether we have an active user or not
    const recipesMenuItem = activeUser ? <Nav.Link href="#/recipes">Recipes</Nav.Link> : null;
    const loginMenuItem = !activeUser ? <Nav.Link href="#/login">Login</Nav.Link> : null;
    const signupMenuItem = !activeUser ? <Nav.Link href="#/signup">Signup</Nav.Link> : null;
    const logoutMenuItem = activeUser ? <Nav.Link onClick={() => { handleLogout() }} href="#">Logout</Nav.Link> : null;

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#/">Recipe Book</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {recipesMenuItem}
                </Nav>
                <Nav className="ml-auto">
                    {loginMenuItem}
                    {signupMenuItem}
                    {logoutMenuItem}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}


export default RecipeNavbar;