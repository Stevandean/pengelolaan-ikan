let doc_id = $('body').attr('id')
load_data = () => {
    switch(doc_id) {
        case 'pengeluaran-data' :
            loadPengeluaran();
            break;
        case 'penjualan-data' :
            loadPenjualan();
            break;
        case 'cashlow-data':
            loadCashflow();
            break;
        case 'pembelian-data':
            loadPembelianIkan();
            break;
    }
}

load_data() 

deleteRecord = (id) => {
    let doc_id = $('body').attr('id')
    let table
    switch(doc_id) {
        case 'pengeluaran-data':
            table='pengeluaran'
            break;
        case 'penjualan-data':
            table='penjualanIkan';
            break;
        case 'pembelian-data':
            table='pembelianIkan'
    }
    let sql = `delete from ${table} where id =${id}`
    db.run(sql, err => {
        if(err) {
            console.log(err)
        } else
        load_data()
    })
}

// deleteAllRecords = () => {
//     let doc_id = $('body').attr('id')
//     let table
//     switch (doc_id) {
//         case 'pengeluaran-data':
//             table ='pengeluaran';
//             break;
//     }
    
//     let sql = `delete from ${table}`
//     db.run(sql, err => {
//         if(err) {
//             console.log(err)
//         } else {
//             load_data()
//         }
//     })
// }

// deleteMultipleRecords = (ids) => {
//     let doc_id = $('body').attr('id')
//     let table
//     switch (doc_id) {
//         case 'product-data':
//             table = 'products';
//             break;
//     }
//     let sql = `delete from ${table} where id IN(${ids})`
//     db.run(sql, err => {
//         if(err) {
//             console.log(err)
//         } else {
//             load_data()
//         }
//     })
// }