let inputHargaPengeluaran = IMask(
    document.getElementById('harga_pengeluaran'),
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

let inputQtyPengeluaran = IMask(
    document.getElementById('qty_pengeluaran'),
    {
        mask: 'num',
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

let formatIdr = IMask.createPipe ({
    mask: 'Rp num',
    blocks: {
        num : {
            mask: Number,
            thousandsSeparator: '.',
            scale: 10,
            radix: ',',
            mapToRadix: [','],
            padFractionalZeros: false,
            signed: false
        }
    }
});

function loadPengeluaran(query = `select * , harga * qty as jumlah from pengeluaran`) {
    db.serialize ( () => {
        db.all(query, (err, rows) => {
            if (err) throw err
            let tr = '' 
            if(rows.length <1) {
                tr += '<tr><td colspan ="7"><strong>data tidak ada ( ﾉ ﾟｰﾟ)ﾉ </strong></td></tr>'
            } else {
                rows.forEach((row, index) => {
                    tr+=`<tr data-id=${row.id} class = "font">
                            <td data-colname="Id">
                                ${index + 1}
                            </td>
                            <td>${row.keterangan}</td>
                            <td>${row.tanggal}</td>
                            <td>${formatIdr(String(row.harga))}</td>
                            <td>${row.Qty}</td>
                            <td>${formatIdr(String(row.jumlah))}</td>
                            <td class = "hide-print">
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

    //Ganti Format
    harga = harga.slice(2, harga.length).replace(/\./g , "")
    Qty = Qty.replace(/\./g,"")

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
                editForm = `
                            <div class = "mb-1 mt-2" style = "font-size: 14px; margin-left: 5px;">Keterangan</div>
                            <div class="mb-3 mt-1">
                                <input type="text" value="${row.keterangan}" id="editKetPengeluaran" placeholder="Keterangan" class="form-control form-control-sm">
                                <input type="hidden" value="${row.keterangan}" id="prevKetPengeluaran">
                                <input type="hidden" value="${id}" id="rowId">
                            </div>

                            <div class = "mb-1 mt-2" style = "font-size: 14px; margin-left: 5px;">Tanggal</div>
                            <div class="mb-3">
                                <input type="date" value="${row.tanggal}" id="editTanggalPengeluaran" placeholder="Tanggal" class="form-control form-control-sm">
                                <input type="hidden" value="${row.tanggal}" id="prevTanggalPengeluaran">
                            </div>
                            
                            <div class = "mb-1 mt-2" style = "font-size: 14px; margin-left: 5px;">Harga</div>
                            <div class="mb-3">
                                <input type="text" value="${formatIdr(String(row.harga))}" id="edithargaPengeluaran" placeholder="harga" class="form-control form-control-sm">
                                <input type="hidden" value="${row.harga}" id="prevHargaPengeluaran">
                            </div>
                            
                            <div class = "mb-1 mt-2" style = "font-size: 14px; margin-left: 5px;">Qty</div>
                            <div class="mb-3">
                                <input type="text" value="${row.Qty}" id="editQtyPengeluaran" placeholder="Qty" class="form-control form-control-sm">
                                <input type="hidden" value="${row.Qty}" id="prevQtyPengeluaran">
                            </div>
                            <div class="d-grid gap-2">
                                <button id="smb-data" class="btn btn-sm btn-primary btn-block" id="btn-submit-edit" data-id=${id}><i class="fa fa-paper-plane"></i> Submit</button>
                            </div>          
                            `
                ipcRenderer.send('load:edit','pengeluaran-data', editForm, 360, 400, id)
            }
        })
        ipcRenderer.on('update:success', (e, msg) => {
            alertSuccess(msg)
            load_data()
        })
}