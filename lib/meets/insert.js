function makeInsertMeet (db) {
  return function insertMeet (meet, user) {
    const sql = `
        INSERT INTO motaskra (
          clubid,
          status
        )
        VALUES ($1, $2)
        RETURNING id
      `

    const params = [
      meet.clubid,
      meet.status
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeInsertMeet
