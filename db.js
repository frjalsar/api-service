/** @module db */

const { Client } = require('pg')

/**
 * Execute an SQL query.
 *
 * @param {string} sqlQuery - SQL query to execute
 * @param {array} [values=[]] - Values for parameterized query
 *
 * @returns {Promise} Promise representing the result of the SQL query
 */
async function query (sqlQuery, values = []) {
  // const connectionString = process.env.DATABASE_URL

  var client = new Client({
    user: 'jjkgmvgbcduuuq',
    password: '12624eb7e9abf1b681dd5d018a28da69094d1071da619cbb262f30ebe6fc524e',
    database: 'dfsh7s10e263jc',
    port: 5432,
    host: 'ec2-54-228-246-214.eu-west-1.compute.amazonaws.com',
    ssl: true
  })

  // const client = new Client({ connectionString })
  await client.connect()

  let result

  try {
    result = await client.query(sqlQuery, values)
  } catch (err) {
    console.error('Error executing query', err)
    throw err
  } finally {
    await client.end()
  }

  return result
}

module.exports = {
  query
}
