const electron = require('electron')
const db = require ('./config/database/db_config')
const {app, BrowserWindow, ipcMain, screen, webContents} = electron
const remote = require('@electron/remote/main')
const rmt = require('electron').remote; // hapusss bila tidak digunakan
const ipc = ipcMain
remote.initialize()
let dir = [__dirname,__filename];

let mainWindow 
let pengeluaranWindow
let penjualanIkanWindow 
let pembelianIkanWindow
let cashflowWindow
let laporanWindow
let editDataModal


mainWin = () => {
    mainWindow = new BrowserWindow ({
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation:false
        },
        height: 550,
        resizable: false,
        title: 'Pengelolaan-Ikan',
        autoHideMenuBar: true
    })

    mainWindow.loadFile('index.html')
    db.serialize( () => {
        console.log('berhasil')
    })
}

// Untuk Close
ipcMain.on('close:window', () => {
    console.log("test untuk close 2")
    close()
})

// Untuk Minimize
ipcMain.on ('minimize:window', () => {
    minimize()
})

function minimize(){
    mainWindow.minimize()    
}

function close(){
    // let window = rmt.getCurrentWindow();
    // window.close(); 
    app.quit(); 
    // console.log(remote)
}

app.on('ready', () => {
    mainWin ()
})

//WINDOW PENGELUARAN
ipcMain.on('load:pengeluaran-window', () => {
    pengeluaranWin()
})

pengeluaranWin = () => {

const {height, width} = screen.getPrimaryDisplay().workAreaSize

    pengeluaranWindow = new BrowserWindow({
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation:false
        },
        autoHideMenuBar:true,
        height:height,
        width:width,
        resizable:false,
        title: 'SK4WAN KOI | Pengeluaran'
    })

    remote.enable(pengeluaranWindow.webContents)

    pengeluaranWindow.loadFile('windows/pengeluaran.html')
    pengeluaranWindow.webContents.on('did-finish-load', () => {
        mainWindow.hide()
    })


    pengeluaranWindow.on('close', () => {
        mainWindow.show()
    })

}

//WINDOW PENJUALAN IKAN
ipcMain.on('load:penjualanIkan-window', () => {
    penjualanIkanWin()
})

penjualanIkanWin = () => {

const {height, width} = screen.getPrimaryDisplay().workAreaSize

    penjualanIkanWindow = new BrowserWindow({
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation:false
        },
        autoHideMenuBar:true,
        height:height,
        width:width,
        resizable:false,
        title: 'SK4WAN KOI | Penjualan Ikan'
    })

    remote.enable(penjualanIkanWindow.webContents)

    penjualanIkanWindow.loadFile('windows/penjualanIkan.html')
    penjualanIkanWindow.webContents.on('did-finish-load', () => {
        mainWindow.hide()
    })


    penjualanIkanWindow.on('close', () => {
        mainWindow.show()
    })

}

//WINDOW PEMBELIAN IKAN
ipcMain.on('load:pembelianIkan-window', () => {
    pembelianIkanWin()
})

pembelianIkanWin = () => {

const {height, width} = screen.getPrimaryDisplay().workAreaSize

    pembelianIkanWindow = new BrowserWindow({
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation:false
        },
        autoHideMenuBar:true,
        height:height,
        width:width,
        resizable:false,
        title: 'SK4WAN KOI | pembelian Ikan'
    })

    remote.enable(pembelianIkanWindow.webContents)

    pembelianIkanWindow.loadFile('windows/pembelianIkan.html')
    pembelianIkanWindow.webContents.on('did-finish-load', () => {
        mainWindow.hide()
    })


    pembelianIkanWindow.on('close', () => {
        mainWindow.show()
    })

}

//WINDOW CASH FLOW
ipcMain.on('load:cashflow-window', () => {
    cashflowWin()
})

cashflowWin = () => {

const {height, width} = screen.getPrimaryDisplay().workAreaSize

    cashflowWindow = new BrowserWindow({
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation:false
        },
        autoHideMenuBar:true,
        height:height,
        width:width,
        resizable:false,
        title: 'SK4WAN KOI | cashflow'
    })

    remote.enable(cashflowWindow.webContents)

    cashflowWindow.loadFile('windows/cashflow.html')
    cashflowWindow.webContents.on('did-finish-load', () => {
        mainWindow.hide()
    })


    cashflowWindow.on('close', () => {
        mainWindow.show()
    })

}

//WINDOW LAPORAN
ipcMain.on('load:laporan-window', () => {
    laporanWin()
})

laporanWin = () => {

const {height, width} = screen.getPrimaryDisplay().workAreaSize

    laporanWindow = new BrowserWindow({
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation:false
        },
        autoHideMenuBar:true,
        height:height,
        width:width,
        resizable:false,
        title: 'SK4WAN KOI | laporan'
    })

    remote.enable(laporanWindow.webContents)

    laporanWindow.loadFile('windows/laporan.html')
    laporanWindow.webContents.on('did-finish-load', () => {
        mainWindow.hide()
    })


    laporanWindow.on('close', () => {
        mainWindow.show()
    })

}

// Modal Edit Pengeluaran
editData = (docId, modalForm, modalWidth, modalHeight, rowId) => {
    let parentWin
    switch (docId) {
        case 'pengeluaran-data':
            parentWin = pengeluaranWindow
            break;
        case 'penjualan-data' :
            parentWin = penjualanIkanWindow
            break;
        case 'pembelian-data' :
            parentWin = pembelianIkanWindow
            break;
    }
    editDataModal = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        width: modalWidth,
        height: modalHeight,
        resizable: true,
        maximizable: false,
        minimizable: false,
        parent: parentWin,
        modal: true,
        title: 'Edit Data',
        autoHideMenuBar: true
    })
    remote.enable(editDataModal.webContents)
    editDataModal.loadFile('modals/edit-data.html')
    editDataModal.webContents.on('did-finish-load', () => {
        editDataModal.webContents.send('res:form', docId, modalForm, rowId)
    })
    editDataModal.on('close', () => {
        editDataModal = null
    })
}

ipcMain.on('load:edit', (e, msgDocId, msgForm, msgWidth, msgHeight, msgRowId) => {
    editData(msgDocId, msgForm, msgWidth, msgHeight, msgRowId)
})

ipcMain.on('update:success',  (e, msgDocId) => {
    switch(msgDocId) {
        case 'pengeluaran-data' :
            pengeluaranWindow.webContents.send('update:success', 'Sukses Update Data Pengeluaran')
            break;
        case 'penjualan-data' :
            penjualanIkanWindow.webContents.send('update:success', 'Sukses Update Data Penjualan')
            break;
        case 'pembelian-data' :
            pembelianIkanWindow.webContents.send('update:success', 'Sukses Update Data Pembelian')
            break;
    }
    editDataModal.close()
})

ipcMain.on("close:data", (e, docId) => {
    switch(docId) {
        case 'pengeluaran-data' :
            pengeluaranWindow.close()
            break;
        case 'penjualan-data' :
            penjualanIkanWindow.close()
            break;
        case 'pembelian-data' :
            pembelianIkanWindow.close()
            break;
        case 'cashflow-data' :
            cashflowWindow.close()
            break;
        case 'laporan-data' : 
        laporanWindow.close()
    }
})

ipcMain.on ("minimize:data", (e, id) => {
    switch (id) {
        case 'pengeluaran-data':
            pengeluaranWindow.minimize()
            break;
        case 'penjualan-data' :
            penjualanIkanWindow.minimize()
            break;
        case 'pembelian-data' :
            pembelianIkanWindow.minimize()
            break;
        case 'cashflow-data' :
            cashflowWindow.minimize()
            break;
        case 'laporan-data' :
            laporanWindow.minimize()
        }
})