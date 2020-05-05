import { ipcRenderer } from 'electron';
import Event = Electron.Event;

const submitBtn = document.getElementById('submit');
const addBtn = document.getElementById('add');
const template = document.getElementsByClassName('schedule')[0]

const removeEventListener = (event: Event) => {
  event.preventDefault();
  const target = <Element> event.currentTarget
  document.getElementById('originValue').removeChild(target.parentElement.parentElement);
}

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const targetTable = document.getElementById('originValue');
  const originValues = targetTable.getElementsByClassName('schedule');
  for (const value of originValues) {
    console.log(value);
  }
  ipcRenderer.send('update-setting', 'something');
});

addBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let target = document.getElementById('originValue');
  const n = template.cloneNode(true);
  let copied: Element = <Element> n;
  copied.children[2].children[0].addEventListener('click', removeEventListener);
  target.appendChild(copied);
});
