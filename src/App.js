import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route, HashRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecipesPage from './pages/RecipesPage';
import jsonUsers from './data/users.json'
import jsonRecipes from './data/recipes.json'


// State
// activeUser - object - a User object containing all the details for the active user.
//  If there is no active user this state will hold the value of null
// users - array - an array that contains all the users in the system (this is a HACK
//   since we don't have a server side)
// recipes - array - an array that contains all the recipes in the system (this is a HACK
//   since we don't have a server side)
class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      activeUser: null,
      users: jsonUsers,
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
    console.log(recipe);
    // this.setState({
    //   recipes: recipes.concat(recipe);
    // })
  }

  render() {
    const { activeUser, users, recipes } = this.state;

    return (
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <HomePage activeUser={activeUser} handleLogout={this.handleLogout}/>
          </Route>
          <Route exact path="/login">
            <LoginPage activeUser={activeUser} users={users} handleLogin={this.handleLogin}/>
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
