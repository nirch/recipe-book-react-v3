import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, HashRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecipesPage from './pages/RecipesPage';


class App extends React.Component {

  render() {

    return (
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/recipes">
            <RecipesPage />
          </Route>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
