// Imports
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// App imports
 import Menu from "../Menu/";
//  import Listing from "../Listing/";
 import Search from '../Search';
 import './style.css';

@inject("PropertiesStore")
@observer
class Home extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.PropertiesStore;
	}

    render() {
		const store = this.store;
        return (
            <main className="Home"><Menu /><Search/></main>
            );
    }
}
export default Home