let inputHargaPenjualan = IMask(
    document.getElementById('harga_penjualan'),
    {
        mask: 'Rp num',
        blocks: {
            num: {
                mask: Number,
                thousandsSeparator: '.',
                scale: 10,
                radix: ',',
                mapToRadix: ['.'],
                padFractionalZeros: false,
                signed: false
            }
        }
    }
)

let inputQtyPenjualan = IMask(
    document.getElementById('Qty_penjualan'),
    {
        mask: 'num',
        blocks: {
            num: {
                mask: Number,
                thousandsSeparator: '.',
                scale: 10,
                radix: ',',
                mapToRadix: ['.'],
                padFractionalZeros: false,
                signed: false
            }
        }
    }
)

let formatIdr = IMask.createPipe({
    mask: 'Rp num',
    blocks: {
        num: {
            mask: Number,
            thousandsSeparator: '.',
            scale: 10,
            radix: ',',
            mapToRadix: ['.'],
            padFractionalZeros: false,
            signed: false
        }
    }
  });


// function totalPenjualanPage (total_row_displayed) {
//     let query = `select count(*) as total_row from penjualanIkan`
//     db.serialize( () => {
//         db.each (query, (err, result) => {
//             if(err) throw err
//             let total_page
//             if (result.total_row%total_row_displayed == 0) {
//                 total_page = parseInt(result.total_row)/parseInt(total_row_displayed)
//             } else {
//                 total_page = parseInt(result.total_row/total_row_displayed) +1
//             }
//             $('#total_pages').val(total_page)
//         })
//     })
// }

// function loadPenjualan(page_number, total_row_displayed) {
//     if(total_row_displayed == undefined) total_row_displayed = $('#total_pages').val();
//     let row_number
//     if(page_number < 2) {
//         row_number = 0
//     } else {
//         row_number = (page_number-1)*total_row_displayed
//     }
//     total_page(total_row_displayed)

//     let query = `select * , harga_penjualan * Qty_penjualan as jumlah_penjualan from penjualanIkan order by id desc limit ${row_number}, ${total_row_displayed}`
//     db.serialize ( () => {
//         db.all(query, (err, rows) => {
//             if (err) throw err
//             let tr = ''
//             if(rows.length <1) {
//                 tr += ''
//             } else {
//                 rows.forEach((row) => {
//                     tr+=`<tr data-id=${row.id}>
//                             <td data-colname="Id">
//                                 ${row.id}
//                                 <input type="checkbox" style="visibility:hidden" "id="${row.id}" class="data-checkbox">
//                             </td>
//                             <td>${row.tanggal_penjualan}</td>
//                             <td>${row.harga_penjualan}</td>
//                             <td>${row.Qty_penjualan}</td>
//                             <td>${row.jumlah_penjualan}</td>
//                             <td>${row.penjual_penjualan}</td>
//                             <td>
//                                 <button class="btn btn-sm btn-light btn-light-bordered"><i class="fa fa-edit"></i></button>
//                                 <button class="btn btn-sm btn-danger" onclick="deleteAction(${row.id}, '${row.penjual_penjualan}')" id="delete-data"><i class="fa fa-trash"></i></button>
//                             </td>
//                         </tr>`
//                 })
//             }
//             $('tbody#data').html(tr)
//         })
//     })
// }
function loadPenjualan( query = `select * , harga_penjualan * Qty_penjualan as jumlah_penjualan from penjualanIkan` ) {
    if(page_number < 2) {
        row_number = 0
    } 

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
                            <td>${row.penjual_penjualan}</td>
                            <td>${row.tanggal_penjualan}</td>
                            <td>${formatIdr(String(row.harga_penjualan))}</td>
                            <td>${row.Qty_penjualan}</td>
                            <td>${formatIdr(String(row.jumlah_penjualan))}</td>
                            <td>
                                <button class="btn btn-sm btn-light btn-light-bordered" onclick="editRecord(${row.id})"><i class="fa fa-edit"></i></button>
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

    //ganti format
    harga_penjualan = harga_penjualan.slice(2, harga_penjualan.length).replace(/\./g,"")
    Qty_penjualan = Qty_penjualan.replace(/\./g,"")

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

function editPenjualan (id) {
    let sql =  `select * from penjualanIkan where id = ${id}`
    db.all (sql, (err, result) => {
        if (err) {
            throw err
        } else {
            let row = result [0]
            let editForm
            editForm = `
                        <div class = "mt-2" style = "font-size: 14px; margin-left: 5px">Penjual</div>
                        <div class = "mb-3 mt-2">
                            <input type = "text" value = "${row.penjual_penjualan}" id = "editPenjualPenjualan" placeHolder = "Penjual" class = "form-control form-control-sm">
                            <input type = "hidden" value = "${row.penjual_penjualan}" id = "prevPenjualPenjualan">
                            <input type = "hidden" value = "${id}" id = "rowId"
                        </div>

                        <div class = "mt-3" style = "font-size: 14px; margin-left: 5px">Tanggal</div>
                        <div class = "mb-3 mt-2">
                            <input type = "date" value = "${row.tanggal_penjualan}" id = "editTanggalPenjualan" placeHolder = "Tanggal" class = "form-control form-control-sm">
                            <input type = "hidden" valule = "${row.tanggal_penjualan}" id = "prevTanggalPenjualan">
                        </div>
                        
                        <div class = "mb-1 mt-3" style = "font-size: 14px; margin-left: 5px">Qty</div>
                        <div class = "mb-3 mt-1">
                            <input type = "text" value = "${formatIdr(String(row.harga_penjualan))}" id = "editHargaPenjualan" placeHolder = "Harga" class = "form-control form-control-sm">
                            <input type = ""hidden value = "${formatIdr(String(row.harga_penjualan))}" id = "prevHargaPenjualan">
                        </div>
                        
                        <div class = "mt-3" style = "font-size: 14px; margin-left: 5px">Harga</div>
                        <div class = "mb-3 mt-2">
                            <input type = "text" value = "${row.Qty_penjualan}" id = "editQtyPenjualan" placeHolder = "Qty" class = "form-control form-control-sm">
                            <input type = "hidden" value = "${row.Qty_penjualan}" id = "prevQtyPenjualan">
                        </div>

                        <div class="d-grid gap-2">
                            <button id="smb-data" class="btn btn-sm btn-primary btn-block" id="btn-submit-edit" data-id=${id}><i class="fa fa-paper-plane"></i> Submit</button>
                        </div>          
                        `
            ipcRenderer.send('load:edit','penjualan-data', editForm, 360, 400, id)
        }
    })
    ipcRenderer.on('update:success', (e, msg) => {
        alertSuccess(msg)
        load_data()
    })
}