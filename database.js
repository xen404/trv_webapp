const Pool = require('pg').Pool;

const pool = new Pool({
    user: "karton",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "trv"
});

module.exports = pool;