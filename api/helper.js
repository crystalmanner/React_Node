const validator = require('validator');

//price-filter
const filterPrice = query => {
  let filterPrice;
  if (query.minPrice && query.maxPrice) {
    filterPrice = `price_value BETWEEN ${query.minPrice} AND ${query.maxPrice}`;
  
  } else if (!query.minPrice && query.maxPrice) {
    filterPrice = `price_value <=${query.maxPrice}`;
  } else if (query.minPrice && !query.maxPrice) {
    filterPrice = `price_value >=${query.minPrice}`;
  } else {
    filterPrice = ``;
  }

  return filterPrice;
};
//room-filter
const filterRooms = query => {
  let condition = ``;
  if (query.rooms) {
    condition = `size_rooms >=${query.rooms}`;
  }
  
  return condition;
};


//city-filter
const filterCity = query => {
  let condition = ``;
  if (query.city) {
    
    condition = `location_city='${query.city}'`;
  }
  return condition;

};
//country-filter
const filterCountry = query => {
  let condition = ``;
  if (query.country) {
    condition = `location_country='${query.country}'`;
  }
  return condition;
};
//combination of filters
const combined = (...arg) => {
  let output;
  const filteredCondition = arg.filter(string => string !== ``);
  if (filteredCondition.length === 0) {
    output = ``;
    return output;
  } else {
    output = `WHERE `;
    let firstConditions = filteredCondition.slice(0, filteredCondition.length - 1);
    let lastCondition = filteredCondition[filteredCondition.length - 1];
    for (let i = 0; i < firstConditions.length; i++) {
      output += `(${filteredCondition[i]})` + ` AND `;
    }
    return output + lastCondition;
  }
};
//sorting to get data sorted by requirements from client-side
const sorting = query => {
  let sorting = ``
  if(query.order) {
    sorting = `ORDER BY ${query.order}`
  }
  return sorting
}
//main function, dealing with all filters
const main = query => {
  const conditionPrice = filterPrice(query);
  const conditionRooms = filterRooms(query);
  const conditionCity = filterCity(query);
  const conditionCountry = filterCountry(query);
  const allConditions = combined(conditionPrice, conditionRooms, conditionCity, conditionCountry);
  console.log(conditionRooms)
  return allConditions;
};
module.exports = main;
