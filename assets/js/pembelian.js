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
                    tr+=`<tr data-id=${row.id}>
                            <td data-colname="Id">
                                ${row.id}
                                <input type="checkbox" style="visibility:hidden" "id="${row.id}" class="data-checkbox">
                            </td>
                            <td>${row.pembelian}</td>
                            <td>${row.tanggal_pembelian}</td>
                            <td>${row.harga_pembelian}</td>
                            <td>${row.Qty_pembelian}</td>
                            <td>${row.nominal_pembelian}</td>
                            <td>
                                <button class="btn btn-sm btn-light btn-light-bordered"><i class="fa fa-edit"></i></button>
                                <button class="btn btn-sm btn-danger" onclick="deleteAction(${row.id}, '${row.pembelian}')" id="delete-data"><i class="fa fa-trash"></i></button>
                            </td>
                        </tr>`
                })
            }
            $('tbody#data').html(tr)
        })
    })
}

blankForm = () => {
    $('#pembelian').val("")
    $('#tanggal_pembelian').val("")
    $('#harga_pembellian').val("")
    $('#Qty_pembelian').val("")
}

insertPembelianIkan = () => {
    let pembelian = $('#pembelian').val()
    let tanggal = $('#tanggal_pembelian').val()
    let harga = $('#harga_pembelian').val()
    let Qty = $('#Qty_pembelian').val()
    let nominal = $('#nominal_pembelian').val()

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
            db.run(`insert into pembelianIkan(pembelian, tanggal_pembelian, harga_pembelian, Qty_pembelian, nominal_pembelian) 
            values ('${pembelian}','${tanggal}','${harga}','${Qty}','${nominal}')`, err => {
                if(err) throw err
                blankForm()
                $('#pembelian').focus()
                load_data()
            })
        })
    }
}