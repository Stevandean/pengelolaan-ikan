let inputHarga = IMask(
    document.getElementById('harga'),
    {
        mask: 'Rp num',
        blocks: {
            num: {
                mask: Number,
                thousandsSeparator: '.',
                scale: 3,
                radix: ',',
                mapToRadix: ['.'],
                padFractionalZeros: false,
                signed: false
            }
        }
    }
)

function totalPengeluaranPage (total_row_displayed) {
    let query = `select count(*) as total_row from pengeluaran`
    db.serialize( () => {
        db.each (query, (err, result) => {
            if(err) throw err
            let total_page
            if (result.total_row%total_row_displayed == 0) {
                total_page = parseInt(result.total_row)/parseInt(total_row_displayed)
            } else {
                total_page = parseInt(result.total_row/total_row_displayed) +1
            }
            $('#total_pages').val(total_page)
        })
    })
}

function loadPengeluaran(page_number, total_row_displayed) {
    let row_number
    if(page_number < 2) {
        row_number = 0
    } else {
        row_number = (page_number-1)*total_row_displayed
    }
    total_page(total_row_displayed)

    let query = `select * , harga * qty as jumlah from pengeluaran order by id desc limit ${row_number}, ${total_row_displayed}`
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
                                <button class="btn btn-sm btn-light btn-light-bordered" onclick="editRecord(${row.id})" id="edit-data"><i class="fa fa-edit"></i></button>
                                <button class="btn btn-sm btn-danger" onclick="deleteAction(${row.id}, '${row.keterangan}')" id="delete-data"><i class="fa fa-trash"></i></button>
                            </td>
                        </tr>`
                })
            }
            $('tbody#data').html(tr)
        })
    })
}

    function blankForm () {
    $('#keterangan_pengeluaran').val("")
    $('#tanggal_pengeluaran').val("")
    $('#harga_pengeluaran').val("")
    $('#qty_pengeluaran').val("")
}

    function insertPengeluaran () {
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
            message: 'Keterangan,Tanggal,Harga,dan Qty tidak boleh kosong',
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

function editPengeluaran (id) {  
let sql = `select * from pengeluaran where id = ${id}`
    db.all(sql, (err, result) => {
        if(err) {
            throw err
        } else {
            let row = result[0]
            let editForm
            editForm = `<div class="mb-3 mt-4">
                            <input type="text" value="${row.keterangan}" id="editKetPengeluaran" placeholder="Keterangan" class="form-control form-control-sm">
                            <input type="hidden" value="${row.keterangan}" id="prevKetPengeluaran">
                            <input type="hidden" value="${id}" id="rowId">
                        </div>
                        <div class="mb-3">
                            <input type="date" value="${row.tanggal}" id="editTanggalPengeluaran" placeholder="Tanggal" class="form-control form-control-sm">
                            <input type="hidden" value="${row.tanggal}" id="prevTanggalPengeluaran">
                        </div>
                        <div class="mb-3">
                            <input type="text" value="${row.harga}" id="edithargaPengeluaran" placeholder="harga" class="form-control form-control-sm">
                            <input type="hidden" value="${row.harga}" id="prevhargaPengeluaran">
                        </div>
                        <div class="mb-3">
                            <input type="text" value="${row.Qty}" id="editQtyPengeluaran" placeholder="Qty" class="form-control form-control-sm">
                            <input type="hidden" value="${row.Qty}" id="prevQtyPengeluaran">
                        </div>
                        <div class="d-grid gap-2">
                            <button id="smb-data" class="btn btn-sm btn-primary btn-block" id="btn-submit-edit" data-id=${id}><i class="fa fa-paper-plane"></i> Submit</button>
                        </div>          
                        `
            ipcRenderer.send('load:edit','pengeluaran-data', editForm, 360, 300, id)
        }
    })
}

ipcRenderer.on('update:success', (e, msg) => {
    alertSuccess(msg)
    load_data()
})