const electron = require('electron')
const db = require ('./config/database/db_config')
const {app, BrowserWindow, ipcMain, screen, webContents} = electron
const remote = require('@electron/remote/main')
remote.initialize()

let mainWindow 
let pengeluaranWindow
let penjualanIkanWindow 

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
