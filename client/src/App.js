// Imports
import React, { Component } from "react";
// App imports
import Header from "./components/Header";
import Footer from "./components/Footer";

import AppRouter from "./AppRouter/";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header /><AppRouter /><Footer />
      </div>
    );
  }
}

export default App;
