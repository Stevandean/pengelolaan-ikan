let doc_id = $('body').attr('id')
    load_data = () => {
        switch(doc_id) {
            case 'pengeluaran-data' :
                loadPengeluaran();
                break;
            case 'penjualan-data' :
                loadPenjualan();
                break;
            case 'pembelian-data':
                loadPembelianIkan();
                break;
            case 'cashflow-data':
                loadCashflow();
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