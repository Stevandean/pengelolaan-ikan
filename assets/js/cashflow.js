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

function cetak(tabel,data, keyword = ""){
    let total = 0;
    let tr = "";
    let dt ; //data yang telah difilter
    // console.log(data)
    if(data.length > 0 && Array.isArray(data)){

        dt = data.map(arr => {
            total += arr.jumlah
            return [
                bulan[arr.bln-1],
                arr.qty,
                arr[tabel == "pengeluaran"? "keterangan" : tabel == "penjualan" ? "penjual" : "pembeli"],
                idFormat(arr.jumlah)
            ]
        })
        console.log(dt)
        //jika keyword ada maka cari terlebih dahulu
        if(keyword != ""){
            let reg = new RegExp(keyword)
            dt = dt
            .filter(arr => {
                return(
                    arr[0].match(reg) ||
                    String(arr[1]).match(reg) ||
                    arr[2].match(reg) ||
                    arr[3].match(reg)
                )
            })
        }
        //untuk string
        tr = dt.map(arr => {
            return `<tr>
                <td>${arr[0]}</td>
                <td>${arr[1]}</td>
                <td>${arr[2]}</td>
                <td>${arr[3]}</td>
            </tr>`
        })
        if(keyword == ""){
            tr += 
                `<tr>
                    <td colspan="3"><strong>Total<strong></td>
                    <td><strong>${idFormat(total)}</strong></td>
                </tr>`;
            }
        if(tr.length > 0)$(`tbody#data-${tabel}`).html(tr);
        else $(`tbody#data-${tabel}`).html(`<tr><td colspan ="4"><strong>data tidak ada ( ﾉ ﾟｰﾟ)ﾉ </strong></td></tr>`);
        
    }else{
        console.log("test 1")
        $(`tbody#data-${tabel}`).html(`<tr><td><strong>maaf sedang bermasalah :( </strong></td></tr>`);
    }
    
}

//keseluruhan
function loadKeseluruhan([dt_pembelian = [[]], dt_penjualan = [[]], dt_pengeluaran = [[]]], keyword = "") {
    let total = 0;
    let tr = ``;
    let seluruh = [] 
    //perbulan
    let perbulan = [...dt_pembelian[0],... dt_pengeluaran[0],... dt_penjualan[0]]

    //untuk mendapatkan nilai unik dan disorting
    perbulan = perbulan.filter((item, index) => {
        return perbulan.indexOf(item) == index
    }).sort((a,b) => a - b)
    
    //untuk memasukan nilai ke dalam array
    perbulan.forEach((arr) =>{
        let keluar1 = 0
        let keluar2 = 0
        let masuk = 0

        //untuk nilai keluar
        if(dt_pembelian[1].length > 0) {
            keluar1 = parseInt(dt_pembelian[1].filter(bel => bel.bln == arr).map(be => be.jumlah))
        };
        if(dt_pengeluaran[1].length > 0) {
            keluar2 = parseInt(dt_pengeluaran[1].filter(pel => pel.bln == arr).map(pe => pe.jumlah));
        }
        //untuk nilai masuk
        if(dt_penjualan[1].length > 0) {
            masuk = parseInt(dt_penjualan[1].filter(jual => jual.bln == arr).map(ju => ju.jumlah));
        }
        
        seluruh.push([bulan[arr-1], (isNaN(keluar1)? 0 : keluar1 )+ (isNaN(keluar2)? 0: keluar2), isNaN(masuk)? 0 : masuk])
    })
    //jika ada yang dicari maka
    if(keyword != ""){
        let reg = new RegExp(keyword)
        seluruh = seluruh.filter(sel => {
            return (
                sel[0].match(reg) ||
                String(sel[1]).match(reg) ||
                String(sel[2]).match(reg) ||
                String(sel[3]).match(reg)
            )
        })

    }

    //saatnya mencetak
    seluruh.forEach(sel => {
        total += sel[2] - sel[1];
        tr += 
        `<tr>
            <td>${sel[0]}</td>
            <td>${idFormat(sel[1])}</td>
            <td>${idFormat(sel[2])}</td>
            <td>${idFormat(sel[2] - sel[1])}</td>
        </tr>`
    })
    if(keyword == ""){
        tr +=
        `<tr>
            <td colspan="3"><strong>Total<strong></td>
            <td><strong>${idFormat(total)}</strong></td>
        </tr>`
    }
    if(!(seluruh.length > 0))tr += `<tr><td colspan ="4"><strong>data tidak ada ( ﾉ ﾟｰﾟ)ﾉ </strong></td></tr>`;
    $(`tbody#data-keseluruhan`).html(tr);
    return seluruh
    
}

//semua tabel 
function semua(keyword =  ""){
    let dt;

    db.serialize(async () => {

        //fug it, callback hell 🔥🔥🔥
        if(keyword == ""){
            let query1 = `select *, harga_pembelian / qty_pembelian as nominal_pembelian from pembelianIkan`;
            db.all(query1,async (err, rows1) => {
                let query2 = `select *, harga_penjualan * Qty_penjualan as jumlah_penjualan from penjualanIkan`
                db.all(query2,async (err, rows2) => {
                    let query3 = `select *, harga * qty as jumlah from pengeluaran`
                    db.all(query3,async (err, rows3) => {

                        // console.log(rows1, rows2, rows3)
                        //waktunya mengeprint tabel 3
                        cetak("pengeluaran", pengeluaran(rows3)[1]);
                        cetak("penjualan", penjualan(rows2)[1]);
                        cetak("pembelian", pembelian(rows1)[1]);

                        //waktunya memproses tabel total
                        loadKeseluruhan([pembelian(rows1),penjualan(rows2),pengeluaran(rows3)])
                    });
                });
            });
        }else{
            let query1 = `select *, harga_pembelian / qty_pembelian as nominal_pembelian from pembelianIkan`;
            db.all(query1,async (err, rows1) => {
                let query2 = `select *, harga_penjualan * Qty_penjualan as jumlah_penjualan from penjualanIkan`
                db.all(query2,async (err, rows2) => {
                    let query3 = `select *, harga * qty as jumlah from pengeluaran`
                    db.all(query3,async (err, rows3) => {

                        console.log(keyword)
                        // console.log(rows1, rows2, rows3)
                        //waktunya mengeprint tabel 3
                        cetak("pengeluaran", pengeluaran(rows3)[1], keyword);
                        cetak("penjualan", penjualan(rows2)[1], keyword);
                        cetak("pembelian", pembelian(rows1)[1], keyword);

                        //waktunya memproses tabel total
                        loadKeseluruhan([pembelian(rows1),penjualan(rows2),pengeluaran(rows3)], keyword)
                    });
                });
            });
        }
    })

    return dt
}

function loadCashflow(keyword){
    semua(keyword)
}