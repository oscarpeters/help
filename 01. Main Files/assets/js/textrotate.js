var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 900;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  // Check if we need to add a newline based on screen width
  if (window.innerWidth < 500 && !fullTxt.startsWith('\n')) {
    fullTxt = '\n' + fullTxt;
    this.toRotate[i] = fullTxt; // update the array to prevent adding newline again
  }

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Handle newline character for display
  var displayTxt = this.txt.replace(/\n/g, '<br>');

  this.el.innerHTML = '<span class="wrap" style="color: aliceblue;">' + displayTxt + '</span>';

  var that = this;
  var delta = 95 - Math.random() * 40;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var element = document.getElementById('txt-rotate');
  var toRotate = element.getAttribute('data-rotate');
  var period = element.getAttribute('data-period');
  if (toRotate) {
    new TxtRotate(element, JSON.parse(toRotate), period);
  }
}
