// Imports
import React, { Component } from "react";
import { inject, observer } from 'mobx-react';

// App imports
import './style.css'

@inject('PropertiesStore')
@observer
class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {
        price: [],
        // val: ['1++']
    };
    props.PropertiesStore.UNIprops('?limit=10');
}



  render() {
    const { PropertiesStore } = this.props;

    const HouseList = PropertiesStore.items.data.map((item, index) => (
      <p key={index} className="list">
        <a href={item.link} target="_blank"> 
          <img src={item.images} width="300" height="300" /><br />
        </a>
        date: {item.market_date}<br />
        address: {item.location_address}<br />
        parcel: {item.size_parcelm2}     <br />
        gross:  {item.size_grossm2}   <br />
        rooms: {item.size_rooms} <br />
        value: {item.price_value}<br />
        currency: {item.price_currency}<br />
        title: {item.title}<br />
        sold: {item.sold}<br />
      </p>
    ));

    return (
      <div>
<div className="listing-container">{HouseList}</div>
      </div>
    );
  }
}
export default Filter;