'use strict'

//Import database settings
const db = require('../../db');

//Import params
const {
  getCountries,
  getCities,
  getAll
} = require('./params');

const {
  limitQuery,
  orderQuery
} = require('./query');

//Main function
const DBintruder = (getSlug, extraSlug) => {
  const databaseRow = {
    // link: 'link',
    date: 'market_date',
    country: 'location_country',
    city: 'location_city',
    address: 'location_address', // lat: 'location.coordinates.lat',
    // lng: 'location.coordinates.lng',
    parcel: 'size_parcel_m2',
    gross: 'size_gross_m2',
    net: 'size_net_m2',
    rooms: 'size_rooms',
    price: 'price_value',
    currency: 'price_currency', // description: 'description',
    title: 'title', // images: 'images',
    sold: 'sold'
  }; //MySQL supports the LIMIT clause to select a limited number of records, while Oracle uses ROWNUM (!)

const limit = limitQuery(extraSlug.limit)
const order = orderQuery(extraSlug.order, extraSlug.sort)

  let query = ''; //For extra slug contains ?since=DATE&until=DATE
  if (extraSlug.since && extraSlug.until) {
    query = `WHERE ${databaseRow.date} >=${extraSlug.since} and <=${extraSlug.until}`;
  } else if (!extraSlug.since && extraSlug.since) {
    query = `WHERE ${databaseRow.date} <=${extraSlug.since}`;
  } else if (extraSlug.until && !extraSlug.since) {
    query = `WHERE ${databaseRow.date} >=${extraSlug.until}`;
  } //For extra slug contains ?country=COUNTRYNAME
  if (extraSlug.country) {
    query = `WHERE ${databaseRow.country}='${extraSlug.country}'`;
  } //For extra slug contains ?city=CITYNAME
  if (extraSlug.city) {
    query = `WHERE ${databaseRow.city}='${extraSlug.city}'`;
  } //For extra slug contains ?adress=ADRESSCONTAINS
  if (extraSlug.address) {
    query = `WHERE ${databaseRow.address} LIKE '%${extraSlug.address}%'`;
  } //For extra slug contains ?parcel=PARCELSIZE
  if (extraSlug.parcel) {
    query = `WHERE ${databaseRow.parcel} >=${extraSlug.parcel}`;
  } //For extra slug contains ?gross=GROSSSIZE
  if (extraSlug.gross) {
    query = `WHERE ${databaseRow.gross} >=${extraSlug.gross}`;
  } //For extra slug contains ?net=NETSIZE
  if (extraSlug.net) {
    query = `WHERE ${databaseRow.net} >=${extraSlug.rooms}`;
  } //For extra slug contains ?rooms=ROOMSQUANTITY
  if (extraSlug.rooms) {
    query = `WHERE ${databaseRow.rooms} >=${extraSlug.rooms}`;
  } //For extra slug contains ?low=PRICE&high=PRICE
  if (extraSlug.low && extraSlug.high) {
    query = `WHERE ${databaseRow.price} between ${extraSlug.low} and ${extraSlug.high}`;
  } else if (!extraSlug.low && extraSlug.high) {
    query = `WHERE ${databaseRow.price} <=${extraSlug.high}`;
  } else if (extraSlug.low && !extraSlug.high) {
    query = `WHERE ${databaseRow.price} >=${extraSlug.low}`;
  } //For extra slug contains ?currency=CURRENCYTAG
  if (extraSlug.currency) {
    query = `WHERE ${databaseRow.currency}='${extraSlug.currency}'`;
  } //For extra slug contains ?title=TITLEALIKE
  if (extraSlug.title) {
    query = `WHERE ${databaseRow.title} LIKE '${extraSlug.title}'`;
  } //For extra slug contains ?sold=SOLD
  if (extraSlug.sold) {
    query = `WHERE ${databaseRow.sold}='${extraSlug.sold}'`;
  }

  switch (getSlug.slug) {
    case 'countries':
    return getCountries(db, databaseRow.country, query, order, limit)
    case 'cities':
    return getCities(db, databaseRow.city, query, order, limit)
    default:
    return getAll(db, query, order, limit)
  }

};

module.exports = DBintruder;
