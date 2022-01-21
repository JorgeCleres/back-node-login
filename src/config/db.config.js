//pepga o caminho do banco de dados MONGODB no .ENV
const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    local: {
        localDatabaseUrl: process.env.DB_URI,
        secret: "password"
    }
};