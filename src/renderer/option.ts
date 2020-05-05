import { ipcRenderer } from 'electron';

const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', (event) => {
  event.preventDefault()
  const targetTable = document.getElementById('originValue');
  const originValues = targetTable.getElementsByClassName('schedule');
  for (const value of originValues) {
    console.log(value);
  }
  ipcRenderer.send('update-setting', 'something');
})