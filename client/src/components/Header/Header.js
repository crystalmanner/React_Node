// Imports
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "../Home";
import Listing from "../Listing";
import FilterTEST from "../Filter";

// App imports
import './style.css';



class Header extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
    <header className="Header">
    <div className="Header-logo">Logo</div>


{/* <Router>
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

</div>
</Router> */}



</header>





     
    );
  }
}

  export default Header;
