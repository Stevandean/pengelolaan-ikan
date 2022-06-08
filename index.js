const electron = require('electron')
const db = require ('./config/database/db_config')
const {app, BrowserWindow, ipcMain, screen, webContents} = electron
const remote = require('@electron/remote/main')
remote.initialize()

let mainWindow 
let pengeluaranWindow
let penjualanIkanWindow 
let pembelianIkanWindow
let cashflowWindow
let laporanWindow

mainWin = () => {
    mainWindow = new BrowserWindow ({
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