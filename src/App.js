import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route, HashRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecipesPage from './pages/RecipesPage';
import jsonUsers from './data/users.json'


// State
// activeUser - object - a User object containing all the details for the active user.
//  If there is no active user this state will hold the value of null
// users - array - an array that contains all the users in the system (this is a HACK
//   since we don't have a server side)
class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      activeUser: null,
      users: jsonUsers
    }

    this.handleLogout = this.handleLogout.bind(this);
  }
  
  handleLogout() {
    this.setState({
      activeUser: null
    })
  }


  render() {
    const { activeUser, users } = this.state;

    return (
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <HomePage activeUser={activeUser} handleLogout={this.handleLogout}/>
          </Route>
          <Route exact path="/login">
            <LoginPage activeUser={activeUser} users={users}/>
          </Route>
          <Route exact path="/recipes">
            <RecipesPage activeUser={activeUser} handleLogout={this.handleLogout}/>
          </Route>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
