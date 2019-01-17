// @flow

import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';

import {About, Home, Contact, NotFound, User} from './pages';
import {BASEURL} from './constants/system';
import {CORRECT_USERNAME, CORRECT_PASSWORD} from './constants/system';
import token from './helpers/token';
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

type FormProps = {
  username: string,
  onChange: (text: string) => void,
  onChangePwd: (text: string) => void,
  onSubmit: () => void,
};

function LoginForm(props: FormProps) {
  let {username, onChange, onChangePwd, onSubmit} = props;
  let ret = (
    <form onSubmit={(event) => onSubmit()}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => onChange(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(event) => onChangePwd(event.target.value)}
      />
      <button type="submit">Submit!</button>
    </form>
  );

  return ret;
}

type State = {
  isLogin: boolean,
  token: string,
  username: string,
  password: string,
};
class App extends React.Component<{}, State> {
  state = {
    isLogin: false,
    token: '',
    username: '',
    password: '',
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

            <LoginForm
              username={this.state.username}
              onChange={(text) => this.setState({username: text})}
              onChangePwd={(text) => this.setState({password: text})}
              onSubmit={this._handleSubmit}
            />

            {this.state.isLogin === true ? <button>Log Out! </button> : <p />}
          </div>
        </BrowserRouter>
      </div>
    );
  }

  _handleSubmit = () => {
    if (
      this.state.username === CORRECT_USERNAME &&
      this.state.password === CORRECT_PASSWORD
    ) {
      token(CORRECT_USERNAME, 'CREATE_TOKEN');
      this.setState({token: 'Admin'});
      this.setState({isLogin: true});
    }
  };
}

export default App;
/*
            <input
              type="button"
              value={this.state.isLogin ? 'LOG-OUT' : 'LOG-IN'}
              onClick={() => this.setState({isLogin: !this.state.isLogin})}
            />
*/
