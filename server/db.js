const Pool = require('pg').Pool

const pool = new Pool({
  user: "postgres",
  host: "10.146.19.194",
  database: "inventory",
  password: "postgres",
  port: 5432,
  multipleStatements: true,
});
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

module.exports = pool