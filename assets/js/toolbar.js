openFormAddData = () => {
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
    } else {
        array_ids = []
        $('input.data-checkbox:checked').each(function() {
            let ids = $(this).attr('id')
            array_ids.push(ids)
        })
        if (array_ids.length < 1) {
            console.log('no data chosen')
            // let msgBox = dialog.showMessageBoxSync ({
            //     type: 'question',
            //     title: 'Delele Records',
            //     buttons: ['No','Yes'],
            //     defaultId: [0,1],
            //     message: 'PERHATIAN. anda tidak memilih data apapun. jika kamu tidak memilih data dari table, ini akan menghapus semua data di table'
            // })
            // if(msgBox ===0) {
            //     console.log('no')
            // } else {
            //     deleteAllRecord()
            // }  
        } else {
            console.log(array_ids)
            // let msgBox = dialog.showMessageBoxSync ({
            //     type: 'question',
            //     title: 'Delele Records',
            //     buttons: ['No','Yes'],
            //     defaultId: [0,1],
            //     message: 'Are you sure you want to dalete selected records ?'
            // })
            // if(msgBox ===0) {
            //     console.log('no')
            //     $('input.data-checkbox').prop("checked", false)
                
            // } else {
            //     join_array_ids = array_ids.join(",")
            //     deleteMultipleRecords(join_array_ids)
            // }
        }
    }
}