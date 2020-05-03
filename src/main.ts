import * as path from 'path';
import * as fs from 'fs';

// Modules to control application life and create native browser window
import { app, BrowserWindow, ipcMain, IpcMainEvent, screen } from 'electron';

import { getImage, reinitialize } from "./utils/image";
import { settingFile } from "./utils/initialize";

let window: BrowserWindow;
let option: BrowserWindow;

const imageSender = () => {
  const path = getImage();
  if (path) window.webContents.send('change-image', path);
};

const settingUpdater = (event: IpcMainEvent, args: any) => {
  try {
    const setting = JSON.parse(args);
    fs.writeFileSync(settingFile + 'TODO: Setting link', setting);
    console.log(args);
    reinitialize();
  } catch (e) {
    event.returnValue = new Error('Invalid Input Value');
  }
};

const createWindow = async () => {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  window = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });

  // set full screen
  window.setFullScreen(true);
  window.setMenu(null);

  // and load the index.html of the app.
  await window.loadFile('./build/static/index.html');

  // Open the DevTools.
  window.webContents.openDevTools();

  // setup initializer
  window.webContents.on('did-finish-load', () => {
    window.webContents.on('new-window', async (event, url, frameName, disposition, options) => {
      if (frameName === 'option') {
        event.preventDefault();
        Object.assign(options, {
          modal: true,
          parent: window,
          width: 100,
          height: 100
        });
        option = new BrowserWindow(options)
        await option.loadFile('./build/static/option.html');
      }
    });
    imageSender();
  });

  // set image setting
  ipcMain.on('update-setting', settingUpdater);

  // set interval to update background
  setInterval(imageSender, 60000);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
