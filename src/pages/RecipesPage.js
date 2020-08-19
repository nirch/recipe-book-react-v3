import React, { Component } from 'react';
import RecipeNavbar from '../components/RecipeNavbar';

class RecipesPage extends Component {
    render() {
        return (
            <div>
                <RecipeNavbar />
                <div>
                    Recipes Page
                </div>
            </div>
        );
    }
}

export default RecipesPage;