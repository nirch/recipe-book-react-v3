import React, { Component } from 'react';
import RecipeNavbar from '../components/RecipeNavbar';
import { Redirect } from 'react-router-dom';
import { Container, Col, Row, Button, Modal, Form } from 'react-bootstrap';
import RecipeCard from '../components/RecipeCard';
import './RecipePage.css'

class RecipesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showNewRecipeModal: false,
            nameInput: "",
            descInput: "",
            imgInput: ""
        }

        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCreateRecipe = this.handleCreateRecipe.bind(this);


    }

    handleModalClose() {
        this.setState({
            showNewRecipeModal: false
        })
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCreateRecipe() {
        const { nameInput, descInput, imgInput } = this.state;
        const newRecipe = { 
            name: nameInput, 
            desc: descInput, 
            img: imgInput 
        };
        
        this.props.handleNewRecipe(newRecipe);

        this.handleModalClose();
    }

    render() {
        const { activeUser, handleLogout, recipes } = this.props;
        const { showNewRecipeModal, nameInput, descInput, imgInput } = this.state;

        if (!activeUser) {
            return <Redirect to="/" />
        }

        // Filter only me recipes
        const myRecipes = recipes.filter(recipe => recipe.userId === activeUser.id);

        // Map my recipes to UI
        const myRecipesUI = myRecipes.map(recipe => <Col key={recipe.id} lg={3} md={4} sm={6}>
            <RecipeCard recipe={recipe} />
        </Col>)

        return (
            <div className="p-recipes">
                <RecipeNavbar activeUser={activeUser} handleLogout={handleLogout} />
                <Container>
                    <div>
                        <div className="heading">
                            <h1>{activeUser.fname}'s Recipes</h1>
                            <Button onClick={() => this.setState({ showNewRecipeModal: true })}>New Recipe</Button>
                        </div>
                        <Row>
                            {myRecipesUI}
                        </Row>
                    </div>
                </Container>


                <Modal show={showNewRecipeModal} onHide={this.handleModalClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>New Recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} controlId="name">
                                <Form.Label column sm={2}>
                                    Name
                                </Form.Label>
                                <Col sm={10}>
                                    {/* the value and name needs to be the same if you want to use a single function for onchange for all inputs */}
                                    <Form.Control type="text" value={nameInput} name="nameInput" onChange={this.handleInputChange}  />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="desc">
                                <Form.Label column sm={2}>
                                    Description
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" value={descInput} name="descInput" onChange={this.handleInputChange}  />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="img">
                                <Form.Label column sm={2}>
                                    Image URL
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" value={imgInput} name="imgInput" onChange={this.handleInputChange}  />
                                </Col>
                            </Form.Group>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModalClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.handleCreateRecipe}>
                            Create Recipe
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default RecipesPage;