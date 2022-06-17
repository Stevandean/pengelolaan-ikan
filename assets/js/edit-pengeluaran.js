function SubmitEditPengeluaran (id) {
    let keterangan = $('#edit-form').find('#editKetPengeluaran').val()
    let tanggal = $('#edit-form').find('#editTanggalPengeluaran').val()
    let harga = $('#edit-form').find('#edithargaPengeluaran').val()
    let Qty = $('#edit-form').find('#editQtyPengeluaran').val()

    //Ganti Format
    harga = harga.slice(2, harga.length).replace(/\./g , "")
    Qty = Qty.replace(/\./g,"")    

    if(keterangan === "") {
        dialog.showMessageBoxSync({
            title: 'Alert',
            type: 'info',
            message: 'Keterangan Pengeluaran Tidak Boleh Kosong'
        })
    } else if (tanggal === "" ) {
        dialog.showMessageBoxSync ({
            title: 'Alert',
            type: 'info',
            message: 'Tanggal Pengeluaran Tidak Boleh Kosong'
        })
    } else if (harga === "") {
        dialog.showMessageBoxSync ({
            title: 'Alert',
            type: 'info',
            message: 'Harga Pengeluaran Tidak Boleh Kosong'
        })
    } else if (Qty === "") {
        dialog.showMessageBoxSync ({
            title: 'Alert',
            type: 'info',
            message: 'Qty Pengeluaran Tidak Boleh Kosong'
        })

    } else {
        let query = `update pengeluaran set keterangan = '${keterangan}', tanggal = '${tanggal}', harga = '${harga}', Qty = '${Qty}' where id = ${id}`

        db.serialize( () => {
            db.run(query, err => {
                if(err) throw err
                ipcRenderer.send('update:success', doc_id)
            })
        })    
    }
}

