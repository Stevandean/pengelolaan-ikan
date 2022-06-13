//variabel untuk seluruh bulan
let bulan = ["januari", 'februari','maret', 'april','mei', 'juni', 'juli', 'agustus', 'september', 'oktober', 'novermber', 'desember'];


//function untuk mengubah int ke bentuk format rupiah
function idFormat(num){
    if(isNaN(num)) return "angka tidak valid";
    return "Rp. "+ String(num).replace(/(.)(?=(\d{3})+$)/g,'$1.');
}



//functioon mengolah data pengeluaran
function pengeluaran(rows){
    let data = [];
    let perbulan = [];

    //untuk mencari bulan yang tersedia
    for(let i = 1; i <= 12; i++){
        let bulan1 = rows.filter(arr => {
            return parseInt(arr.tanggal.split("-")[1]) == i
        }).map(() => {return i})[0]
        if(bulan1 != null){perbulan.push(bulan1)};
    }

    //untuk string yang akan dicetak
    perbulan.forEach(arr=> {
        let data_one =  rows.filter(row => parseInt(row.tanggal.split("-")[1]) == arr);
        let qty = data_one.map(arr1 => arr1.Qty).reduce((a,b) => a+b)
        let jumlah = data_one.map(arr => arr.jumlah).reduce((a,b) => a+b)
        let keterangan = data_one.map(arr => arr.keterangan).join(", ")
        data.push({data_one, qty,jumlah,keterangan,bln:arr});
    })
    if(data.length < 1)data = "data sedang bermasalah :'("

    return [perbulan,data]
}

//function untuk mengelola data pembelian
function pembelian(rows){
    let data = [];
    let perbulan = [];
    //untuk mencari bulan yang tersedia
    for(let i = 1; i <= 12; i++){
        let bulan1 = rows.filter(arr => {
            return parseInt(arr.tanggal_pembelian.split("-")[1]) == i
        }).map(kelBulan => {return i})[0]
        if(bulan1 != null){perbulan.push(bulan1)};
    }

    // bulanSeluruh.push(...perbulan); //mengisikan bulanyang ada ke bulan seluruh
    //untuk string yang akan dicetak
    perbulan.forEach(arr=> {
        let data_one =  rows.filter(row => parseInt(row.tanggal_pembelian.split("-")[1]) == arr);
        let qty = data_one.map(arr1 => arr1.Qty_pembelian).reduce((a,b) => a+b)
        let jumlah = data_one.map(arr => arr.nominal_pembelian).reduce((a,b) => a+b)
        let pembeli = data_one.map(arr => arr.pembelian).join(", ");
        data.push({data_one, qty, jumlah, pembeli,bln:arr})
    
    }) 

    if(data.length < 1)data = "data sedang bermasalah :'(";
    return [perbulan,data]
}

// function untuk mengolah data penjualan
function penjualan(rows){
    let data = [];
    let perbulan = [];

    //untuk mencari bulan yang tersedia
    for(let i = 1; i <= 12; i++){
        let bulan1 = rows.filter(arr => {
            return parseInt(arr.tanggal_penjualan.split("-")[1]) == i
        }).map(() => {return i})[0]
        if(bulan1 != null){perbulan.push(bulan1)};
    }

    //untuk string yang akan dicetak
    perbulan.forEach(arr=> {
        let data_one =  rows.filter(row => parseInt(row.tanggal_penjualan.split("-")[1]) == arr);
        let qty = data_one.map(arr1 => arr1.Qty_penjualan).reduce((a,b) => a+b)
        let jumlah = data_one.map(arr => arr.jumlah_penjualan).reduce((a,b) => a+b)
        let penjual = data_one.map(arr => arr.penjual_penjualan).join(", ")
        data.push({data_one, qty,jumlah,penjual,bln:arr});
    })
    if(data.length < 1)data = "data sedang bermasalah :'("

    return [perbulan, data]
}

function cetak(tabel,data){
    let total = 0;
    let tr = data.map(arr => {
        total += arr.jumlah
        return `<tr>
            <td>${bulan[arr.bln-1]}</td>
            <td>${arr.qty}</td>
            <td>${arr[tabel == "pengeluaran"? "keterangan" : tabel == "penjualan" ? "penjual" : "pembeli"]}</td>
            <td>${idFormat(arr.jumlah)}</td>
        </tr>`
    })
    tr += 
        `<tr>
            <td colspan="3"><strong>Total<strong></td>
            <td><strong>${idFormat(total)}</strong></td>
        </tr>`;
    $(`tbody#data-${tabel}`).html(tr);
}

//keseluruhan
function loadKeseluruhan(dt_pembelian, dt_penjualan, dt_pengeluaran) {
    let total = 0;
    let tr = ``;
    let seluruh = [] //perbulan
    let perbulan = [...dt_pembelian[0],... dt_pengeluaran[0],... dt_penjualan[0]]

    //untuk mendapatkan nilai unik dan disorting
    perbulan = perbulan.filter((item, index) => {
        return perbulan.indexOf(item) == index
    }).sort((a,b) => a - b)
    
    //untuk memasukan nilai ke dalam array
    perbulan.forEach((arr) =>{
        //untuk nilai keluar
        let keluar1 = parseInt(dt_pembelian[1].filter(bel => bel.bln == arr).map(be => be.jumlah));
        let keluar2 = parseInt(dt_pengeluaran[1].filter(pel => pel.bln == arr).map(pe => pe.jumlah));

        //untuk nilai masuk
        let masuk = parseInt(dt_penjualan[1].filter(jual => jual.bln == arr).map(ju => ju.jumlah));
        
        seluruh.push([arr, (isNaN(keluar1)? 0 : keluar1 )+ (isNaN(keluar2)? 0: keluar2), isNaN(masuk)? 0 : masuk])
    })

    //saatnya mencetak
    seluruh.forEach(sel => {
        total += sel[2] - sel[1];
        tr += 
        `<tr>
            <td>${bulan[sel[0]-1]}</td>
            <td>${idFormat(sel[1])}</td>
            <td>${idFormat(sel[2])}</td>
            <td>${idFormat(sel[2] - sel[1])}</td>
        </tr>`
    })
    tr +=
    `<tr>
        <td colspan="3"><strong>Total<strong></td>
        <td><strong>${idFormat(total)}</strong></td>
    </tr>`
    $(`tbody#data-keseluruhan`).html(tr);
    return seluruh
    
}

//semua tabel 
function semua(){
    let dt;

    db.serialize(async () => {
        let data1;

        //fug it, callback hell 🔥🔥🔥
        let query1 = `select *, harga_pembelian / qty_pembelian as nominal_pembelian from pembelianIkan`;
        db.all(query1,async (err, rows1) => {
            let query2 = `select *, harga_penjualan * Qty_penjualan as jumlah_penjualan from penjualanIkan`
            db.all(query2,async (err, rows2) => {
                let query3 = `select *, harga * qty as jumlah from pengeluaran`
                db.all(query3,async (err, rows3) => {

                    // console.log(rows1, rows2, rows3)
                    console.log(pengeluaran(rows3)[1]);
                    //waktunya mengeprint tabel 3
                    cetak("pengeluaran", pengeluaran(rows3)[1]);
                    cetak("penjualan", penjualan(rows2)[1]);
                    cetak("pembelian", pembelian(rows1)[1]);

                    //waktunya memproses tabel total
                    loadKeseluruhan(pembelian(rows1),penjualan(rows2),pengeluaran(rows3))
                });
            });
        });
    })

    return dt
}

function loadCashflow(){
    semua()
}