// Imports
import React from 'react';
import { inject, observer } from "mobx-react";

// App imports
import './style.css';
import Autosearch from '../Autosearch'

@inject('PropertiesStore')
@observer
class Search extends React.Component {
  constructor(props) {
    super(props);
    props.PropertiesStore.UNIprops('/cities?limit=100')
  }
  render() {
    const { PropertiesStore } = this.props;

   const CountriesList = PropertiesStore.items.data.map((item, index) => (
      <li key={index} className="Search-countrieslist">
        Cities: {item.location_city}
      </li>
    ));
    return (
      <div className="Search">
        <ul>
        </ul>
        <Autosearch cities={PropertiesStore.items.data} />
      {/* <form> 
        <fieldset>
          <legend>Discover the Amazing City</legend>
        </fieldset>
        <div className="inner-form">
          <div className="input-field first-wrap">
            <input id="search" type="text" placeholder="What city are you looking for?" />
          </div>
                <div className="input-field third-wrap">
            <button className="btn-search" type="button">Search</button>
          </div>
        </div>
      </form>
       */}

<ul className="Search-countrieslist">{CountriesList}</ul>
    </div>
    );
  }
}

  export default Search;
