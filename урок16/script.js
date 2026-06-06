const changeTextBtn = document.getElementById('changeTextBtn');
changeTextBtn.onclick = function() {
    this.textContent = 'Нажата!';
};

/*-------------*/

const resizeElement = document.getElementById('resizeElement');
resizeElement.onmouseover = function() {
    this.style.width = '200px';
    this.style.height = '200px';
};
resizeElement.onmouseout = function() {
    this.style.width = '100px';
    this.style.height = '100px';
};

/*----------------*/

const keyupInput = document.getElementById('keyupInput');
keyupInput.onkeyup = function(e) {
    console.log('Отпущена клавиша:', e.key);
};

/*-----------------*/
const testForm = document.getElementById('testForm');
testForm.onsubmit = function(e) {
    e.preventDefault();
    alert('Форма успешно отправлена!');
};

/*-------------------*/

const themeBtn = document.getElementById('themeBtn');
themeBtn.onclick = function() {
    document.body.classList.toggle('dark');
};