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
}

//Pagination
// $('#first-page').click(function(e) {
//     e.preventDefault()
//     let total_row_displayed = $('#row_per_page').val()
//     $('#page_number').val(1)
//     load_data(1, total_row_displayed) 
// })
// $('#last-page').click(function(e) {
//     e.preventDefault()
//     let total_page = $('#total_pages').val()
//     $('#page_number').val(total_page)
//     let total_row_displayed = $('#row_per_page').val()
//     load_data(total_page, total_row_displayed)
//     console.log(total_page, total_row_displayed)
// })
// $('#page_number').keyup(function() {
//     let page_number = $(this).val()
//     let total_row_displayed = $('#row_per_page').val()
//     load_data(page_number, total_row_displayed)
// })

// $('#next-page').click(function(e) {
//     e.preventDefault()
//     let total_page = $('#total_pages').val()
//     let input_val = $('#page_number').val()
//     if (input_val == "") {
//         input_val = 1
//     }
//     var page_no = parseInt(input_val)
//     var total_row_displayed = $('#row_per_page').val()
//     if (page_no < total_page) {
//         $('#page_number').val(page_no + 1)
//         load_data(page_no + 1, total_row_displayed)
//     }
// })
// $('#prev-page').click(function(e) {
//     e.preventDefault()
//     var input_val = $('#page_number').val()
//     var page_no = parseInt (input_val)
//     if (page_no > 1) {
//         $('#page_number').val(page_no - 1)
//         var total_row_displayed = $('#row_per_page').val()
//         load_data(page_no - 1, total_row_displayed)
//     }
// })

// $('#row_per_page').change(function () {
//     var total_row_displayed = $(this).val()
//     var page_number = $('#page_number').val()
//     var total_page = $('#total_page').val()
//     if (page_number > total_page) {
//         var page_number = 1
//         $ ('#page_number').val(1)
//     }
//     load_data(page_number, total_row_displayed)
// })

function search() {
    let doc_id = $('body').attr('id')
    let searchVal = $('#search-data').val()

    let query 
    if (searchVal != "") {
        switch (doc_id) {
            case 'pengeluaran-data' :
                query = `select *, harga * qty as jumlah from pengeluaran where keterangan like '%${searchVal}%' or tanggal like '%${searchVal}%' or harga like '%${searchVal}%' or Qty like '%${searchVal}%' or jumlah like '%${searchVal}%' ` 
                break;
            case 'penjualan-data' :
                query = `select * , harga_penjualan * Qty_penjualan as jumlah_penjualan from penjualanIkan where penjual_penjualan like '%${searchVal}%' or tanggal_penjualan like '%${searchVal}%' or harga_penjualan like '%${searchVal}%' or Qty_penjualan like '%${searchVal}%' or jumlah_penjualan like '%${searchVal}%' `
                break;
            case 'pembelian-data' :
                query = `select *, harga_pembelian / qty_pembelian as nominal_pembelian from pembelianIkan where pembelian like '%${searchVal}%' or tanggal_pembelian like '%${searchVal}%' or harga_pembelian like '%${searchVal}%' or Qty_pembelian like '%${searchVal}%' or nominal_pembelian like '%${searchVal}%' `
                break;
            case "cashflow-data" :
                query = searchVal
                break;
            case 'laporan-data' :
                query = searchVal
                console.log(searchVal)
        }
    }

    // console.log(query)
    load_data(query)
    // console.log(searchVal)q
}

$('#search-data').keydown(function (e) {
    if (e.keyCode === 13) {
        search()
    }
})