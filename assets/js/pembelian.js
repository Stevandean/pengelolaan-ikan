let inputHargaPembelian = IMask(
    document.getElementById('harga_pembelian'),
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

let inputQtyPembelian = IMask(
    document.getElementById('Qty_pembelian'),
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

// function totalPembelianPage (total_row_displayed) {
//     let query = `select count (*) as total_row from pembelianIkan`
//     db.serialize( () => {
//         db.each (query, (err, result) => {
//             if (err) throw err
//             let total_page
//             if (result.total_row%total_row_displayed == 0) {
//                 total_page = parseInt(result.total_row)/parseInt(total_row_displayed)
//             }else {
//                 total_page = parseInt(result.total_row/total_row_displayed) + 1
//             }
//             $('#total_pages').val(total_page)
//         })
//     })
// }

// function loadPembelianIkan(page_number, total_row_displayed) {
//     if(total_row_displayed == undefined) total_row_displayed = $('#total_pages').val();
//     let row_number
//     if(page_number < 2) {
//         row_number = 0
//     } else {
//         row_number = (page_number-1) * total_row_displayed
//     }
//     total_page(total_row_displayed)

//     let query = `select *, harga_pembelian / qty_pembelian as nominal_pembelian from pembelianIkan order by id desc limit ${row_number}, ${total_row_displayed}`
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
//                             <td>${row.pembelian}</td>
//                             <td>${row.tanggal_pembelian}</td>
//                             <td>${row.harga_pembelian}</td>
//                             <td>${row.Qty_pembelian}</td>
//                             <td>${row.nominal_pembelian}</td>
//                             <td>
//                                 <button class="btn btn-sm btn-light btn-light-bordered"><i class="fa fa-edit"></i></button>
//                                 <button class="btn btn-sm btn-danger" onclick="deleteAction(${row.id}, '${row.pembelian}')" id="delete-data"><i class="fa fa-trash"></i></button>
//                             </td>
//                         </tr>`
//                 })
//             }
//             $('tbody#data').html(tr)
//         })
//     })
// }
function loadPembelianIkan(query = `select *, harga_pembelian / qty_pembelian as nominal_pembelian from pembelianIkan`) {
    if(page_number < 2) {
        row_number = 0
    } 

    db.serialize ( () => {
        db.all(query, (err, rows) => {
            if (err) throw err
            let tr = ''
            if(rows.length <1) {
                tr += '<tr><td colspan ="4"><strong>data tidak ada ( ﾉ ﾟｰﾟ)ﾉ </strong></td></tr>'
            } else {
                rows.forEach((row) => {
                    tr+=`<tr data-id=${row.id}>
                            <td data-colname="Id">
                                ${row.id}
                                <input type="checkbox" style="visibility:hidden" "id="${row.id}" class="data-checkbox">
                            </td>
                            <td>${row.pembelian}</td>
                            <td>${row.tanggal_pembelian}</td>
                            <td>${formatIdr(String(row.harga_pembelian))}</td>
                            <td>${row.Qty_pembelian}</td>
                            <td>${formatIdr(String(row.nominal_pembelian))}</td>
                            <td class = "hide-print">
                                <button class="btn btn-sm btn-light btn-light-bordered" onclick="editRecord(${row.id})"><i class="fa fa-edit"></i></button>
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
    let tanggal_pembelian = $('#tanggal_pembelian').val()
    let harga_pembelian = $('#harga_pembelian').val()
    let Qty_pembelian = $('#Qty_pembelian').val()
    let nominal_pembelian = $('#nominal_pembelian').val()

    //ganti format
    harga_pembelian = harga_pembelian.slice(2, harga_pembelian.length).replace(/\./g,"")
    Qty_pembelian = Qty_pembelian.replace(/\./g,"")

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
            values ('${pembelian}','${tanggal_pembelian}','${harga_pembelian}','${Qty_pembelian}','${nominal_pembelian}')`, err => {
                if(err) throw err
                blankForm()
                $('#pembelian').focus()
                load_data()
            })
        })
    }
}

function editPembelian (id) {
    let sql =  `select * from pembelianIkan where id = ${id}`
        db.all(sql, (err, result) => {
            if(err) {
                throw err
            } else {
                let row = result[0]
                let editForm
                editForm = `
                    <div class="mb-1 mt-2" style="font-size: 14px; margin-left: 5px;">Pembelian</div>
                    <div class="mb-3 mt-1">
                        <input type="text" value="${row.pembelian}" id="editPemPembelian" placeholder="Pembelian" class="form-control form-control-sm">
                        <input type="hidden" value="${row.pembelian}" id="editPemPembelian">
                        <input type="hidden" value="${row.id}" id="rowId">
                    </div>

                    <div class="mb-1 mt-2" style="font-size: 14px; margin-left: 5px;">Tanggal</div>
                    <div class="mb-3 mt-1">
                        <input type="text" value="${row.tanggal_pembelian}" id="editTanggalPembelian" placeholder="Tanggal" class="form-control form-control-sm">
                        <input type="hidden" value="${row.tanggal_pembelian}" id="editTanggalPembelian">
                    </div>

                    <div class="mb-1 mt-2" style="font-size: 14px; margin-left: 5px;">Harga</div>
                    <div class="mb-3 mt-1">
                        <input type="text" value="${formatIdr(String(row.harga_pembelian))}" id="editHargaPembelian" placeholder="Harga" class="form-control form-control-sm">
                        <input type="hidden" value="${formatIdr(String(row.harga_pembelian))}" id="editHargaPembelian">
                    </div>

                    <div class="mb-1 mt-2" style="font-size: 14px; margin-left: 5px;">Qty</div>
                    <div class="mb-3 mt-1">
                        <input type="text" value="${row.Qty_pembelian}" id="editQtyPembelian" placeholder="Qty" class="form-control form-control-sm">
                        <input type="hidden" value="${row.Qty_pembelian}" id="editQtyPembelian">
                    </div>

                    <div class="d-grid gap-2">
                        <button id="smb-data" class="btn btn-sm btn-primary btn-block" id="btn-submit-edit" data-id=${id}><i class="fa fa-paper-plane"></i> Submit</button>
                    </div>          

                `
                ipcRenderer.send('load:edit','pembelian-data', editForm, 360, 400, id)
            }
        })
        ipcRenderer.on('update:success', (e, msg) => {
            alertSuccess(msg)
            load_data()
        })
}