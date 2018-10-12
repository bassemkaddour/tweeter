// Updates the character counter based on how much the user has typed.

$(document).ready(function() {

  const textIn = document.querySelector('.tweet-text');

  $(textIn).on('keyup', function(event) {
    const charCount = this.value.length;
    const count = this.parentNode.querySelector('.counter');
    count.innerText = 140 - charCount;

    //Adds class to turn character counter red when it falls below 0
    if (charCount > 140) {
      $(count).addClass('error-num');
    } else if ($(count).hasClass('error-num')){
      $(count).removeClass('error-num');
    }
  });

});
