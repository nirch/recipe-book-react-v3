import React, { Component } from 'react';
import RecipeNavbar from '../components/RecipeNavbar';
import { Redirect } from 'react-router-dom';
import { Container, Col, Row, Button, Modal, Form, Image } from 'react-bootstrap';
import RecipeCard from '../components/RecipeCard';
import './RecipePage.css'
import Parse from 'parse';
import RecipeModel from "../model/RecipeModel"

class RecipesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showNewRecipeModal: false,
            nameInput: "",
            descInput: "",
            imgInput: null,
            recipes: []
        }

        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCreateRecipe = this.handleCreateRecipe.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);

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

        // 1) Create Recipe in Parse
        const Recipe = Parse.Object.extend('Recipe');
        const newRecipe = new Recipe();

        newRecipe.set('name', nameInput);
        newRecipe.set('desc', descInput);
        newRecipe.set('image', new Parse.File(imgInput.name, imgInput));
        newRecipe.set('ownerId', Parse.User.current());

        newRecipe.save().then(
            (result) => {
                // 2) Update state (recipe array) with the new recipe
                const recipe = new RecipeModel(result);
                this.setState({
                    recipes: this.state.recipes.concat(recipe)
                });
            },
            (error) => {
                console.error('Error while creating Recipe: ', error);
            }
        );

        // 3) Close the modal
        this.handleModalClose();
    }

    handleFileChange(event) {

        if (event.target.files[0]) {
            this.setState({
                imgInput: event.target.files[0]
            });
        } else {
            this.setState({
                imgInput: null
            });
        }
    }

    async componentDidMount() {
        // Load active user recipes from Parse

        if (this.props.activeUser) {
            const Recipe = Parse.Object.extend('Recipe');
            const query = new Parse.Query(Recipe);
            query.equalTo("ownerId", Parse.User.current());
            const results = await query.find();
            const recipes = results.map(result => new RecipeModel(result));
            this.setState({
                recipes: recipes
            });
        }
    }

    render() {
        const { activeUser, handleLogout } = this.props;
        const { showNewRecipeModal, nameInput, descInput, imgInput, recipes } = this.state;

        if (!activeUser) {
            return <Redirect to="/" />
        }

        // Map my recipes to UI
        const myRecipesUI = recipes.map(recipe => <Col key={recipe.id} lg={3} md={4} sm={6}>
            <RecipeCard recipe={recipe} />
        </Col>)

        const imgURL = imgInput ? URL.createObjectURL(imgInput) : "";

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
                                    <Form.Control type="text" value={nameInput} name="nameInput" onChange={this.handleInputChange} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="desc">
                                <Form.Label column sm={2}>
                                    Description
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" value={descInput} name="descInput" onChange={this.handleInputChange} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="img">
                                <Form.Label column sm={2}>
                                    Image
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="file" accept="image/*" onChange={this.handleFileChange} />
                                </Col>
                            </Form.Group>
                            <Image src={imgURL} className="preview" />
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