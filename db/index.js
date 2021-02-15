const { Pool } = require('pg')

// This is what connects to our postgres database //
const pool = new Pool();
module.exports = {
  query: (text, params) => pool.query(text, params),
}

// const knex = require("knex");
// const app = require("../../server");
// const { PORT, DATABASE_URL } = require("../config");

// const db = knex({
//   client: "pg",
//   connection: DATABASE_URL,
// });
// app.set("db", db);

// app.listen(PORT, () => {
//   console.log(`Server listening at httt://localhost:${PORT}`);
// });
