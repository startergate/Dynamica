import { ipcRenderer } from 'electron';
import IpcRendererEvent = Electron.IpcRendererEvent;

const current = document.getElementById('current');
const next = document.getElementById('next');
const skipButton = document.getElementById('skipThisImage');
const settingButton = document.getElementById('settingTab');

current.addEventListener('transitionend', () => {
  current.setAttribute('src', next.getAttribute('src'));
  current.classList.remove('hide');
});

ipcRenderer.on('change-image', (event: IpcRendererEvent, path: any) => {
  next.setAttribute('src', path);
  current.classList.add('hide');
});

skipButton.addEventListener('click', () => {
  ipcRenderer.send('change-image', 'skip')
});

settingButton.addEventListener('click', () => {
  window.open('', 'option');
});
