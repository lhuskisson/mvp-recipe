const { Pool } = require('pg');
const { finalizeSession } = require('pg/lib/sasl');

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
  
  
  module.exports = pool;