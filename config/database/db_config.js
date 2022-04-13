const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./System/db/sk4wankoi.db')
module.exports = db