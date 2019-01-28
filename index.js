require('dotenv').load();

const db = require('./db');
const app = require('./app');

db.connect((err) => {
  if (err) {
    throw err;
  }

  app.listen(process.env.PORT, () => {
    console.log(
      `db is up, app is running at http://localhost:${process.env.PORT}`
    );
  });
});
