const path = require('path')

let db_path = path.join(process.cwd(),'/System/db/sk4wankoi.db')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(db_path)
console.log(db_path)
// const db = path.join(app.getAppPath(), 'System', 'db', 'sk4wankoi.db')
module.exports = db