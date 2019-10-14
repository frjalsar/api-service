// const makeInsertAthlete = require('./insert')

function makeCreateAthlete (db) {
  return async function createAthlete (athlete, user) {
    const client = await db.connect()

    // const insertAthlete = makeInsertAthlete(client)

    try {
      await client.query('BEGIN')
      // const athleteId = await insertAthlete(athlete, user)

      await client.query('COMMIT')
      return { // athleteId
      }
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  }
}

module.exports = makeCreateAthlete
