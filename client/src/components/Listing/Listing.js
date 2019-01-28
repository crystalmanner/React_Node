import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import Pagination from 'react-paginating';
import Autosearch from '../Autosearch';
import './style.css';
import Filter from './Filter';
const limit = 10;
const pageCount = 3;

@inject('PropertiesStore')
@observer
class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    }
    props.PropertiesStore.listProperties();
    props.PropertiesStore.PropertiesCount()
  }

  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
    this.props.PropertiesStore.listProperties()
  };
  render() {
    const { PropertiesStore } = this.props;
    const HouseList = PropertiesStore.items.data.slice(((this.state.currentPage - 1) * limit),PropertiesStore.items.limit * this.state.currentPage).map((item, index) => (
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
    
    // console.log(HouseList)
    return (

      <div>
        <h2>List of Houses</h2>
        <Filter />
        {/* <Autosearch/> */}
        <container className="listing-container">{HouseList}</container>
        <Pagination
          total={PropertiesStore.items.totalProperties}
          pageCount={pageCount}
          currentPage={this.state.currentPage}
        >
                    {({
            pages,
            currentPage,
            hasNextPage,
            hasPreviousPage,
            previousPage,
            nextPage,
            totalPages,
            getPageItemProps
          }) => (
            <div>
              <button
                {...getPageItemProps({
                  pageValue: 1,
                  onPageChange: this.handlePageChange
                })}
              >
                first
              </button>
              {hasPreviousPage && (
                <button
                  {...getPageItemProps({
                    pageValue: previousPage,
                    onPageChange: this.handlePageChange
                  })}
                >
                  {'<'}
                </button>
              )}

              {pages.map(page => {
                let activePage = null;
                if (currentPage === page) {
                  activePage = { backgroundColor: '#fdce09' };
                }
                return (
                  <button
                    key={page}
                    style={activePage}
                    {...getPageItemProps({
                      pageValue: page,
                      onPageChange: this.handlePageChange
                    })}
                  >
                    {page}
                  </button>
                );
              })}

              {hasNextPage && (
                <button
                  {...getPageItemProps({
                    pageValue: nextPage,
                    onPageChange: this.handlePageChange
                  })}
                >
                  {'>'}
                </button>
              )}

              <button
                {...getPageItemProps({
                  pageValue: totalPages,
                  onPageChange: this.handlePageChange
                })}
              >
                last
              </button>
            </div>
          )}
          </Pagination>
      </div>
    )
  }
}
  
export default Listing;
