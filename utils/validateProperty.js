const validator = require('validator');
const moment = require('moment');

const parentProperties = [
  'link',
  'location',
  'market_date',
  'price',
  'size',
  'sold'
];
const locationProps = ['city', 'country'];
const coordinatesProps = ['lat', 'lng'];
const priceProps = ['currency', 'value'];
const sizeProps = ['rooms'];

// Check if one of property is existed
function hasProperties(obj, props) {
  for (var i = 0; i < props.length; i++) {
    if (!obj.hasOwnProperty(props[i])) {
      return false;
    }
  }
  return true;
}

// Check all properties
function hasAllProperties(obj) {
  const cond1 = hasProperties(obj, parentProperties);
  let cond2, cond4, cond5;
  if(cond1) {
      cond2 = hasProperties(obj.location, locationProps);
      
      cond4 = hasProperties(obj.price, priceProps);
      cond5 = hasProperties(obj.size, sizeProps);
  }else return false;
  
  if(cond1 && cond2 && cond4 && cond5) return true;
   return false;
}

// This to check the numbers value or string of number
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function dateValidation(date) {
  const now = moment();
  const newDate = new Date(date);
  const isValid = moment(newDate).isValid();
  if(isValid) {
      // return moment(newDate).isBefore(now) ? true : false;
      if(moment(newDate).isBefore(now)) return true;
  }
  const test = [
    moment(date, 'DD/MM/YYYY', true),
    moment(date, 'DD-MM-YYYY', true),
    moment(date, 'DD.MM.YYYY', true),
    moment(date, 'MM/DD/YYYY', true),
    moment(date, 'MM-DD-YYYY', true),
    moment(date, 'MM.DD.YYYY', true)];
  for(let i = 0; i < test.length; i++) {
      if(test[i].isValid())
      return moment(test[i]).isBefore(now) ? true : false;
  }
  return false;
}

// Check a valid string like address or country
function stringValidation(str, method) {
  const simpleStringRegex = /^[a-zA-Z\u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df\s.-]{3,50}$/;
  const addressRegex = /[a-zA-Z0-9\u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df.\s,()'-]{3,150}$/;
  const titleRegex = /^[a-zA-Z0-9\u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df.\s,()'"_*&%$#@!/{}-]{3,1000}$/;
  const currencyRegex = /^.{3,9}$/;
  if(method === 'address') {
      return str.match(addressRegex);
  }else if(method === 'currency') {
      return str.match(currencyRegex);
  }else if(method === 'title') {
      return str.match(titleRegex);
  }
  else return str.match(simpleStringRegex);
}

// Check if a vlue number
function checkIfNumber(value) {
  if(value === '') return false;
  let noneComma = (""+value).split("");
  const comma = noneComma.includes(',');
  let newValue = comma ? value.replace(/\,/g, '') : value;
  //console.log(noneComma);
  let temp = Number(newValue);
  return isNaN(temp) ? false : true;
}

// Validation function
const validation = (obj) => {
  let process = {
    messages: [],
    valid: true,
    raw: obj
  };
  if(!hasAllProperties(obj)) {
    process.messages = ["One or more required's properties is missing!"];
    process.valid = false;
}else {
    const {link, market_date, location, size, price, sold, title, url} = obj;
    process.messages = [];
    if(!validator.isURL(link || url)) {
        process.messages.push('Invalid link');
        process.valid = false;
    }
    if(!dateValidation(market_date)) {
        process.messages.push('Invalid market date');
        process.valid = false;
    }
    if(!stringValidation(location.city)) {
        process.messages.push('Invalid city');
        process.valid = false;
    }
    if(!stringValidation(location.country)) {
        process.messages.push('Invalid country');
        process.valid = false;
    }
    // address or coordinates
    if (!hasProperties(location, ["address"]) && !hasProperties(location, ["coordinates"])) {
            process.messages.push("you don't have any location address or coordinates!");
            process.valid = false;
    }else if(hasProperties(location, ["address"]) && !hasProperties(location, ["coordinates"])){
        if(!stringValidation(location.address, 'address')) {
            process.messages.push('Invalid address');
            process.valid = false;
        }
    }else if(!hasProperties(location, ["address"]) && hasProperties(location, ["coordinates"])) {
        if(!hasProperties(location.coordinates, coordinatesProps)) {
            process.messages.push('one of coordinates properties is missing!');
            process.valid = false;
        }
        if(!checkIfNumber(location['coordinates']['lat']) ||
            !checkIfNumber(location['coordinates']['lng'])) {
            process.messages.push('Invalid coordinates value, should be number!');
            process.valid = false;
        }
    }else {
        if(!stringValidation(location.address, 'address')) {
            if(!hasProperties(location.coordinates, coordinatesProps)) {
                process.messages.push('No address found! and one of coordinates properties is missing!');
                process.valid = false;
            }else {
                if(!checkIfNumber(location['coordinates']['lat']) ||
                    !checkIfNumber(location['coordinates']['lng'])) {
                    process.messages.push('Invalid coordinates value, should be number!');
                    process.valid = false;
                }
            }
        }
    }

    if(!stringValidation(price.currency, 'currency')) {
        process.messages.push('Invalid currency');
        process.valid = false;
    }
    if(!checkIfNumber(price.value)) {
        process.messages.push('Invalid price value , it should be a number');
        process.valid = false;
    }
    if(Number(price.value) === 0) {
        process.messages.push('Invalid price value, cannot be Zero!');
        process.valid = false;
    }

    const sizeProps = ["parcel_m2", "gross_m2", "net_m2"];
    if (!hasProperties(size, ["parcel_m2"]) 
        && !hasProperties(size, ["gross_m2"])
        && !hasProperties(size, ["net_m2"])) {
            process.messages.push("you don't have any area's value!");
            process.valid = false;
    }
    let arrSize = [];
    for(let i=0; i<sizeProps.length; i++) {
        if(size.hasOwnProperty(sizeProps[i])) {
            const cond = checkIfNumber(size[sizeProps[i]]) && Number(size[sizeProps[i]]) > 1;
            arrSize.push(cond);
        }
    }
    const checkSize = arrSize.some(el => el);
    if(!checkSize) {
        process.messages.push('Invalid area, it should be a number');
        process.valid = false;
    }
    if(!checkIfNumber(size.rooms) || Number(size.rooms) < 1) {
        process.messages.push('Invalid rooms value!');
        process.valid = false;
    }
    if(typeof sold !== 'boolean') {
        process.messages.push('Invalid sold , it should be boolean');
        process.valid = false;
    }
    if(!stringValidation(title, 'title')) {
        process.messages.push('Invalid title , check the title string!');
        process.valid = false;
    }
}
return process;
};

module.exports = { validation };
