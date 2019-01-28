const orderQuery = (ORDER, SORT) => {
  let query = ''
  
    if (ORDER) {
      query = `ORDER BY ${ORDER} asc`;
    } 

    if (SORT==='desc') {
        query = `ORDER BY ${ORDER} ${SORT}`;
    } 
    if (ORDER==='rand') {
      query = `ORDER BY rand()`;
    }
    return query
    }

module.exports = orderQuery;
