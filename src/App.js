import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'fontsource-roboto';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router,  Switch, Route, Link } from "react-router-dom";
import ActivePlaces from './components/ActivePlaces';
import Register from './components/Register';
import RegisterVisit from './components/RegisterVisit';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/active-places">
            <ActivePlaces />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/register-visit">
            <RegisterVisit />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
