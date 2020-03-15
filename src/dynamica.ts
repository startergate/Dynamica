import { ipcRenderer } from 'electron';
import IpcRendererEvent = Electron.IpcRendererEvent;

const current = document.getElementById('current');
const next = document.getElementById('next');

current.addEventListener('transitionend', () => {
  current.setAttribute('src', next.getAttribute('src'));
  current.classList.remove('hide');
});

ipcRenderer.on('change-image', (event: IpcRendererEvent, path: string) => {
  next.setAttribute('src', path);
  current.classList.add('hide');
});

