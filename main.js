const { app, BrowserWindow, globalShortcut } = require('electron')
const config = require('./config')

let win;

function createWindow () {
    win = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // In the config.js file, you can change the host or include a index file (if you change to index.html in config.js, you will have to change 'loadURL' to 'loadFile')
  win.loadURL(config.url)
}

function toggleDevTools(){
    win.webContents.toggleDevTools()
}

function createShortcuts(){
    globalShortcut.register('CmdOrCtrl+J', toggleDevTools)
    globalShortcut.register('f12', toggleDevTools)
}

app.whenReady().then(createWindow).then(createShortcuts)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
