/*
Use this command in your terminal to set your credentials and run the script
`CONSUMER_KEY=xxx CONSUMER_SECRET=xxx ACCESS_TOKEN_KEY=xxx
ACCESS_TOKEN_SECRET=xxx node index.js` (all one line)
To get credentials, go here: https://apps.twitter.com
*/

// Modules used to get and parse tweets
var Twitter = require('twitter')
var getUrls = require('get-urls')
var Tweets = require('./lib/helpers/tweets')

// Modules used to start a server and display the links from the tweets
var Hapi = require('hapi')
var Handlebars = require('handlebars')
var Inert = require('inert')
var Vision = require('vision')

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
function storeUrls (tweets) {
  var urls = []

  tweets.forEach(function (tweet) {
    getUrls(tweet.text).forEach(function (url) {
      urls.push(url)
    })
  })

  return urls
}

function listTweets (request, reply) {
  var tweets = Tweets.get(client, 'statuses/user_timeline', params)

  // Extract the links from all the tweets received and send them to
  // the index.html template to be displayed
  tweets.then(storeUrls)
    .then(function (urls) {
      reply.view('index', {tweets: urls, account: process.env.ACCOUNT_NAME})
    })
    .catch(function (err) {
      console.log(err)
      process.exit(1)
    })
}

// Setup a Hapi Server that will allow us to display a webpage of all
// the links taken from the tweets we've received
var server = new Hapi.Server()

server.connection({port: 4444})

server.register(Inert, function (err) {
  if (err) {
    console.log(err)
  }
})

server.register(Vision, function (err) {
  if (err) {
    console.log(err)
  }
})

server.views({
  engines: {
    html: Handlebars
  },
  path: './templates'
})

server.route({
  method: 'GET',
  path: '/',
  handler: listTweets
})

server.start(function () {
  console.log('View your links here: ' + server.info.uri)
})
