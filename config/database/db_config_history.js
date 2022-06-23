const path = require('path');
// const db_path = path.join(process.cwd(), '/System/db/sk4wankoi.db')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./resources/app/System/db/sk4wankoi.db');



//|---------------------- Hasil Uji Coba ------------------------------------|
//|const db = new sqlite3.Database(process.cwd()+'/System/db/sk4wankoi.db')  |
//|const db = path.join(app.getAppPath(), 'System', 'db', 'sk4wankoi.db')    |
//|--------------------------------------------------------------------------|



module.exports = db