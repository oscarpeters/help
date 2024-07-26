function TextWriter() {
  this.words = ['We zijn online', 'WhatsApp', 'Telefonisch'];
  this.index = 0;
  this.text = '';
  this.element = document.getElementsByClassName('content')[0];
  this.timeType = 90;
  this.timeDelete = 50;
  this.timeAwait = 5000;
  this.isDeleting = false;
}

TextWriter.prototype.typetype = function () {
  let idx = this.index % this.words.length;
  let currWord = this.words[idx];
  let speed = this.timeType;

  if (this.isDeleting) {
    speed = this.timeDelete;
    this.text = currWord.substring(0, this.text.length - 1);

    // Check if the text length is 0 and add a non-breaking space if so
    if (this.text.length === 0) {
      this.element.innerHTML = `<span class="text">&nbsp;</span>`;
      speed = 1000;
      this.isDeleting = false;
      this.index = (this.index + 1) % this.words.length;
    } else {
      this.element.innerHTML = `<span class="text">${this.text}</span>`;
    }
  } else {
    this.text = currWord.substring(0, this.text.length + 1);

    if (this.text === currWord) {
      speed = this.timeAwait;
      this.isDeleting = true;
    }

    this.element.innerHTML = `<span class="text">${this.text}</span>`;
  }

  setTimeout(() => this.typetype(), speed);
}


document.addEventListener('DOMContentLoaded', init);

function init() {
  window.TextWriter = TextWriter;
  const t = new TextWriter();
  t.typetype();
}

