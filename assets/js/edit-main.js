let doc_id
let id
ipcRenderer.on('res:form', (e, editDocId, editForm, rowId) => {
    $('#edit-form').html(editForm)
    doc_id = editDocId
    id = rowId
    // console.log(SubmitEditData)
    // console.log(SubmitEditData())

    let mdl = document.querySelector("#mdl");
    mdl.addEventListener("click", (e)=> {
        // console.log(e.target.id)
        if(e.target.id == "smb-data"){
            SubmitEditData(e.target.getAttribute("data-id"))
        }
    })
})

function SubmitEditData (id) {
    switch (doc_id) {
        case 'pengeluaran-data' :
            SubmitEditPengeluaran(id)
            break;
        case 'penjualan-data' :
            SubmitEditPenjualan(id)
            break;
        case 'pembelian-data' :
            SubmitEditPembelian(id)
            break;
    }
}
