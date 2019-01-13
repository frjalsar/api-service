function getAll (db) {
  return function () {
    const sql = `
      SELECT
        c.id,
        c.fullname,
        c.shortname,
        c.abbreviation
      FROM clubs c`

    return db
      .query(sql, [])
      .then(res => res.rows)
  }
}

module.exports = getAll
