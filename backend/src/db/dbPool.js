const {Pool} = require('pg')
const dotenv= require('dotenv')

dotenv.config()

const clientInfo = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
}
const pool = new Pool(clientInfo)

module.exports = pool;
