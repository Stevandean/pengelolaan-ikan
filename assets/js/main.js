let doc_id = $('body').attr('id')
load_data = () => {
    switch(doc_id) {
        case 'pengeluaran-data' :
            loadPengeluaran();
            break;
    }
}

load_data() 