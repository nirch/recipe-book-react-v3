import React, { Component } from 'react';
import RecipeNavbar from '../components/RecipeNavbar';
import { Redirect } from 'react-router-dom';
import { Container, Col, Row, Button } from 'react-bootstrap';
import RecipeCard from '../components/RecipeCard';
import './RecipePage.css'

class RecipesPage extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const { activeUser, handleLogout, recipes } = this.props;

        if (!activeUser) {
            return <Redirect to="/" />
        }

        // Filter only me recipes
        const myRecipes = recipes.filter(recipe => recipe.userId === activeUser.id);

        // Map my recipes to UI
        const myRecipesUI = myRecipes.map(recipe => <Col lg={3} md={4} sm={6}>
                                                        <RecipeCard recipe={recipe}/>
                                                    </Col> )

        return (
            <div className="p-recipes">
                <RecipeNavbar activeUser={activeUser} handleLogout={handleLogout} />
                <Container>
                    <div>
                        <div className="heading">
                            <h1>{activeUser.fname}'s Recipes</h1>
                            <Button>New Recipe</Button>
                        </div>
                        <Row>
                            {myRecipesUI}
                        </Row>
                    </div>
                </Container>
            </div>
        );
    }
}

export default RecipesPage;