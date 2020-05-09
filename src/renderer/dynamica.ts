import { ipcRenderer } from 'electron';
import IpcRendererEvent = Electron.IpcRendererEvent;

const current = document.getElementById('current');
const skipButton = document.getElementById('skipThisImage');
const settingButton = document.getElementById('settingTab');

ipcRenderer.on('change-image', (event: IpcRendererEvent, path: any) => {
  current.style.backgroundImage = path;
});

skipButton.addEventListener('click', () => {
  ipcRenderer.send('change-image', 'skip')
});

settingButton.addEventListener('click', () => {
  window.open('', 'option');
});
