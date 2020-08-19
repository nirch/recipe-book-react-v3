import React, { Component } from 'react';
import RecipeNavbar from '../components/RecipeNavbar';

class RecipesPage extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {
        const { activeUser } = this.props;

        return (
            <div>
                <RecipeNavbar activeUser={activeUser}/>
                <div>
                    Recipes Page
                </div>
            </div>
        );
    }
}

export default RecipesPage;