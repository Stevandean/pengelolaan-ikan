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

//Pagination
$('#first-page').click(function(e) {
    e.preventDefault()
    let total_row_displayed = $('#row_per_page').val()
    $('#page_number').val(1)
    load_data(1, total_row_displayed) 
})
$('#last-page').click(function(e) {
    e.preventDefault()
    let total_page = $('#total_pages').val()
    $('#page_number').val(total_page)
    let total_row_displayed = $('#row_per_page').val()
    load_data(total_page, total_row_displayed)
    console.log(total_page, total_row_displayed)
})
$('#page_number').keyup(function() {
    let page_number = $(this).val()
    let total_row_displayed = $('#row_per_page').val()
    load_data(page_number, total_row_displayed)
})

$('#next-page').click(function(e) {
    e.preventDefault()
    let total_page = $('#total_pages').val()
    let input_val = $('#page_number').val()
    if (input_val == "") {
        input_val = 1
    }
    var page_no = parseInt(input_val)
    var total_row_displayed = $('#row_per_page').val()
    if (page_no < total_page) {
        $('#page_number').val(page_no + 1)
        load_data(page_no + 1, total_row_displayed)
    }
})
$('#prev-page').click(function(e) {
    e.preventDefault()
    var input_val = $('#page_number').val()
    var page_no = parseInt (input_val)
    if (page_no > 1) {
        $('#page_number').val(page_no - 1)
        var total_row_displayed = $('#row_per_page').val()
        load_data(page_no - 1, total_row_displayed)
    }
})

$('#row_per_page').change(function () {
    var total_row_displayed = $(this).val()
    var page_number = $('#page_number').val()
    var total_page = $('#total_page').val()
    if (page_number > total_page) {
        var page_number = 1
        $ ('#page_number').val(1)
    }
    load_data(page_number, total_row_displayed)
})