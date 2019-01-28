const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const multer = require('multer');
const db = require('../db/');

const { validation } = require('./validateProperty');
const { normalization } = require('./normalizeProperty');

function housesArrayProduce(houses) {
  let qurArr = [];
  houses.forEach((house, i) => {
    const {
      link,
      market_date,
      location,
      size,
      price,
      images,
      description,
      title,
      sold
    } = house;
    const strImg = images.join();
    const myDate = new Date(market_date);
    const parcel_m2 = size.parcel_m2 || null;
    const gross_m2 = size.gross_m2 || null;
    const net_m2 = size.net_m2 || null;
    qurArr[i] = [
      link,
      myDate,
      location.country,
      location.city,
      location.address,
      location.coordinates.lat,
      location.coordinates.lng,
      parcel_m2,
      gross_m2,
      net_m2,
      size.rooms,
      price.value,
      price.currency,
      description,
      title,
      strImg,
      sold
    ];
  });
  return qurArr;
}

function extractCities(houses) {
  const citiesArr = houses.map((el) => el.location.city);
  const cities = citiesArr.filter(function(item, pos) {
    return citiesArr.indexOf(item) == pos;
  });
  return cities;
}

function getOneCityStatus(city, houses) {
  let status = {
    id: '',
    city: '',
    marketDate: '',
    totalPrice: 0,
    totalCount: 0,
    totalM2: 0
  };
  const cities = extractCities(houses);
  cities.forEach((place) => {
    if (city) {
      if (city === place) {
        status.id = uuidv4();
        status.city = city;
        status.marketDate = new Date();
        let price = 0;
        let area = 0;
        houses.forEach((house) => {
          if (house.location.city === city) {
            //status.marketDate = new Date (house.market_date);
            status.totalCount += 1;
            price += Number(house.price.value);
            price = price.toFixed(2);
            price = Number(price);
            status.totalPrice = price;
            area += Number(house.size.gross_m2);
            area = area.toFixed(2);
            area = Number(area);
            status.totalM2 = area;
          }
        });
      }
    }
  });
  return status;
}

function getAllCitiesStatus(houses) {
  let citiesStatus = [];
  const cities = extractCities(houses);
  cities.forEach((place) => {
    citiesStatus.push(getOneCityStatus(place, houses));
  });
  return citiesStatus;
}

function statusArray(data) {
  let qurArray = [];
  const citiesStatus = getAllCitiesStatus(data);
  citiesStatus.forEach((place, i) => {
    const { id, city, marketDate, totalPrice, totalCount, totalM2 } = place;
    qurArray[i] = [id, city, marketDate, totalPrice, totalCount, totalM2];
  });
  return qurArray;
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%
async function insertIntoDatabase(report, houses, cityStatus) {
  try {
    if (houses.length) {
      let storeHousesQuery =
        'REPLACE INTO property (link, market_date, location_country, location_city, location_address, location_coordinates_lat,';

      storeHousesQuery +=
        ' location_coordinates_lng, size_parcelm2, size_grossm2, size_netm2, size_rooms, price_value, price_currency, description,';

      storeHousesQuery += 'title, images, sold) VALUES ?';
      if(houses.length >= 1) {
        await db.queryPromise(storeHousesQuery, [houses]);
      }

      const statusQuery =
        'REPLACE INTO city_status (id, city, market_date, total_price, total_count, total_m2) VALUES ?';
      if(cityStatus.length >= 1) {
        await db.queryPromise(statusQuery, [cityStatus]);
      }
    }

    return {
      insertedItems: houses.length,
      errors: report.errReport.length,
      errMessages: report.errReport
    };
  } catch (err) {
    throw err;
  }
}

function isEmptyObject(obj) {
  return !obj || Object.keys(obj).length === 0;
}

function loopInValidation(data) {
  const result = {};
  let final = [];
  let err = [];
  if (Array.isArray(data)) {
    data.forEach((el, i) => {
      let process = validation(el);
      if (process.valid) final.push(el);
      else {
        const report = {
          id: i + 1,
          messages: process.messages,
          raw: el
        };
        err.push(report);
      }
    });
    result.validItems = final;
    result.errReport = err;
  } else {
    let process = validation(data);
    if (process.valid) final.push(data);
    else {
      const report = {
        id: 1,
        messages: process.messages
      };
      err.push(report);
    }
    result.validItems = final;
    result.errReport = err;
  }
  return result;
}

function loopInNormalization(data) {
  let filterdData = [];
  data.forEach((el) => {
    const item = normalization(el);
    filterdData.push(item);
  });
  return filterdData;
}

function fetchJsonURL(url) {
  return fetch(url).then((response) => response.json());
}

function readJsonFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

async function handleResultsOfPromises(data, res) {
  const report = loopInValidation(data);
  const filterdData = loopInNormalization(report.validItems);
  const houses = housesArrayProduce(filterdData);
  const cityStatus = statusArray(filterdData);

  const responseResult = await insertIntoDatabase(report, houses, cityStatus);

  return res.json(responseResult);
}

function reconizeFileUpload() {
  if (!fs.existsSync('./uploaded-files')) {
    fs.mkdirSync('./uploaded-files');
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploaded-files');
    },
    filename: (req, file, cb) => {
      const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, newFilename);
    }
  });
  // create the multer instance that will be used to upload/save the file
  const upload = multer({ storage });
  return upload;
}

module.exports = {
  housesArrayProduce,
  statusArray,
  insertIntoDatabase,
  readJsonFile,
  fetchJsonURL,
  loopInNormalization,
  loopInValidation,
  isEmptyObject,
  handleResultsOfPromises,
  reconizeFileUpload
};
