function makeSelectMeets (db) {
  return function selectMeets (options) {
    const opt = options || {}

    const params = []
    let sql = `
      SELECT
        c.id,
        c.clubid,
        c.status
      FROM motaskra c`

    if (opt.id) {
      sql += ' WHERE c.id = $1'
      params.push(opt.id)
    }

    sql += ' ORDER BY c.clubid asc'

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectMeets
