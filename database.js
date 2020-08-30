const Pool = require('pg').Pool;

const pool = new Pool({
    user: "bbrcwcwkhpupmt",
    password: "16fe9f8dc46ae8ae70e5cf1024e94a249c48e0467515dd1692455d3ff7917cac",
    host: "ec2-46-137-79-235.eu-west-1.compute.amazonaws.com",
    port: 5432,
    database: "d9vfdk5ccgf989"
});

module.exports = pool;


/*
const pool = new Pool({
    user: "karton",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "trv"
});
*/