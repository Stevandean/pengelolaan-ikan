// let inputHargaPembelian = IMask(
//     document.getElementById('harga_pembelian'),
//     {
//         mask: 'Rp num',
//         blocks: {
//             num: {
//                 mask: Number,
//                 thousandsSeparator: '.',
//                 scale: 10,
//                 radix: ',',
//                 mapToRadix: ['.'],
//                 padFractionalZeros: false,
//                 signed: false
//             }
//         }
//     }
// )

// let inputQtyPembelian = IMask(
//     document.getElementById('Qty_pembelian'),
//     {
//         mask: 'num',
//         blocks: {
//             num: {
//                 mask: Number,
//                 thousandsSeparator: '.',
//                 scale: 10,
//                 radix: ',',
//                 mapToRadix: ['.'],
//                 padFractionalZeros: false,
//                 signed: false
//             }
//         }
//     }
// )

function totalPembelianPage (total_row_displayed) {
    let query = `select count (*) as total_row from pembelianIkan`
    db.serialize( () => {
        db.each (query, (err, result) => {
            if (err) throw err
            let total_page
            if (result.total_row%total_row_displayed == 0) {
                total_page = parseInt(result.total_row)/parseInt(total_row_displayed)
            }else {
                total_page = parseInt(result.total_row/total_row_displayed) + 1
            }
            $('#total_pages').val(total_page)
        })
    })
}

function loadPembelianIkan(page_number, total_row_displayed) {
    if(total_row_displayed == undefined) total_row_displayed = $('#total_pages').val();
    let row_number
    if(page_number < 2) {
        row_number = 0
    } else {
        row_number = (page_number-1) * total_row_displayed
    }
    total_page(total_row_displayed)

    let query = `select *, harga_pembelian / qty_pembelian as nominal_pembelian from pembelianIkan order by id desc limit ${row_number}, ${total_row_displayed}`
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
    $('#harga_pembelian').val("")
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
            message: 'Pembelian,Tanggal,Harga,dan Qty tidak boleh kosong',
        })
    } else {
        db.serialize( () => {
            db.run(`insert into pembelianIkan(pembelian, tanggal_pembelian, harga_pembelian, Qty_pembelian, nominal_pembelian) 
            values ('${pembelian}','${tanggal}','${harga}','${Qty}','${nominal}')`, err => {
                if(err) throw err
                blankForm()
                $('#pembelian').focus()
                load_data(1)
            })
        })
    }
}