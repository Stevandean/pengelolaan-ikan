function SubmitEditPenjualan (id) {
    let penjual_penjualan = $('#edit-form').find ('#editPenjualPenjualan').val()
    let tanggal_penjualan = $('#edit-form').find ('#editTanggalPenjualan').val()
    let Qty_penjualan = $('#edit-form').find ('#editQtyPenjualan').val()
    let harga_penjualan = $('#edit-form').find ('#editHargaPenjualan').val()

    //ganti format
    harga_penjualan = harga_penjualan.slice(2, harga_penjualan.length).replace(/\./g,"")
    Qty_penjualan = Qty_penjualan.replace(/\./g,"")

    if (penjual_penjualan === "") {
        dialog.showMessageBoxSync ({
            title: 'Alert',
            type: 'info',
            message: 'Nama Penjual Tidak Boleh Kosong'
        })
    } else if (tanggal_penjualan === "") {
        dialog.showMessageBoxSync ({
            title: 'Alert',
            type: 'info',
            message: 'Tanggal Penjualan Tidak Boleh Kosong'
        })
    } else if (Qty_penjualan === "") {
        dialog.showMessageBoxSync ({
            title: 'Alert',
            type: 'info',
            message: 'Qty Penjualan Tidak Boleh Kosong'
        })
    } else if (harga_penjualan === "") {
        dialog.showMessageBoxSync ({
            title: 'Alert',
            type: 'info',
            message: 'Harga Penjualan Tidak Boleh Kosong'
        })
    } else {
        let query = `update penjualanIkan set penjual_penjualan = '${penjual_penjualan}', tanggal_penjualan = '${tanggal_penjualan}', Qty_penjualan = '${Qty_penjualan}', harga_penjualan = '${harga_penjualan}' where id = ${id}`

        db.serialize( () => {
            db.run(query, err => {
                if(err) throw err
                ipcRenderer.send('update:success', doc_id)
            })
        })
    }
}