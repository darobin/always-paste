
let hasPaste = null;

window.addEventListener(
  'focus',
  (evt) => {
    let { target } = evt;
    if (!target || target.nodeType !== 1 || target.localName !== 'input' || (target.type !== 'text' && target.type !== 'password')) return;
    // XXX
    //  - show a button next to the input that can be activated to paste
    hasPaste = attachButton(target);
    document.body.appendChild(hasPaste);
  },
  true
);

window.addEventListener(
  'blur',
  (evt) => {
    console.log(`blur`, hasPaste);
    if (!hasPaste) return;
    let { target } = evt;
    if (!target || target.nodeType !== 1 || target.localName !== 'input' || (target.type !== 'text' && target.type !== 'password')) return;
    // XXX
    //  - remove the button next to force paste
    hasPaste.parentNode.removeChild(hasPaste);
    hasPaste = null;
  },
  true
);

window.addEventListener(
  'click',
  (evt) => {
    console.log(`click`, hasPaste);
    if (!hasPaste) return;
    let { target } = evt;
    if (hasPaste === target) console.log(`MATCH!`);
    console.log('clicked...');
  },
  false
);

function handlePaste () {
  console.log(`click`);
  // XXX
  //  - write clipboard straight to the value
}

function attachButton (target) {
  if (!target) return;
  let but = document.createElement('button')
    , { top, left, height, width } = target.getBoundingClientRect()
  ;
  let right = left + width - height;
  setStyle(but, {
    position:   'absolute',
    width:      `${height}px`,
    height:     `${height}px`,
    top:        `${top}px`,
    left:       `${right}px`,
    margin:       0,
    padding:      0,
    background:   '#00f',
    border:       'none',
  });
  // but.onclick = handlePaste;
  return but;
}

function setStyle (el, props) {
  Object.keys(props).forEach(k => el.style[k] = props[k]);
}
