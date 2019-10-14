const makeInsertMeet = require('./insert')

function makeCreateMeet (db) {
  return async function createMeet (meet, user) {
    const client = await db.connect()

    const insertMeet = makeInsertMeet(client)

    try {
      await client.query('BEGIN')
      const athleteId = await insertMeet(meet, user)

      await client.query('COMMIT')
      return { athleteId }
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  }
}

module.exports = makeCreateMeet
