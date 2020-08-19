import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route, HashRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecipesPage from './pages/RecipesPage';


// State
// activeUser - object - a User object containing all the details for the active user.
//  If there is no active user this state will hold the value of null
class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      // activeUser: null
      activeUser: {
        id: 1234,
        fname: "John",
        lname: "Doe"
      }
    }
  }
  


  render() {
    const { activeUser } = this.state;

    return (
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <HomePage activeUser={activeUser}/>
          </Route>
          <Route exact path="/login">
            <LoginPage activeUser={activeUser}/>
          </Route>
          <Route exact path="/recipes">
            <RecipesPage activeUser={activeUser}/>
          </Route>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
