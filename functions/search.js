const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Retrieve the search query parameter
const query = context.params.q;

// Make a request to the NASA Image and Video Library API
let searchResults = await lib.http.request['@1.1.7'].get({
  url: `https://images-api.nasa.gov/search`,
  queryParams: {
    'q': query
  }
});

// Extract the search results
let results = searchResults.data;

// Filter the items array to keep only image items
let imageItems = results.collection.items.filter(item => {
  return item.data[0].media_type === 'image';
});

// Restructure the filtered items array for the GPT response
// Also return the first 10 items
let structuredItems = imageItems.map(item => {
  return {
    title: item.data[0].title,
    description: item.data[0].description,
    location: item.data[0].location,
    date_created: item.data[0].date_created,
    image_url: item.links[0].href
  };
}).slice(0, 10);

return structuredItems.slice(0, 10);
