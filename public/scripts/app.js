/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

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

    // console.log(container);
    return $container;
  }

  function renderTweets(tweetArray) {
    const container = $('#tweet-container');
    for (const tweet of tweetArray) {
      container.append(createTweetElement(tweet));
    }
  }



  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  // Fake data taken from tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];




  renderTweets(data);
  // var $tweet = createTweetElement(tweetData);

  // // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
