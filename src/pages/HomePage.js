import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import RecipeNavbar from '../components/RecipeNavbar';

class HomePage extends Component {


    render() {
        return (
            <div>
                <RecipeNavbar />
                <Container>
                    Home Page
                </Container>
            </div>
        );
    }
}

export default HomePage;