const limitQuery = (LIMIT) => {
    let limitNumber = '10'; //Default limit is 10 to not overload the database
    if (LIMIT) {
    limitNumber = LIMIT
    }
    return `LIMIT ${limitNumber}` //The ORDER BY keyword is used to sort the result-set in ascending or descending order.
}

module.exports = limitQuery;
