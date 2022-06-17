let doc_id = $('body').attr('id')

// //total page
// total_page = (total_row_displayed) => {
//     switch(doc_id) {
//         case 'pengeluaran-data' :
//             totalPengeluaranPage(total_row_displayed);
//             break;
//         case 'penjualan-data' :
//             totalPenjualanPage(total_row_displayed);
//             break;
//         case 'pembelian-data' :
//             totalPembelianPage(total_row_displayed);
//             break;
//     }
// }

    load_data = (query) => {
        switch(doc_id) {
            case 'pengeluaran-data' :
                loadPengeluaran(query);
                break;
            case 'penjualan-data' :
                loadPenjualan(query);
                break;
            case 'pembelian-data':
                loadPembelianIkan(query);
                break;
            case 'cashflow-data':
                loadCashflow(query);
                break;
            case 'laporan-data':
                loadLaporan();
                break;
        }
    }

    // let page_number = $('#page_number').val()
    // let total_row_displayed = $('#row_per_page').val()
    // let searchVal = $('#search-data').val()
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

editRecord = (id) => {
    let doc_id = $('body').attr('id')
    switch (doc_id) {
        case 'pengeluaran-data':
            editPengeluaran(id)
            break;
        case 'penjualan-data' :
            editPenjualan(id)
            break;
        case 'pembelian-data' :
            editPembelian(id)
            break;
    }
}

alertSuccess = (msg) => {
    let div = `<div class="alert alert-success">${msg}</div>`
    $('#alert').html(div)
    clearAlert = () => {
        $('#alert').html("")
    }
    setTimeout(clearAlert, 4000)
}
