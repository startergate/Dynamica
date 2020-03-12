setInterval(async _ => {
  document.getElementById('current').classList.add('hide');

  await setTimeout(_ => {

  })
}, 1000);

const whichTransitionEvent = _ => {
  const el = document.getElementById('current');
  const transitions = {
    'transition':'transitionend',
    'OTransition':'oTransitionEnd',
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd'
  };

  for (let t in transitions){
    if(el.style[t] !== undefined){
      return transitions[t];
    }
  }
};

element.addEventListener(whichTransitionEvent(), _ => {

});