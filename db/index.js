const { promisify } = require("util");

const mysql = require('mysql');

const db = mysql.createConnection(process.env.DATABASE_URL);

db.queryPromise = promisify(db.query);

module.exports = db;


