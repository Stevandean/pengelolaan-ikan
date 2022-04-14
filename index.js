const electron = require('electron')
const db = require ('./config/database/db_config')
const {app, BrowserWindow, ipcMain, screen} = electron
app.allowRenderProcessReuse =true

let mainWindow 
let pengeluaranWindow
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

    pengeluaranWindow.loadFile('windows/pengeluaran.html')
    pengeluaranWindow.webContents.on('did-finish-load', () => {
        mainWindow.hide()
    })


    pengeluaranWindow.on('close', () => {
        mainWindow.show()
    })

}
