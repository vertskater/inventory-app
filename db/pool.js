const { Pool } = require("pg");

module.exports = new Pool({
  host: process.env.PGHOST || "localhost",
  port: process.env.PGPORT || 5432,
  user: process.env.PGUSER || "inventory",
  password: process.env.PGPASSWORD || "geheim",
  database: process.env.PGDATABASE || "inventory",
});
