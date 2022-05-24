const { Pool } = require('pg');
const { finalizeSession } = require('pg/lib/sasl');

const pool = new Pool({
    ssl:{
        rejectUnauthorized: false
    },
    connectionString: process.env.DATABASE_URL,
   
});

module.exports = pool;