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
                            <td data-colname="id">
                                ${row.id}
                                <input type="checkbox" id="${row.id}" class="data-checkbox">
                            </td>
                            <td>${row.keterangan}</td>
                            <td>${row.tanggal}</td>
                            <td>${row.harga}</td>
                            <td>${row.Qty}</td>
                            <td>${row.jumlah}</td>
                            <td>
                                <button class="btn btn-sm btn-light btn-light-bordered"><i class="fa fa-edit"></i></button>
                                <button class="btn btn-sm btn-danger" onclik="deleteAction(${row.id}, '${row.keterangan}')" id="delete-data"><i class="fa fa-trash"></i></button>
                            </td>
                        </tr>`
                })
            }
            $('tbody#data').html(tr)
        })
    })
}

blankForm = () => {
    $('#keterangan_pengeluaran').val("")
    $('#tanggal_pengeluaran').val("")
    $('#harga_pengeluaran').val("")
    $('#qty_pengeluaran').val("")
}

insertPengeluaran = () => {
    let keterangan = $('#keterangan_pengeluaran').val()
    let tanggal = $('#tanggal_pengeluaran').val()
    let harga = $('#harga_pengeluaran').val()
    let Qty = $('#qty_pengeluaran').val()
    let jumlah = $('#jumlah_pengeluaran').val()

    let required = $('[required]')
    let required_array  = []
    required.each(function() {
        if($(this).val()  !="") {
            required_array.push($(this).val())
        }
    })

    if(required_array.length < 4) {
        dialog.showMessageBoxSync({
            title: 'alert',
            type: 'info',
            message: 'Keterangan,tanggal,harga,dan Qty tidak boleh kosong',
        })
    } else {
        db.serialize( () => {
            db.run(`insert into pengeluaran(keterangan, tanggal, harga, Qty, jumlah) 
            values ('${keterangan}','${tanggal}','${harga}','${Qty}','${jumlah}')`, err => {
                if(err) throw err
                blankForm()
                $('#keterangan_pengeluaran').focus()
                load_data()
            })
        })
    }
}