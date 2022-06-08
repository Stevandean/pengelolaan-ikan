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
                    tr+=`<tr data-id=${row.id}>
                            <td data-colname="Id">
                                ${row.id}
                                <input type="checkbox" style="visibility:hidden" "id="${row.id}" class="data-checkbox">
                            </td>
                            <td>${row.tanggal_penjualan}</td>
                            <td>${row.harga_penjualan}</td>
                            <td>${row.Qty_penjualan}</td>
                            <td>${row.jumlah_penjualan}</td>
                            <td>${row.penjual_penjualan}</td>
                            <td>
                                <button class="btn btn-sm btn-light btn-light-bordered"><i class="fa fa-edit"></i></button>
                                <button class="btn btn-sm btn-danger" onclick="deleteAction(${row.id}, '${row.penjual_penjualan}')" id="delete-data"><i class="fa fa-trash"></i></button>
                            </td>
                        </tr>`
                })
            }
            $('tbody#data').html(tr)
        })
    })
}

blankForm = () => {
    $('#tanggal_penjualan').val("")
    $('#harga_penjualan').val("")
    $('#Qty_penjualan').val("")
    $('#penjual_penjualan').val("")
}

insertPenjualanIkan = () => {
    let tanggal_penjualan = $('#tanggal_penjualan').val()
    let harga_penjualan = $('#harga_penjualan').val()
    let Qty_penjualan = $('#Qty_penjualan').val()
    let jumlah_penjualan = $('#jumlah_penjualan').val()
    let penjual_penjualan = $('#penjual_penjualan').val()

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
            message: 'Penjual,Tanggal,Harga,dan Qty tidak boleh kosong',
        })
    } else {
        db.serialize( () => {   
            db.run(`insert into penjualanIkan(tanggal_penjualan, harga_penjualan, Qty_penjualan, jumlah_penjualan, penjual_penjualan) 
            values ('${tanggal_penjualan}','${harga_penjualan}','${Qty_penjualan}','${jumlah_penjualan}','${penjual_penjualan}')`, err => {
                if(err) throw err
                blankForm()
                $('#penjual_penjualan').focus()
                load_data()
            })
        })
    }
}