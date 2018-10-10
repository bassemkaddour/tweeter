$(document).ready(function() {

  const textIn = document.querySelector('.tweet-text');

  $(textIn).on('keyup', function(event) {
    let charCount = this.value.length;
    let count = this.parentNode.querySelector('.counter');
    count.innerText = 140 - charCount;
    console.log($(this));

    if (charCount > 140) {
      $(count).addClass('error-num');
    } else if ($(count).hasClass('error-num')){
      $(count).removeClass('error-num');
    }
  });

});
