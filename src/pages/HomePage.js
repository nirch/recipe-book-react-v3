import React, { Component } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import RecipeNavbar from '../components/RecipeNavbar';

class HomePage extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const { activeUser, handleLogout } = this.props;

        return (
            <div>
                <RecipeNavbar activeUser={activeUser} handleLogout={handleLogout} />
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
}

export default HomePage;