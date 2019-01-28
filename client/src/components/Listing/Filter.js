// Imports
import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
// App imports
import './style.css'

@inject('PropertiesStore')
@observer
class FilterTEST extends Component {
    //sechas mi mojem iz 
    //da vot imennoo
    constructor(props) {
        super(props);
      this.state = {
        select_min: '',
        select_max: '',
            price: [],
            // val: ['1++']
        };
    }

    handlePriceChangeLOW = (e) => {
      this.setState({
        select_min: e.target.value
      })
      this.props.PropertiesStore.UNIprops(`?low=${this.state.select_min}&high=${this.state.select_max}`)

    }

      handlePriceChangeHIGH = (e) => {
        this.setState({
          select_max: e.target.value
        })
        this.props.PropertiesStore.UNIprops(`?low=${this.state.select_min}&high=${this.state.select_max}`)

      }

      
      

  //  handlePriceChange = (e) => {
  // this.setState({
  //   [e.target.name]: e.target.value
  // })
  // console.log(e.target.name)
  // this.props.PropertiesStore.UNIprops(`?low=${this.state.select_min}&high=${this.state.select_max}`)
  // }



 render() {
        const { PropertiesStore } = this.props;

        const pricesMin = [];
        for (let i = 0; i <= 3000000; i += 50000) {
          pricesMin.push(i);
        }
        const pricesMax = [];
        for (let i = 50000; i <= 3000000; i += 50000) {
          pricesMax.push(i);
        }
    //rabotaet// no ne obnovlyaet stranicy
    //Poprobuy. RESULT UVIDISH PO ONSUMBIT
   //ne vizhu...
   //v terminale servera smotri GET zaprosi
   //vizhu
   // vnizu v X nepravilnaya funkciya stoit.....  tam napisano PropertiesStore.items.priceQuery .... eto sovsem ne to
        const filterMin = pricesMin.map((el, i) => {
          return (
            <option key={i} value={el}>
              {el}
            </option>
          );
        });
        const filterMax = pricesMax.map((el, i) => {
          return (
            <option key={i} value={el} >
              {el}
            </option>
          );
        });
        ///////////////////////////
        // let showMin = []
        // for (let i = 0; i < filterMin.length; i++) {
        //   // console.log(filterMin[i])
        //   console.log(showMin = filterMin[i])
        // };
    
        let selectMinMax = (
          <form onSubmit={(e) => this.handlePriceChange(e)}>
            <select onChange={(e) => this.handlePriceChangeLOW(e)}className="select_min">
              <option defaultValue>0</option>
              {filterMin}
            </select>

            <select onChange={(e) => this.handlePriceChangeHIGH(e)} className="select_max">
              <option defaultValue>No maximum</option>
              {filterMax}
              <option value ='Niva'>adas</option>
            </select>
            <input type="submit" value="Submit" />
          </form>
        );
    console.log(PropertiesStore.items.data)

//Nado svyazat s listingom teper.

        let x = PropertiesStore.items.data.map((el, i) =>
        (
            <p key={i}>
                {el.price_value}<br />
                {el.location_city}
                {el.location_country}

            </p>
        ));  
        return (
          
            <div>
            {this.state.price}
             {selectMinMax }

                limited price "900.000+" {x}
            </div>
        );
    }
}
export default FilterTEST;