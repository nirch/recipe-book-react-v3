import React, { Component } from 'react';
import RecipeNavbar from '../components/RecipeNavbar';
import { Redirect } from 'react-router-dom';
import { Container, Col, Row, Button, Modal } from 'react-bootstrap';
import RecipeCard from '../components/RecipeCard';
import './RecipePage.css'

class RecipesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showNewRecipeModal: false
        }

        this.handleModalClose = this.handleModalClose.bind(this);
    }

    handleModalClose() {
        this.setState({
            showNewRecipeModal: false
        })
    }

    render() {
        const { activeUser, handleLogout, recipes } = this.props;
        const { showNewRecipeModal } = this.state;

        if (!activeUser) {
            return <Redirect to="/" />
        }

        // Filter only me recipes
        const myRecipes = recipes.filter(recipe => recipe.userId === activeUser.id);

        // Map my recipes to UI
        const myRecipesUI = myRecipes.map(recipe => <Col lg={3} md={4} sm={6}>
            <RecipeCard recipe={recipe} />
        </Col>)

        return (
            <div className="p-recipes">
                <RecipeNavbar activeUser={activeUser} handleLogout={handleLogout} />
                <Container>
                    <div>
                        <div className="heading">
                            <h1>{activeUser.fname}'s Recipes</h1>
                            <Button onClick={() => this.setState({showNewRecipeModal: true})}>New Recipe</Button>
                        </div>
                        <Row>
                            {myRecipesUI}
                        </Row>
                    </div>
                </Container>


                <Modal show={showNewRecipeModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleModalClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default RecipesPage;