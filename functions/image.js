const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Make a request to the NASA APOD API
let todayImage = await lib.http.request['@1.1.7'].get({
  url: `https://api.nasa.gov/planetary/apod`,
  queryParams: {
    'api_key': process.env.NASA_API_KEY
  }
});

let imageUrl = todayImage.data['url']

return { "image_url": imageUrl };
