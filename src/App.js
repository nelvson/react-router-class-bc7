// @flow

import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';

import {About, Home, Contact, NotFound, User} from './pages';
import {BASEURL} from './constants/system';

function Navigator(props) {
  let {isLoggedIn} = props;
  return (
    <ul>
      <li>
        <NavLink to="/" activeStyle={{color: 'green'}}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={`${BASEURL}/about`}>About</NavLink>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      {isLoggedIn === true ? (
        <li>
          <Link to="/user/Filbert">Username 1</Link>
        </li>
      ) : (
        <p />
      )}

      {isLoggedIn === true ? (
        <li>
          <Link to="/user/Alvin">Username 2</Link>
        </li>
      ) : (
        <p />
      )}
    </ul>
  );
}

type State = {
  isLogin: boolean,
  token: string,
};
class App extends React.Component<{}, State> {
  state = {
    isLogin: false,
    token: '',
  };
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigator isLoggedIn={this.state.isLogin} />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path={`${BASEURL}/about`} component={About} />
              <Route path="/contact/" component={Contact} />
              <Route
                path="/user/:username"
                render={(props) => (
                  <User username={props.match.params.username} />
                )}
              />
              <Route component={NotFound} />
            </Switch>
            <input
              type="button"
              value={this.state.isLogin ? 'LOG-OUT' : 'LOG-IN'}
              onClick={() => this.setState({isLogin: !this.state.isLogin})}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
