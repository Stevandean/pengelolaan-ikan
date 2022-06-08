openFormAddData = () => {
    $('#form-add-data').addClass('active')
    $('#keterangan_pengeluaran').focus()
}

openFormAddDataPenjualan = () => {
    $('#form-add-data').addClass('active')
    $('#penjual_penjualan').focus()
}

openFormAddDataPembelian = () => {
    $('#form-add-data').addClass('active')
    $('#keterangan_pengeluaran').focus()
}

closeFormAddData = () => {
    $('#form-add-data').removeClass('active')
}

function deleteAction(id = false, data = false) {
    
    let msg = `Are you sure you want  to delete ${data} ?`
    //cek apakah  id ada dalam paramater fungsi
    if(id) {
        let dialogBox = dialog.showMessageBoxSync ({
            type: 'question',
            title: 'Delele Records',
            buttons: ['No','Yes'],
            defaultId: [0,1],
            message: msg
        })
        if(dialogBox === 0) {
            $('input.data-checkbox').prop("checked" ,false)
            $('tbody#data tr').removeClass('blocked')
        } else {
            deleteRecord(id)
        }
    } 
    else {
        array_ids = []
        $('input.data-checkbox:checked').each(function() {
            let ids = $(this).attr('id')
            array_ids.push(ids)
        })
        if(array_ids.length < 1) {
            let msgBox = dialog.showMessageBoxSync({
                type: 'question',
                title: 'Delete records',
                buttons: ['No','Yes'],
                defaultId: [0,1],
                message: 'ATTENTION. You did not select eny record. If no record selected, then this action WILL DELETE ALL RECORDS in the table. Are you sure you want to delete all records in this table?'
            })
            if(msgBox === 0) {
                console.log('No')
            } else {
                deleteAllRecords()
            }
        } else {
            let msgBox = dialog.showMessageBoxSync({
                type: 'question',
                title: 'Delete records',
                buttons: ['No','Yes'],
                defaultId: [0,1],
                message: 'Are you sure you want to delete the selected records ?'
            })
            if(msgBox === 0) {
                console.log('No')
                $('input.data-checkbox').prop("checked", false)
            } else {
                join_array_ids = array_ids.join(",")
                deleteMultipleRecords(join_array_ids)
            }
        }   
    }
}