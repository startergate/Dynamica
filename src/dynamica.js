import { ipcRenderer } from 'electron';

const current = document.getElementById('current');
const next = document.getElementById('next');

const whichTransitionEvent = _ => {
  const transitions = {
    'transition':'transitionend',
    'OTransition':'oTransitionEnd',
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd'
  };

  for (let t in transitions){
    if(current.style[t] !== undefined){
      return transitions[t];
    }
  }
};

current.addEventListener(whichTransitionEvent(), _ => {
  current.setAttribute('src', next.getAttribute('src'));
  current.classList.remove('hide');
});

ipcRenderer.on('change-image', (event, path) => {
  next.setAttribute('src', path);
  current.classList.add('hide');
});
