//pembelian
let formatIdr = IMask.createPipe ({
    mask: 'RP num',
    blocks: {
        num: {
            mask:Number,
            thousandsSeparator: '.',
            scale: 10,
            radix: ',',
            mapToRadix: [','],
            padFractionalZeros: false,
            signed: false
        }
    }
})

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
                tr += '<tr><td colspan ="6"><strong>data tidak ada ( ﾉ ﾟｰﾟ)ﾉ </strong></td></tr>'
            } else {
                rows.forEach((row, index) => {
                    totalPembelian += row.nominal_pembelian
                    tr+=`<tr>
                            <td>${index + 1}</td>
                            <td>${row.pembelian}</td>
                            <td>${row.tanggal_pembelian}</td>
                            <td>${formatIdr(String(row.harga_pembelian))}</td>
                            <td>${row.Qty_pembelian}</td>
                            <td>${formatIdr(String(row.nominal_pembelian))}</td>
                        </tr>`
                })
                tr += `
                <tr style = "font-weight: bold">
                    <td colspan="5">
                        Jumlah
                    </td>
                    <td>
                        ${formatIdr(String(totalPembelian))}
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
                tr += '<tr><td colspan ="6"><strong>data tidak ada ( ﾉ ﾟｰﾟ)ﾉ </strong></td></tr>'
            } else {
                rows.forEach((row, index) => {
                    totalPenjualan += row.jumlah_penjualan
                    tr+=`<tr>
                            <td>${index + 1}</td>
                            <td>${row.tanggal_penjualan}</td>
                            <td>${formatIdr(String(row.harga_penjualan))}</td>
                            <td>${row.Qty_penjualan}</td>
                            <td>${formatIdr(String(row.jumlah_penjualan))}</td>
                            <td>${row.penjual_penjualan}</td>
                        </tr>`
                })
                tr += `
                <tr style = "font-weight: bold">
                    <td colspan="5">
                        Jumlah
                    </td>
                    <td>
                        ${formatIdr(String(totalPenjualan))}
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
                tr += '<tr><td colspan ="6"><strong>data tidak ada ( ﾉ ﾟｰﾟ)ﾉ </strong></td></tr>'
            } else {
                rows.forEach((row, index) => {
                    totalPengeluaran += row.jumlah
                    tr+=`<tr>
                            <td>${index + 1}</td>
                            <td>${row.keterangan}</td>
                            <td>${row.tanggal}</td>
                            <td>${formatIdr(String(row.harga))}</td>
                            <td>${row.Qty}</td>
                            <td>${formatIdr(String(row.jumlah))}</td>
                        </tr>`
                })
                tr += `
                <tr style = "font-weight: bold">
                    <td colspan="5">
                        Jumlah
                    </td>
                    <td>
                        ${formatIdr(String(totalPengeluaran))}
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