import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/home';
import Navbar from '../client/components/navbar';
import Date from './pages/date';
import Invitations from './pages/invitations';
import Settings from './pages/settings';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFormIsOpen: false
    };

  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/weekly-view/:day">
              <Home weeklyView={true}/>
            </Route>
            <Route path="/weekly-view">
              <Home weeklyView={true} />
            </Route>
            <Route path="/date-form">
              <Date />
            </Route>
            <Route path="/invitations">
              <Invitations />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
