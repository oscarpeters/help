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
  var i = this.loopNum % this.toRotate.length; // go to next word on incrementing i
  var fullTxt = this.toRotate[i];
  
  // Check deleting status, either adding or removing text
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  
  // Actually setting the text
  this.el.innerHTML = '<span class="wrap" style="color: aliceblue;">'+ this.txt +'</span>';
  
  // Misc variables
  var that = this;
  var delta = 95 - Math.random() * 40;
  
  // Delete twice as fast
  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) { /* if all typed */
    delta = this.period; /* wait for this.period */
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') { /* if all deleted */
    this.isDeleting = false;
    this.loopNum++; // next word
    delta = 500; /* wait for a set 500ms */
  }
  
  // Start the loop again
  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var element = document.getElementById('txt-rotate');
  var toRotate = element.getAttribute('data-rotate'); // truthy if not blank
  var period = element.getAttribute('data-period');
  if (toRotate) {
    new TxtRotate(element, JSON.parse(toRotate), period);
  }
}