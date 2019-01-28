// Imports
import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {Route} from "react-router-dom";
// App imports
import Home from "../components/Home";
import Listing from "../components/Listing";
import FilterTEST from "../components/Filter";

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/" exact={true}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/list" exact={true}>
                List
              </Link>
            </li>
            <li>
              <Link to="/filter" exact={true}>
                FilterTEST
              </Link>
            </li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route exact path="/list" component={Listing} />
          <Route exact path="/filter" component={FilterTEST} />

        </div>
      </Router>
    );
  }
}

export default AppRouter;
