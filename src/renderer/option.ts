import { ipcRenderer } from 'electron';

const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', () => {
  ipcRenderer.send('update-setting', 'something');
})