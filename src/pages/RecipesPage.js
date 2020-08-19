import React, { Component } from 'react';
import RecipeNavbar from '../components/RecipeNavbar';
import { Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

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
        const myRecipesUI = myRecipes.map(recipe => <p key={recipe.id}>{recipe.name}</p>)

        return (
            <div className="p-recipes">
                <Container>
                    <RecipeNavbar activeUser={activeUser} handleLogout={handleLogout} />
                    <div>
                        <h1>{activeUser.fname}'s Recipes</h1>
                        {myRecipesUI}
                    </div>
                </Container>
            </div>
        );
    }
}

export default RecipesPage;