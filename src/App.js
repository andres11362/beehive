import React, { Component } from 'react';
import './App.css';
import 'fontsource-roboto';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router,  Switch, Route, browserHistory, Redirect } from "react-router-dom";
import ActivePlaces from './components/ActivePlaces';
import Register from './components/Register';
import RegisterVisit from './components/RegisterVisit';
import Login from './components/SignIn';
import Place from './components/Place';
import VisitedPlaces from './components/VisitedPlaces';
import { Fab } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ActiveVisit from './components/ActiveVisit';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      path: '/',
      user: {},
      place: '',
      active: false,
    }
    this.getValueAuth = this.getValueAuth.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getActiveCountDown = this.getActiveCountDown.bind(this);
    this.closeSession = this.closeSession.bind(this);
  }

  componentDidMount() {
    const user = localStorage.getItem('user');
    if(user) {
      this.getValueAuth(true);
      if(localStorage.getItem('user')) {
        this.setState({user: JSON.parse(localStorage.getItem('user'))})
      }
    }
  }

  getValueAuth(value) {
    this.setState({isAuth: value})
  };

  getUser(user) {
    if (user) {
      this.setState({user});
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  getActiveCountDown() {
    this.setState({ active: !this.state.active })
  }

  closeSession() {
    localStorage.clear();
    this.getValueAuth(false);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Switch>
            <Route path="/login">
             {!this.state.isAuth ? <Login  getValueAuth={this.getValueAuth} getUser={this.getUser} /> :  <Redirect to="/" /> }
            </Route>
            <Route path="/register">
              {!this.state.isAuth ? <Register getValueAuth={this.getValueAuth} getUser={this.getUser} /> : <Redirect to="/" /> }
            </Route>
            <Route path="/" exact>
              {this.state.isAuth ?  <Home user={this.state.user} active={this.state.active}  /> : <Redirect to="/login" /> }             
            </Route>
            <Route path="/active-places">
              {this.state.isAuth ?  <ActivePlaces user={this.state.user} /> : <Redirect to="/login" /> }
            </Route>
            <Route path="/visited-places">
              {this.state.isAuth ?  <VisitedPlaces user={this.state.user} /> : <Redirect to="/login" /> }
            </Route>
            <Route path="/active-visit" render={(props) => (this.state.isAuth ? <ActiveVisit user={this.state.user} getActiveCountDown={this.getActiveCountDown} {...props}/> : <Redirect to="/login" /> )} />
            <Route exact path="/register-visit/:id" render={(props) => (this.state.isAuth ? <RegisterVisit user={this.state.user} {...props} /> : <Redirect to="/login" /> )} />
            <Route path="/place/:id">
              {this.state.isAuth ? <Place user={this.state.user} /> : <Redirect to="/login" /> }
            </Route>
          </Switch>
        </Router>
        {/* { this.state.isAuth ? (<Fab className="fabBee" onClick={this.closeSession} style={{ backgroundColor: 'orange', color: 'white'}} aria-label="add">
          <ExitToAppIcon />
        </Fab>) : null } */}
      </div>
    );
  }
}

export default App;
