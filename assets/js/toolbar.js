openFormAddData = () => {
    $('#form-add-data').addClass('active')
    $('#keterangan_pengeluaran').focus()
}

closeFormAddData = () => {
    $('#form-add-data').removeClass('active')
}

function deleteAction(id = false, data = false) {
    let msg = `Are you sure you want  to dalate ${data} ?`
    //cek apakah  id ada dalam paramater
    if(id) {
        let dialogBox = doalog.showMessageBoxSync ({
            type: 'question',
            title: 'Dalate Records',
            buttons: ['No','Yes'],
            default: [0,1],
            massage: msg
        })
        if(dialogBox === 0) {
            $('input.data-checbox').prop("checked",false)
            $('tbody#data tr').removeClass('blocked')
        } else {
            deleteRecord(id)
        }
    }
}