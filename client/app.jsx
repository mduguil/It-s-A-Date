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
import DateFormContainer from './components/dateFormContainer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFormIsOpen: false
    };

  }

  render() {
    return (
      <div className="container">
        <div className="header-container">
          <div className="logo-container">
            <img className="logo" src="/logo.png" />
          </div>
          <div className="slogan-container">
            <div className="slogan">Schedule dates with friends</div>
          </div>
        </div>
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
              <Route path="/date-form/:dateId">
                <DateFormContainer />
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
      </div>
    );
  }
}
