<<<<<<< HEAD
const path = require('path')

let db_path = path.join(process.cwd(),'/System/db/sk4wankoi.db')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(db_path)
console.log(db_path)
// const db = path.join(app.getAppPath(), 'System', 'db', 'sk4wankoi.db')
=======
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
let fs = require('fs');
const db_path = "./System/db/sk4wankoi.db";
const db_dir = "./System/db";


//--------------------------- CEK DATABASE -----------------------------
//jka tidak maka buat
//cek juga direktorinya
if(!fs.existsSync(db_dir)){
    fs.mkdirSync(db_dir, {recursive: true}) //buat directori
    fs.writeFileSync(db_path,"") //buat file

}else if(!fs.existsSync(db_path)){
    fs.writeFileSync(db_path,"") //buat file
}


const db = new sqlite3.Database(db_path); //<--- ini adalah databasenya


//------------------------------ CEK TABLE -------------------------------
//cek apakah pada db terdapat table yang dimaksud
const schema_pengeluaran = `CREATE TABLE IF NOT EXISTS pengeluaran(id integer primary key autoincrement, keterangan varchar(200) not null unique, tanggal date, harga real, Qty real, jumlah real);`;
const schema_pembelian = `CREATE TABLE IF NOT EXISTS penjualanIkan(id integer primary key autoincrement, tanggal_penjualan date,  harga_penjualan real, Qty_penjualan real, jumlah_penjualan real, penjual_penjualan varchar(100));`;
const schema_penjualan = `CREATE TABLE IF NOT EXISTS pembelianIkan(id integer primary key autoincrement, pembelian varchar(200), tanggal_pembelian date, harga_pembelian real, Qty_pembelian real, nominal_pembelian real);`;

db.serialize(() => {
    db.run(schema_pembelian);
    db.run(schema_pengeluaran);
    db.run(schema_penjualan);
})

//|---------------------- Hasil Uji Coba ------------------------------------|
//|const db = new sqlite3.Database(process.cwd()+'/System/db/sk4wankoi.db')  |
//|const db = path.join(app.getAppPath(), 'System', 'db', 'sk4wankoi.db')    |
//|--------------------------------------------------------------------------|



>>>>>>> 6d5d004b83721a140dd64c42d0a8b1ca55984c78
module.exports = db