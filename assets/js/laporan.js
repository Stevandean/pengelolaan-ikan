//pembelian
let formatIdr = IMask.createPipe

function loadPembelianIkan(keyword = '') {
    let query = ""
    if(keyword == ""){
        query = `select *, harga_pembelian / qty_pembelian as nominal_pembelian from pembelianIkan`
    }else{
        query = `select *, harga_pembelian / qty_pembelian as nominal_pembelian from pembelianIkan where pembelian like '%${keyword}%' or tanggal_pembelian like '%${keyword}%' or harga_pembelian like '%${keyword}%' or Qty_pembelian like '%${keyword}%' or nominal_pembelian like '%${keyword}%' `
    }
    db.serialize ( () => {
        db.all(query, (err, rows) => {
            let totalPembelian = 0
            if (err) throw err
            let tr = ''
            if(rows.length <1) {
                tr += '<tr><td colspan ="4"><strong>data tidak ada ( ﾉ ﾟｰﾟ)ﾉ </strong></td></tr>'
            } else {
                rows.forEach((row) => {
                    totalPembelian += row.nominal_pembelian
                    tr+=`<tr>
                            <td>${row.pembelian}</td>
                            <td>${row.tanggal_pembelian}</td>
                            <td>${row.harga_pembelian}</td>
                            <td>${row.Qty_pembelian}</td>
                            <td>${row.nominal_pembelian}</td>
                        </tr>`
                })
                tr += `
                <tr>
                    <td colspan="4">
                        Jumlah
                    </td>
                    <td>
                        Rp ${totalPembelian}
                    </td> 
                </tr>`

            }
            $('tbody#data-pembelian').html(tr)
            
        })
    })
}

//penjualan
function loadPenjualan(keyword = '') {
    let query = ""
    if (keyword == "") {
        query = `select *, harga_penjualan * Qty_penjualan as jumlah_penjualan from penjualanIkan`
    } else {
        query = `select * , harga_penjualan * Qty_penjualan as jumlah_penjualan from penjualanIkan where penjual_penjualan like '%${keyword}%' or tanggal_penjualan like '%${keyword}%' or harga_penjualan like '%${keyword}%' or Qty_penjualan like '%${keyword}%' or jumlah_penjualan like '%${keyword}%' `
    }
    db.serialize ( () => {
        db.all(query, (err, rows) => {
            let totalPenjualan = 0
            if (err) throw err
            let tr = ''
            if(rows.length <1) {
                tr += '<tr><td colspan ="4"><strong>data tidak ada ( ﾉ ﾟｰﾟ)ﾉ </strong></td></tr>'
            } else {
                rows.forEach((row) => {
                    totalPenjualan += row.jumlah_penjualan
                    tr+=`<tr>
                            <td>${row.tanggal_penjualan}</td>
                            <td>${row.harga_penjualan}</td>
                            <td>${row.Qty_penjualan}</td>
                            <td>${row.jumlah_penjualan}</td>
                            <td>${row.penjual_penjualan}</td>
                        </tr>`
                })
                tr += `
                <tr>
                    <td colspan="4">
                        Jumlah
                    </td>
                    <td>
                        Rp ${totalPenjualan}
                    </td> 
                </tr>`

            }
            $('tbody#data-penjualan').html(tr)
        })
    })
}

//pengeluaran
function loadPengeluaran(keyword = '') {
    let query = ""
    if (keyword == "") {
        query = `select *, harga * qty as jumlah from pengeluaran`
    } else  {
        query = `select *, harga * qty as jumlah from pengeluaran where keterangan like '%${keyword}%' or tanggal like '%${keyword}%' or harga like '%${keyword}%' or Qty like '%${keyword}%' or jumlah like '%${keyword}%' ` 
    }
    db.serialize ( () => {
        db.all(query, (err, rows) => {
            let totalPengeluaran = 0
            if (err) throw err
            let tr = '' 
            if(rows.length <1) {
                tr += '<tr><td colspan ="4"><strong>data tidak ada ( ﾉ ﾟｰﾟ)ﾉ </strong></td></tr>'
            } else {
                rows.forEach((row) => {
                    totalPengeluaran += row.jumlah
                    tr+=`<tr>
                            <td>${row.keterangan}</td>
                            <td>${row.tanggal}</td>
                            <td>${row.harga}</td>
                            <td>${row.Qty}</td>
                            <td>${row.jumlah}</td>
                        </tr>`
                })
                tr += `
                <tr>
                    <td colspan="4">
                        Jumlah
                    </td>
                    <td>
                        Rp ${totalPengeluaran}
                    </td> 
                </tr>`

            }
            $('tbody#data-pengeluaran').html(tr)
        })
    })
}

function loadLaporan(keyword = '') {
    //load semua data
    loadPembelianIkan(keyword);
    loadPenjualan(keyword);
    loadPengeluaran(keyword);
}