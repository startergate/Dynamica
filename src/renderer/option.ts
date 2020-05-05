import { ipcRenderer } from 'electron';

const submitBtn = document.getElementById('submit');
const addBtn = document.getElementById('add');

const removeBtnCallback = (event: MouseEvent) => {
  console.log(event.target);
};

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
  const reference = target.children[target.childElementCount - 1];
  const copied = reference.cloneNode(true);
  target.appendChild(copied);
});
