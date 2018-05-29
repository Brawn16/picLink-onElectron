const { app, BrowserWindow } = require("electron");
const path = require("path");
let mainWindow;


app.on("ready", () => {
  mainWindow = new BrowserWindow({
    show: false
  });

  
  //mainWindow.loadURL(path.join("file://", __dirname, "index.html"));
  mainWindow.loadURL('http://localhost:3000');
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
});