const router = require('express').Router();
const cors = require('cors');
const helper = require("./helper");
const DBintruder = require("./DBintruder");

const {
  readJsonFile,
  fetchJsonURL,
  handleResultsOfPromises,
  reconizeFileUpload
} = require('../utils/helpers');

const db = require('../db/');

const columnsMap = {
  link: 'link',
  market_date: 'market_date',
  location_country: 'location.country',
  location_city: 'location.city',
  location_address: 'location.address',
  location_coordinates_lat: 'location.coordinates.lat',
  location_coordinates_lng: 'location.coordinates.lng',
  size_parcelm2: 'size.parcel_m2',
  size_grossm2: 'size.gross_m2',
  size_netm2: 'size.net_m2',
  size_rooms: 'size.rooms',
  price_value: 'price.value',
  price_currency: 'price.currency',
  description: 'description',
  title: 'title',
  images: 'images',
  sold: 'sold'
};

router.get(`/properties`, cors(), async (req, res, next) => {
  try {
    const helperSlug = helper(req.query);
    const result = await db.queryPromise(
      `select * from property ${helperSlug}`
    );
    //returning quantity of found properties as well
    return res.json({result, quantity:result.length});
  } catch (err) {
    return next(err);
  }
});

router.get('/test/:slug?', cors(), async (req, res, next) => {
  try {
    const result = await DBintruder(req.params, req.query)

    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

router.get('/countall', cors(), async (req, res, next) => {
  try {
    const result = await db.queryPromise(
      `select COUNT(Link) as Total from property`
    );
    //returning quantity of found properties as well
    return res.json({result});
// dva returna zdes????
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

router.get('/stats', cors(), (req, res) => {
  res.json({ result: 'GET /api/stats - OK' });
});

const upload = reconizeFileUpload();
router.post(
  '/contribute',
  upload.single('selectedFile'),
  async (req, res, next) => {
    try {
      const { url, json, type } = req.body;
      let data;

      switch (type) {
        case 'url':
          data = await fetchJsonURL(url);
          break;
        case 'json':
          data = json;
          break;
        case 'file':
          const xx = req.file.path;

          const myFile = './' + xx;

          const deleteFile = (file) => {
            fs.unlink(file, (err) => {
              if (err) throw err;
            });
          };

          setTimeout(() => {
            deleteFile(myFile);
          }, 30 * 6000);

          data = await readJsonFile(file);
          break;
        default:
          return next(new Error(`Unsupported type "${type}"`));
      }

      if (!data || !Array.isArray(data) || !data.length) {
        res.status(400);

        throw new Error('Wrong data');
      }

      await handleResultsOfPromises(data, res);
    } catch (err) {
      return next(err);
    }
  }
);

router.use('*', (req, res, next) => {
  return res.status(404).end();
});


module.exports = router;
