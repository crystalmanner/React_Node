const getCountries = (db, row_name, query, order, limit) => db
  .queryPromise(`SELECT DISTINCT ${row_name} FROM property ${query} ${order} ${limit}`)
  .catch(err => console.log(err));

module.exports = getCountries;
