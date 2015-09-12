/*
Use this command in your terminal to set your credentials and run the script
`CONSUMER_KEY=xxx CONSUMER_SECRET=xxx ACCESS_TOKEN_KEY=xxx
ACCESS_TOKEN_SECRET=xxx node index.js` (all one line)
To get credentials, go here: https://apps.twitter.com
*/

var Twitter = require('twitter')
var getUrls = require('get-urls')
var Tweets = require('./lib/helpers/tweets')

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

var params = {
  screen_name: process.env.ACCOUNT_NAME,
  count: process.env.TWEET_COUNT, exclude_replies: true, include_rts: false
}

// Get all the URLs in each of the tweets and store them in an array
function storeUrls(tweets) {
  var urls =[];

  tweets.forEach(function (tweet) {
    getUrls(tweet.text).forEach(function(url) {
      urls.push(url)
    })
  })

  return console.log(urls)
}

var tweets = Tweets.get(client, 'statuses/user_timeline', params)
tweets.then(storeUrls).catch(function(err) {
    console.log(err)
    process.exit(1)
})
