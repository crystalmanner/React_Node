
const getAll = (db, query, order, limit) => db
.queryPromise(`SELECT * FROM property ${query} ${order} ${limit}`)
.catch(err => console.log(err));
module.exports = getAll;
