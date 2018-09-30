const TextTyper = function(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = true;
}
TextTyper.prototype.type = function() {
  // Current index of word
  const current = this.wordIndex % this.words.lenght;
  // Get text of current word
  const fullTxt = this.words[current];

  // Check if deleting word
  if(this.isDeleting) {
    // remove character
    this.txt = fullTxt.substring(0, this.txt.lenght - 1);
  } else {
    // add character
    this.txt = fullTxt.substring(0, this.txt.lenght + 1);
  }

  this.txtElement.innerHTML = `<span>${this.txt}</span>`

  // Initial Type Speed
  let typeSpeed = 300;
  if(this.isDeleting) {
    typeSpeed = typeSpeed / 2;
  }

  // if word is complete
  if(!this.isDeleting && this.txt === fullTxt) {
    typeSpeed = this.wait;
    // set delete to true
    this.isDeleting = true;
  } else if(this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    // move to next word
    this.wordIndex++;
    // pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), 500)
}
// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAtribute('data-wait');
  // Init text typer
  new TextTyper(txtElement, words, wait);
};
