/* Client-side JS logic */

$(document).ready(function() {
  $('.new-tweet').hide();


  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  //creates the html structured tweet element
  function createTweetElement(tweet) {


    //header elements

    const $img = $("<img>").addClass("tweeter-img").attr("src", tweet.user.avatars.small);
    const $h2name = $("<h2>").text(tweet.user.name);
    const $handle = $("<span>").addClass("handle").text(tweet.user.handle);
    const $header = $("<header>").append($img).append($h2name).append($handle);


    // main elements

    const $paragraph = $("<p>").addClass("tweet-body").text(tweet.content.text);
    const $main = $("<main>").append($paragraph);

    // footer elements
    const $createdAtParagraph = $("<p>").addClass("created-at").text(moment(tweet.created_at).startOf('minute').fromNow());

      // icons
    const $iconsFlag = $("<i>").addClass("icon flag").attr("data-feather", "flag");
    const $iconsRetweet = $("<i>").addClass("icon repeat").attr("data-feather", "repeat");
    const $iconsHeart = $("<i>").addClass("icon heart").attr("data-feather", "heart");

    const $iconSpan = $("<span>").append($iconsHeart).append($iconsRetweet).append($iconsFlag);

    const $footer = $("<footer>").append($createdAtParagraph).append($iconSpan);

    //put all elements in the article tag
    const $container = $("<article>").addClass('tweets').append($header).append($main).append($footer);

    return $container;
  }

  //Renders new tweets from the mongo database after emptying the existing tweets.
  function renderTweets(tweetArray) {
    $('#tweet-container').empty();
    const container = $('#tweet-container');
    for (const tweet of tweetArray) {
      container.prepend(createTweetElement(tweet));
    }
  }

  //Gets tweets from the database and passes them to renderTweets.
  //Runs replace on the feather icons so they will appear.
  function loadTweets() {
    $.ajax('/tweets', {
      method: 'GET'
    }).then((tweetData) => {
      renderTweets(tweetData)
      feather.replace();
    });
  }

  loadTweets();

  //~~~~~~~~~~~~~~~~~~~~~~~~~~ Event listeners ~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  //New tweet form submission with error handling on tweet length
  $('.new-tweet form').on('submit', (e) => {
    e.preventDefault();
    $('.error').hide();

    if ($('.tweet-text').val().length > 140) {
        $('.error').text('Please keep it under 140 characters.').slideDown('slow');
        return;
    } else if ($('.tweet-text').val().length === 0) {
        $('.error').text('Please enter a tweet').slideDown('slow');
        return;
    }

    const data = $(e.target).serialize();

    $.ajax('/tweets', {
      method: 'POST',
      data: data
    }).then(() => {
      $('.tweet-text').val("");
      $('.counter').text(140);
      $('.new-tweet').slideToggle('slow');
      loadTweets();
    });
  });

  //Toggles compose form and focuses on the text input when it is opened.
  $('.compose-button').on('click', (e) => {
    $('.new-tweet').slideToggle(550, () => {
      $('.tweet-text').focus();
    });
  });
});

