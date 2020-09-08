import React, { Component } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import RecipeNavbar from '../components/RecipeNavbar';


function HomePage(props) {
    const { handleLogout } = props;

    return (
        <div>
            <RecipeNavbar handleLogout={handleLogout} />
            <Jumbotron>
                <Container>
                    <h1>Recipe Book</h1>
                    <p>
                        Master your recipes
                      </p>
                </Container>
            </Jumbotron>

        </div>
    );
}

export default HomePage;