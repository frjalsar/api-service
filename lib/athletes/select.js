const toOrdinal = require('pg-parameterize').toOrdinal
const isEmpty = require('lodash.isempty')

function makeSelectAthletes (db) {
  return function selectAthletes (options, user) {
    const opt = options || {}

    if (isEmpty(options)) {
      return Promise.resolve([])
    }

    const canViewKt = user || !!opt.kt
    const params = []
    let sql = `
      SELECT
        a.id,
        a.fullname,
        ${canViewKt ? 'a.kt,' : ''}
        a.birthyear,
        a.gender,
        a.country,
        a.thorid,
        a.lastcompeted,
        c.id as clubid,
        c.fullname as clubname,        
        c.thorid as thorclubid,
        c.regionid,
        r.fullname regionfullname,
        r.abbreviation regionabbreviation,
        m.fromdate,
        m.todate,
        m.legacyclub,
        m.sentat,
        m.sentby,
        m.status,
        m.confirmedat,
        m.confirmedby,
        u.fullName as userfullname
      FROM
        athletes a
      LEFT JOIN
        membership m ON m.athleteid = a.id
      LEFT JOIN 
        clubs c ON c.id = m.clubid
      LEFT JOIN
        regions r ON r.id = c.regionid
      LEFT JOIN
        users u ON u.id = m.sentby
      WHERE 1 = 1`

    if (opt.id) {
      sql += ' AND a.id = ?'
      params.push(opt.id)
    }

    if (opt.gender) {
      sql += ' AND a.gender = ?'
      params.push(opt.gender)
    }

    if (opt.startsWith) {
      sql += ' AND a.fullname like ?'
      params.push(opt.startsWith + '%')
    }

    if (opt.search) {
      sql += ' AND a.fullname ilike ?'
      params.push('%' + opt.search + '%')
    }

    if (opt.regionId) {
      sql += ' AND c.regionid = ? AND m.todate is null'
      params.push(opt.regionId)
    }

    if (opt.clubId) {
      sql += ' AND c.id = ? AND m.todate is null'
      params.push(opt.clubId)
    }

    if (opt.thorClubId) {
      sql += ' AND c.thorid = ? AND m.todate is null'
      params.push(opt.thorClubId)
    }

    if (opt.legacyClub) {
      sql += ' AND m.legacyClub = ?'
      params.push(opt.legacyClub)
    }

    if (opt.birthyearFrom) {
      sql += ' AND a.birthyear >= ?'
      params.push(opt.birthyearFrom)
    }

    if (opt.birthyearTo) {
      sql += ' AND a.birthyear <= ?'
      params.push(opt.birthyearTo)
    }

    if (opt.kt) {
      sql += ' AND a.kt = ANY(?)'
      params.push(opt.kt)
    }

    if (opt.lastCompeted) {
      sql += ' AND a.lastcompeted >= ?'
      params.push(opt.lastCompeted)
    }

    sql += ` 
      ORDER BY
        a.fullname ASC,
        a.id ASC,
        m.fromdate ASC`

    if (opt.offset) {
      sql += ' OFFSET ' + opt.offset
    }

    if (opt.limit) {
      sql += ' LIMIT ' + opt.limit
    }

    return db
      .query(toOrdinal(sql), params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectAthletes
