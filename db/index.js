const { Pool } = require('pg')

// This is what connects to our postgres database //
const pool = new Pool();
module.exports = {
  query: (text, params) => pool.query(text, params),
}