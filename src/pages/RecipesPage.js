import React, { Component, useEffect, useState } from 'react';
import RecipeNavbar from '../components/RecipeNavbar';
import { Redirect } from 'react-router-dom';
import { Container, Col, Row, Button, Modal, Form, Image } from 'react-bootstrap';
import RecipeCard from '../components/RecipeCard';
import './RecipePage.css'
import Parse from 'parse';
import RecipeModel from "../model/RecipeModel"
import { useContext } from 'react';
import ActiveUserContext from '../context/ActiveUserContext';

function RecipesPage(props) {

    const [showNewRecipeModal, setShowNewRecipeModal] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [descInput, setDescInput] = useState("");
    const [imgInput, setImgInput] = useState(null);
    const [recipes, setRecipes] = useState([]);


    const { handleLogout } = props;

    const activeUser = useContext(ActiveUserContext);

    function handleCreateRecipe() {

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
                setRecipes(recipes.concat(recipe))
            },
            (error) => {
                console.error('Error while creating Recipe: ', error);
            }
        );

        // 3) Close the modal
        setShowNewRecipeModal(false);
    }

    function handleFileChange(event) {

        if (event.target.files[0]) {
            setImgInput(event.target.files[0]);
        } else {
            setImgInput(null);
        }
    }

    useEffect(() => {
        if (activeUser) {
            const Recipe = Parse.Object.extend('Recipe');
            const query = new Parse.Query(Recipe);
            query.equalTo("ownerId", Parse.User.current());
            query.find().then(results => {
                // Success - results is the array of recipes
                const recipes = results.map(result => new RecipeModel(result));
                setRecipes(recipes);
            }, (error) => {
                console.error('Error while fetching Recipe', error);
            });
        }
    }, [activeUser])



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
            <RecipeNavbar handleLogout={handleLogout} />
            <Container>
                <div>
                    <div className="heading">
                        <h1>{activeUser.fname}'s Recipes</h1>
                        <Button onClick={() => setShowNewRecipeModal(true)}>New Recipe</Button>
                    </div>
                    <Row>
                        {myRecipesUI}
                    </Row>
                </div>
            </Container>



            <Modal show={showNewRecipeModal} onHide={() => setShowNewRecipeModal(false)} size="lg">
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
                                <Form.Control type="text" value={nameInput} name="nameInput" onChange={e => setNameInput(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="desc">
                            <Form.Label column sm={2}>
                                Description
                                </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={descInput} name="descInput" onChange={e => setDescInput(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="img">
                            <Form.Label column sm={2}>
                                Image
                                </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                            </Col>
                        </Form.Group>
                        <Image src={imgURL} className="preview" />
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowNewRecipeModal(false)}>
                        Cancel
                        </Button>
                    <Button variant="primary" onClick={handleCreateRecipe}>
                        Create Recipe
                        </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}


export default RecipesPage;