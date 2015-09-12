module.exports.get = get

function twitterAsync (client, method, path, params) {
  return new Promise(function (resolve, reject) {
    client[method](path, params, function (error, tweets, response) {
      if (error) {
        reject(error)
      } else {
        resolve(tweets)
      }
    })
  })
}

function get (client, path, params) {
  return twitterAsync(client, 'get', path, params)
}
