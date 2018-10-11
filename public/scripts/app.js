/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('.new-tweet').slideToggle(0);

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
    const $createdAtParagraph = $("<p>").addClass("created-at").text(tweet.created_at);

    const $iconsFlag = $("<img>").addClass("icon").attr("src", "/images/bird.png");
    const $iconsRetweet = $("<img>").addClass("icon").attr("src", "/images/bird.png");
    const $iconsHeart = $("<img>").addClass("icon").attr("src", "/images/bird.png");

    const $iconSpan = $("<span>").append($iconsFlag).append($iconsRetweet).append($iconsHeart);

    const $footer = $("<footer>").append($createdAtParagraph).append($iconSpan);

    const $container = $("<article>").addClass('tweets').append($header).append($main).append($footer);

    return $container;
  }

  function renderTweets(tweetArray) {
    $('#tweet-container').empty();
    const container = $('#tweet-container');
    for (const tweet of tweetArray) {
      container.prepend(createTweetElement(tweet));
    }
  }

  function loadTweets() {
    $.ajax('/tweets', {
      method: 'GET'
    }).then((tweetData) => {
      renderTweets(tweetData)
    });
  }

  loadTweets();

  $('.new-tweet form').on('submit', (e) => {
    e.preventDefault();
    $('.error').hide();

    if ($('.tweet-text').val().length > 140) {
      $('.error').text('Please keep it under 140 characters.').slideDown('slow');
      return;
    } else if ($('.tweet-text').val().length === 0) {
      $('.error').text('Please enter a tweet').slideDown('slow');

      // $('.error')
      //   .slideUp('fast', function() {
      //     $(this).text('Please enter a tweet.')
      //   }).slideDown('slow') ;
      return;
    }

    let data = $(e.target).serialize();

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


  $('.compose-button').on('click', (e) => {
    $('.new-tweet').slideToggle(550);
    $('.tweet-text').focus();
  });

});

