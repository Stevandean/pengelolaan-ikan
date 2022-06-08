// let inputHarga = Imask(
//     document.getElementById('harga'),
//     {
//         mask: 'Rp num',
//         Blocks: {
//             num: {
//                 mask: Number,
//                 thousendsSeparator:'.',
//                 scale: 3,
//                 radix: ',',
//                 mapToRadix:['.'],
//                 padFactionalZeros: false,
//                 signed: false
//             }
//         }
//     }
// )

// let inputPrdPrice = IMask(
//     document.getElementById('product_price'),
//     {
//         mask: 'Rp num',
//         blocks: {
//             num: {
//                 mask: Number,
//                 thousandsSeparator: '.',
//                 scale: 3,
//                 radix: ',',
//                 mapToRadix: ['.'],
//                 padFractionalZeros: false,
//                 signed: false
//             }
//         }
//     }
// )
// let inputPrdCost = IMask(
//     document.getElementById('product_cost'),
//     {
//         mask: 'Rp num',
//         blocks: {
//             num: {
//                 mask: Number,
//                 thousandsSeparator: '.',
//                 scale: 3,
//                 radix: ',',
//                 mapToRadix: ['.'],
//                 padFractionalZeros: false,
//                 signed: false
//             }
//         }
//     }
// )
// let inputPrdInitQty = IMask(
//     document.getElementById('product_initial_qty'),
//     {
//         mask: 'num',
//         blocks: {
//             num: {
//                 mask: Number,
//                 thousandsSeparator: '.',
//                 padFractionalZeros: false,
//                 signed: false
//             }
//         }
//     }
// )

//pembelian
function loadPembelianIkan() {
    let query = `select *, harga_pembelian / qty_pembelian as nominal_pembelian from pembelianIkan`
    db.serialize ( () => {
        db.all(query, (err, rows) => {
            if (err) throw err
            let tr = ''
            if(rows.length <1) {
                tr += ''
            } else {
                rows.forEach((row) => {
                    tr+=`<tr>
                            <td>${row.pembelian}</td>
                            <td>${row.tanggal_pembelian}</td>
                            <td>${row.harga_pembelian}</td>
                            <td>${row.Qty_pembelian}</td>
                            <td>${row.nominal_pembelian}</td>
                        </tr>`
                })
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
            if (err) throw err
            let tr = ''
            if(rows.length <1) {
                tr += ''
            } else {
                rows.forEach((row) => {
                    tr+=`<tr>
                            <td>${row.tanggal_penjualan}</td>
                            <td>${row.harga_penjualan}</td>
                            <td>${row.Qty_penjualan}</td>
                            <td>${row.jumlah_penjualan}</td>
                            <td>${row.penjual_penjualan}</td>
                        </tr>`
                })
                tr+=`<td colspan = "6">Jumlah</td>       `
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
            if (err) throw err
            let tr = '' 
            if(rows.length <1) {
                tr += ''
            } else {
                rows.forEach((row) => {
                    tr+=`<tr>
                            <td>${row.keterangan}</td>
                            <td>${row.tanggal}</td>
                            <td>${row.harga}</td>
                            <td>${row.Qty}</td>
                            <td>${row.jumlah}</td>
                        </tr>`
                })
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