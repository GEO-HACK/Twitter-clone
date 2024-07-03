import { tweetsData } from "./data.js";

const tweetBtn = document.getElementById("tweet-btn");
const tweetInput = document.getElementById("tweet-input");
const feed = document.getElementById("feed");

tweetBtn.addEventListener("click", () => {
  console.log(tweetInput.value);
  tweetInput.value = "";
});
document.addEventListener("click", (e) => {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like);
    }
  
});

function handleLikeClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId;
    })[0]
    targetTweetObj.likes += 1;
    
    render();

    }
 


 

function getFeedHtml() {
  let tweetHtml = ``;
  tweetsData.forEach(function (tweet) {
    tweetHtml += `
          <div class = "tweet">
              <div class = "tweet-inner">
                   <img src = "${tweet.profilePic}" alt = "profile-pic" class = "profile-pic">
                   <div>
                       <p class = "handle">${tweet.handle}</p>
                       <p class = "tweet-text">${tweet.tweetText}</p>
                       <div class = "tweet-details">
                            <div class = "tweet-detail">

                               <i class="fa-regular fa-comment-dots" data-reply='${tweet.uuid}'></i>   
                                <span>${tweet.replies.length}</span>
                                </div>
                            <span class = "tweet-detail">
                                <i class="fa-solid fa-heart" data-like='${tweet.uuid}'></i>
                                <span>${tweet.likes}</span>
                                </span>

                            <span class = "tweet-detail">
                                <i class="fa-solid fa-retweet" data-retweet='${tweet.uuid}'></i>

                                <span>${tweet.retweets}</span>
                                </span>
                                </div>
                                </div>
                                </div>
                                </div>
                                `;
   
  });
  return tweetHtml;
}

function render(){
    
    feed.innerHTML = getFeedHtml();
   

}
render();
