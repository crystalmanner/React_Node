function dateSearch () {
if (extraSlug.since && extraSlug.until) {
    query = `WHERE ${databaseRow.date} >=${extraSlug.since} and <=${extraSlug.until}`;
  } else if (!extraSlug.since && extraSlug.since) {
    query = `WHERE ${databaseRow.date} <=${extraSlug.since}`;
  } else if (extraSlug.until && !extraSlug.since) {
    query = `WHERE ${databaseRow.date} >=${extraSlug.until}`;
}

}