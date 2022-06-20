//pembelian
function loadPembelianIkan() {
    let query = `select *, harga_pembelian / qty_pembelian as nominal_pembelian from pembelianIkan`
    db.serialize ( () => {
        db.all(query, (err, rows) => {
            let totalPembelian = 0
            if (err) throw err
            let tr = ''
            if(rows.length <1) {
                tr += ''
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
function loadPenjualan() {
    let query = `select *, harga_penjualan * Qty_penjualan as jumlah_penjualan from penjualanIkan`
    db.serialize ( () => {
        db.all(query, (err, rows) => {
            let totalPenjualan = 0
            if (err) throw err
            let tr = ''
            if(rows.length <1) {
                tr += ''
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
function loadPengeluaran() {
    let query = `select *, harga * qty as jumlah from pengeluaran`
    db.serialize ( () => {
        db.all(query, (err, rows) => {
            let totalPengeluaran = 0
            if (err) throw err
            let tr = '' 
            if(rows.length <1) {
                tr += ''
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

function loadLaporan() {
    console.log("err");
    //load semua data
    loadPembelianIkan();
    loadPenjualan();
    loadPengeluaran();
}