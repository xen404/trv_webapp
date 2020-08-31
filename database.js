const Pool = require('pg').Pool;
const keys = require('./config/keys');

const pool = new Pool({
    user: keys.postgresUser,
    password: keys.postgresPassword,
    host: keys.postgresHost,
    port: keys.postgresPort,
    database: keys.PostgresDatabase
});

module.exports = pool;
