import { tweetsData } from "./data.js";

import {v4 as uuidv4} from 'https://jspm.dev/uuid';
console.log(uuidv4());

const tweetInput = document.getElementById("tweet-input");
const feed = document.getElementById("feed");



//all events of the click will be under the document

document.addEventListener("click", (e) => {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick();
  }
});

function handleLikeClick(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];

  targetTweetObj.isLiked = !targetTweetObj.isLiked;
  targetTweetObj.isLiked ? targetTweetObj.likes++ : targetTweetObj.likes--;

  render();
}

function handleRetweetClick(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];

  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
  targetTweetObj.isRetweeted ? targetTweetObj.retweets++ : targetTweetObj.retweets--;

  render();
}

function handleReplyClick(tweetId) {
  const repliesSection = document.getElementById(`replies-${tweetId}`);
  repliesSection.classList.toggle("hidden");
}
function handleTweetBtnClick() {
    console.log(tweetInput.value);

    //the tweet object
    if(tweetInput.value === ''){
         return alert('Please enter a tweet')
    }   
    else if(tweetInput.value.length ) {
        tweetsData.unshift({
            handle: `@Geoffrey`,
            profilePic: `images/me.png`,
            likes: 0,
            retweets: 0,
            tweetText: `${tweetInput.value}`,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        }
        )
    }
  
    render();
    tweetInput.value = ''
   
}

function getFeedHtml() {
  let tweetHtml = ``;
  tweetsData.forEach(function (tweet) {
    let iconClass = tweet.isLiked ? "liked" : "";
    let retweetIconClass = tweet.isRetweeted ? "retweeted" : "";
    let repliesHtml = "";

    if (tweet.replies.length > 0) {
      tweet.replies.forEach(function (reply) {
        repliesHtml += `
          <div class="tweet-reply">
            <img src="${reply.profilePic}" class="profile-pic">
            <div>
              <p class="handle">${reply.handle}</p>
              <p class="tweet-text">${reply.tweetText}</p>
            </div>
          </div>
        `;
      });
    }

    tweetHtml += `
      <div class="tweet">
        <div class="tweet-inner">
          <img src="${tweet.profilePic}" alt="profile-pic" class="profile-pic">
          <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
              <div class="tweet-detail">
                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                <span>${tweet.replies.length}</span>
              </div>
              <span class="tweet-detail">
                <i class="fa-solid fa-heart ${iconClass}" data-like="${tweet.uuid}"></i>
                <span>${tweet.likes}</span>
              </span>
              <span class="tweet-detail">
                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                <span>${tweet.retweets}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="hidden" id="replies-${tweet.uuid}">
          ${repliesHtml}
        </div>
      </div>
    `;
  });
  return tweetHtml;
}

function render() {
  feed.innerHTML = getFeedHtml();
}

render();
