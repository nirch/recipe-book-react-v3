import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route, HashRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecipesPage from './pages/RecipesPage';
import jsonRecipes from './data/recipes.json'
import Parse from 'parse';

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'BMR96akGeFKOOJpJiJq7bc1UwKHzNlm7yuYCWpjj', // This is your Application ID
  'eIy7FBBSSrQhskgXMcjjceN1B4q9Vrn419VHtoNI', // This is your Javascript key
);

// State
// activeUser - object - a User object containing all the details for the active user.
//  If there is no active user this state will hold the value of null
// recipes - array - an array that contains all the recipes in the system (this is a HACK
//   since we don't have a server side)
class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      activeUser: null,
      recipes: jsonRecipes
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleNewRecipe = this.handleNewRecipe.bind(this);

  }
  

  handleLogin(activeUser) {
    this.setState({
      activeUser: activeUser
    })
  }

  handleLogout() {
    this.setState({
      activeUser: null
    })
  }

  handleNewRecipe(recipe) {

    const { activeUser, recipes } = this.state

    // Adding to the recipe object usedId and id
    recipe.userId = activeUser.id;

    // for id I am taking the id of the last recipe in the array and adding 1
    recipe.id = recipes[recipes.length - 1].id + 1;

    this.setState({
      recipes: recipes.concat(recipe)
    })
  }

  render() {
    const { activeUser, recipes } = this.state;

    return (
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <HomePage activeUser={activeUser} handleLogout={this.handleLogout}/>
          </Route>
          <Route exact path="/login">
            <LoginPage activeUser={activeUser} handleLogin={this.handleLogin}/>
          </Route>
          <Route exact path="/recipes">
            <RecipesPage activeUser={activeUser} recipes={recipes} handleLogout={this.handleLogout} 
              handleNewRecipe={this.handleNewRecipe}/>
          </Route>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
