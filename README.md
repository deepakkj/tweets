# Tweets

A script to get all the tweets from the [@yourfirstpr](https://twitter.com/yourfirstpr) twitter account

> "But, that's easy! You can do it by doing blahblahbeepboopbleep"

This is an opportunity for me ([@charlotteis](https://twitter.com/charlotteis)) to learn to work with Node.js better, 
as well as use the Twitter API which I haven't done before.

# Pre-requisites

* You must have [node](https://nodejs.org/en/) installed

# How to use

* Download a copy of this repository to your machine
* At the root of the downloaded folder, run `npm install` in your command line/terminal to install all the node packages we need to run this project
* Make sure the following environment variables are set in your terminal:
    * TWEET_COUNT=a number
    * CONSUMER_KEY=your consumer key
    * CONSUMER_SECRET=your secret key
    * ACCESS_TOKEN_SECRET=your secret access token
    * ACCESS_TOKEN_KEY=your access token
    * ACCOUNT_NAME=the twitter name you wish to get the tweets of
    * To get these keys you need to work with the Twitter API here: [https://apps.twitter.com/](https://apps.twitter.com/)
* Run the following command: `node index.js`

If all went well, you will be able to go to `http://localhost:4444` and see a list of links extracted from the tweets of the account you specified! If things didn't quite go to plan, please feel free to send me an issue.


# Documentation Driven Development (DDD)

Initial Criteria:
* [x] Running `node tweets.js` will fetch all tweets from the [@yourfirstpr](https://twitter.com/yourfirstpr) Twitter account

Next Steps:
* [x] Be able to specify how many tweets you receive back
* [x] Make sure they are standalone tweets, not replies to anything
* [x] Get all the links out of the standalone tweets
* [x] Open an `.HTML` page with all the links from those tweets listed

In the end, I'd like to be able to run a simple script that gets the last X tweets,
extracts the links from those tweets, writes them to an .HTML page where I can open them all
or just open all of them in the browser from the command line. This is so I can
check to see whether Issues I've posted have had successful PR's. If they haven't, 
it means I can schedule to tweet about them again in the near future.

👻
