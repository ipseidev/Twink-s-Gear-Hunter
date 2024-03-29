import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

import { setCurrentUser, logoutUser } from "../../actions/authActions";
import { Provider } from "react-redux";
import store from "../../store";

import Navbar from "../layout/Navbar";
import Landing from "../layout/Landing";
import Register from "../auth/Register";
import Login from "../auth/Login";
import PrivateRoute from "../private-route/PrivateRoute";
import Auctions from "../dashboard/auctions/Auctions";
import Dashboard from "../dashboard/Dashboard";
import listItems from "../dashboard/Items/ListeItem";
import CreateItem from "../dashboard/Items/create/CreateItem";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            {/*<Route exact path="/register" component={Register} />*/}
            <Route exact path="/login" component={Login} />

            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/dashboard/auctions"
                component={Auctions}
              />
              <PrivateRoute
                exact
                path="/dashboard/listItems"
                component={listItems}
              />
              <PrivateRoute
                exact
                path="/dashboard/item/create"
                component={CreateItem}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
