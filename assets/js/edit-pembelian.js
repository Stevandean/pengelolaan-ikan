function SubmitEditPembelian (id) {
    let pembelian = $('#edit-form').find ('#editPemPembelian').val()
    let tanggal_pembelian = $('#edit-form').find ('#editTanggalPembelian').val()
    let harga_pembelian = $('#edit-form').find ('#editHargaPembelian').val()
    let Qty_pembelian = $('#edit-form').find ('#editQtyPembelian').val()

    //ganti format
    harga_pembelian = harga_pembelian.slice(2, harga_pembelian.length).replace(/\./g,"")
    Qty_pembelian = Qty_pembelian.replace(/\./g,"")
    
    if (pembelian === "") {
        dialog.showMessageBoxSync ({
            title: 'Alert',
            type: 'info',
            message: 'Pembelian Tidak Boleh Kosong'
        })
    } else if (tanggal_pembelian === "") {
        dialog.showMessageBoxSync ({
            title: 'Alert',
            type: 'info',
            message: 'Tanggal Pembelian Tidak Boleh Kosong'
        })
    } else if (harga_pembelian === "") {
        dialog.showMessageBoxSync ({
            title: 'Alert',
            type: 'info',
            message: 'Harga pembelian Tidak Boleh Kosong'
        })
    } else if (Qty_pembelian === "") {
        dialog.showMessageBoxSync ({
            title: 'Alert',
            type: 'info',
            message: 'Qty Pembelian Tidak Boleh Kosong'
        })
    } else {
        let query = `update pembelianIkan set pembelian = '${pembelian}', tanggal_pembelian = '${tanggal_pembelian}', harga_pembelian = '${harga_pembelian}', Qty_pembelian = '${Qty_pembelian}' where id = ${id}`

        db.serialize( () => {
            db.run(query, err => {
                if(err) throw err
                ipcRenderer.send('update:success', doc_id)
            })
        })    
    }
}

