// Imports
import React from 'react';
// App imports
import './style.css';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (

    <footer className="Footer">
    <div className="Footer-grid">
    <ul>
      <li>Link</li>
      <li>Link</li>
      <li>Link</li>
      <li>Link</li>
      </ul>
      <ul>
      <li>Link</li>
      <li>Link</li>
      <li>Link</li>
      <li>Link</li>
      </ul>
      <div className="Footer-copyright">Copyright 2019 all rights reserved</div>

      </div>
    </footer>

     
    );
  }
}

  export default Footer;
