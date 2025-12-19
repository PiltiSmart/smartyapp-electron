const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 430, // iPhone 16 Pro screen width
    height: 926, // iPhone 16 Pro screen height
    webPreferences: {
      nodeIntegration: false, // Important for security
      preload: path.join(__dirname, 'preload.js') // Preload script
    },
    frame: true, // Window with header
    resizable: false, // Disable resizing
    title: 'Smarty App - Your SMART Application',
    titleBarStyle: 'default' // Native title bar look
  });

  // Load the mobile-optimized website
  mainWindow.loadURL('https://smartyapp.piltismart.com/');

  // Handle window closed event
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Recreate a window in the app when the dock icon is clicked (macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
