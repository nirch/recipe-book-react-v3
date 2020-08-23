import React, { useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route, HashRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecipesPage from './pages/RecipesPage';
import Parse from 'parse';

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'BMR96akGeFKOOJpJiJq7bc1UwKHzNlm7yuYCWpjj', // This is your Application ID
  'eIy7FBBSSrQhskgXMcjjceN1B4q9Vrn419VHtoNI', // This is your Javascript key
);

// State
// activeUser - object - a User object containing all the details for the active user.
//  If there is no active user this state will hold the value of null
function App() {

  const [activeUser, setActiveUser] = useState(null);

  function handleLogin(activeUser) {
    setActiveUser(activeUser);
  }

  function handleLogout() {
    setActiveUser(null);
  }

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <HomePage activeUser={activeUser} handleLogout={handleLogout} />
        </Route>
        <Route exact path="/login">
          <LoginPage activeUser={activeUser} handleLogin={handleLogin} />
        </Route>
        <Route exact path="/recipes">
          <RecipesPage activeUser={activeUser} handleLogout={handleLogout} />
        </Route>
      </Switch>
    </HashRouter>
  );
}


export default App;
