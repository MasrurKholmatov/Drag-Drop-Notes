var btn = document.getElementById('newnote');
var board = document.getElementById('board');

var notes = [];
var z = 1;

function data() {

  var randX = Math.floor(Math.random() * 1000);
  var randY = Math.floor(Math.random() * 500);

  var rotate = Math.floor(Math.random() * 20);

  var red = Math.floor(Math.random() * 138);
  var green = Math.floor(Math.random() * 191);
  var blue = Math.floor(Math.random() * 209);

  var noteObj = {
    noteText: 'Add your note',
    posX: randX,
    posY: randY,
    transformNote: rotate,
    r: red,
    g: green,
    b: blue
  }

  notes.push(noteObj);
  console.log(notes);
  createNote();
}


function generateNote(noteText, posX, posY, transformNote, r, g, b, index, arr) {

  var noteDiv = document.createElement('div');
  noteDiv.className = 'note';
  noteDiv.style.left = posX + 'px';
  noteDiv.style.top = posY + 'px';

  noteDiv.onclick = function(e) {
    if (e.target.tagName === 'div') {
      console.log(e.target.textContent);
    }
    console.log(e.target.tagName);
  }

  var deltaX, deltaY;

  function getMouse(e) {
    var cX = e.clientX;
    var cY = e.clientY;
    var pX = e.pageX;
    var pY = e.pageY;
    noteDiv.style.left = (pX - deltaX) + 'px';
    noteDiv.style.top = (pY - deltaY) + 'px';
  }

  noteDiv.onmousedown = function(e) {
    var offTop = noteDiv.offsetTop;
    var offLeft = noteDiv.offsetLeft;
    var mX = e.pageX;
    var mY = e.pageY;
    deltaX = mX - offLeft;
    deltaY = mY - offTop;
    window.addEventListener('mousemove', getMouse);
  }

  noteDiv.onmouseup = function(e) {

    noteDiv.onclick = function() {
      noteDiv.style.zIndex = ++z;
    };
    window.removeEventListener('mousemove', getMouse);
  }

  var innerDiv = document.createElement('div');
  innerDiv.textContent = noteText;

  var delBtn = document.createElement('button');
  delBtn.textContent = 'x';
  delBtn.className = 'delbtn';

  delBtn.onclick = function() {
    arr.splice(index, 1);
    createNote();
  }

  noteDiv.appendChild(delBtn);

  var textarea = document.createElement('textarea');

  noteDiv.appendChild(innerDiv);

  innerDiv.ondblclick = function() {
    innerDiv.style.display = "none";
    textarea.style.display = "block";
    textarea.value = innerDiv.textContent;
  }

  textarea.ondblclick = function() {
    innerDiv.style.display = "block";
    textarea.style.display = "none";
    arr[index].noteText = textarea.value;
    innerDiv.textContent = textarea.value;
  }

  noteDiv.style.transform = 'rotate(' + transformNote + 'deg)';

  noteDiv.style.background = 'rgb(' + r + ',' + g + ',' + b + ')';

  noteDiv.appendChild(textarea);
  board.appendChild(noteDiv);

}


function createNote() {
  board.innerHTML = '';
  notes.map(function(item, index, arr) {
    generateNote(item.noteText, item.posX, item.posY, item.transformNote, item.r, item.g, item.b, index, arr);
  });

}

btn.onclick = data;
