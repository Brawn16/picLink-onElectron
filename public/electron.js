const { app, BrowserWindow, Menu, MenuItem } = require("electron");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");
const notifier = require("node-notifier");

let mainWindow;
//create app menu



let mainMenu = Menu.buildFromTemplate(require("./menu.js"));

const autoUpdater = require("electron-updater").autoUpdater;



function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,

    resizable: false,
    icon: __dirname + "/img/logo.png"
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
  initAutoUpdate();

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

function initAutoUpdate() {
  if (isDev) {
    return;
  }

  if (process.platform === "linux") {
    return;
  }

  autoUpdater.checkForUpdates();
  autoUpdater.signals.updateDownloaded(showUpdateNotification);
}

function showUpdateNotification(it) {
  it = it || {};
  const restartNowAction = "Restart now";

  const versionLabel = it.label
    ? `Version ${it.version}`
    : "The latest version";

  notifier.notify(
    {
      title: "A new update is ready to install.",
      message: `${versionLabel} has been downloaded and will be automatically installed after restart.`,
      closeLabel: "Okay",
      actions: restartNowAction
    },
    function (err, response, metadata) {
      if (err) throw err;
      if (metadata.activationValue !== restartNowAction) {
        return;
      }
      autoUpdater.quitAndInstall();
    }
  );
}

app.on("ready", () => {
  createWindow();
  Menu.setApplicationMenu(mainMenu);
});

app.on('before-quit', () => {
  console.log('App is about to quit.!');
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
