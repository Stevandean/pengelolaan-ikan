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
                    tr+=`<tr data-id=${row.id}>
                            <td data-colname="Id">
                                ${row.id}
                                <input type="checkbox" style="visibility:hidden" "id="${row.id}" class="data-checkbox">
                            </td>
                            <td>${row.keterangan}</td>
                            <td>${row.tanggal}</td>
                            <td>${row.harga}</td>
                            <td>${row.Qty}</td>
                            <td>${row.jumlah}</td>
                            <td>
                                <button class="btn btn-sm btn-light btn-light-bordered"><i class="fa fa-edit"></i></button>
                                <button class="btn btn-sm btn-danger" onclick="deleteAction(${row.id}, '${row.keterangan}')" id="delete-data"><i class="fa fa-trash"></i></button>
                            </td>
                        </tr>`
                })
            }
            $('tbody#data').html(tr)
        })
    })
}