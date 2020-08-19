import React, { Component } from 'react';
import RecipeNavbar from '../components/RecipeNavbar';
import { Redirect } from 'react-router-dom';

class RecipesPage extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {
        const { activeUser, handleLogout } = this.props;

        if (!activeUser) {
            return <Redirect to="/" />
        }


        return (
            <div>
                <RecipeNavbar activeUser={activeUser} handleLogout={handleLogout}/>
                <div>
                    Recipes Page
                </div>
            </div>
        );
    }
}

export default RecipesPage;