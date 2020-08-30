import React, { Component } from 'react';
import RecipeNavbar from '../components/RecipeNavbar';
import { Redirect } from 'react-router-dom';
import { Container, Col, Row, Button, Modal, Form, Image } from 'react-bootstrap';
import RecipeCard from '../components/RecipeCard';
import './RecipePage.css'
import emailjs from 'emailjs-com'
import { Pie } from 'react-chartjs-2';

class RecipesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showNewRecipeModal: false,
            nameInput: "",
            descInput: "",
            imgInput: null,
            difficultyInput: 1
        }

        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCreateRecipe = this.handleCreateRecipe.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.cleanModalData = this.cleanModalData.bind(this);

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

    cleanModalData() {
        this.setState({
            nameInput: "",
            descInput: "",
            imgInput: null,
            difficultyInput: 1
        })
    }

    handleCreateRecipe() {
        const { nameInput, descInput, imgInput, difficultyInput } = this.state;
        const newRecipe = {
            name: nameInput,
            desc: descInput,
            img: URL.createObjectURL(imgInput),
            difficulty: difficultyInput
        };

        this.props.handleNewRecipe(newRecipe);

        this.handleModalClose();

        this.cleanModalData();

        // send an email
        var template_params = {
            "to_email": this.props.activeUser.email,
            "recipe_name": nameInput,
            "fname": this.props.activeUser.fname,
            "lname": this.props.activeUser.lname,
            "recipe_desc": descInput
        }

        var service_id = "default_service";
        var template_id = "new_recipe";
        emailjs.send(service_id, template_id, template_params);
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

    render() {
        const { activeUser, handleLogout, recipes } = this.props;
        const { showNewRecipeModal, nameInput, descInput, imgInput, difficultyInput } = this.state;

        if (!activeUser) {
            return <Redirect to="/" />
        }

        // Filter only me recipes
        const myRecipes = recipes.filter(recipe => recipe.userId === activeUser.id);

        // Map my recipes to UI
        const myRecipesUI = myRecipes.map(recipe => <Col key={recipe.id} lg={3} md={4} sm={6}>
            <RecipeCard recipe={recipe} />
        </Col>)

        const imgURL = imgInput ? URL.createObjectURL(imgInput) : "";

        let easyRecipes = 0;
        let hardRecipes = 0;
        myRecipes.forEach(recipe => {
            if (recipe.difficulty == 1) {
                easyRecipes++;
            } else {
                hardRecipes++;
            }
        });

        const chartData = {
            labels: [
                'Easy',
                'Hard'
            ],
            datasets: [{
                data: [easyRecipes, hardRecipes],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB'
                ]
            }]
        };

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
                        <Pie data={chartData} width={500} />
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
                            <Form.Group as={Row} controlId="difficulty">
                                <Form.Label column sm={2}>
                                    Difficulty
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control as="select" value={difficultyInput} onChange={e => this.setState({difficultyInput: e.target.value})}>
                                        <option value="1">Easy</option>
                                        <option value="2">Hard</option>
                                    </Form.Control>
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