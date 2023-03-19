const axios = require('axios');
const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
  
}
async function edfood(query){
  url="temporary";
   await axios.get(`https://api.edamam.com/search?q=${query}&app_id=ac3ed5c4&app_key=32175cda1f892ab16589951f6d022100&from=0&to=1`)
  .then((response) => {
    url=response.data.hits[0].recipe.url;
  })
  .catch((error) => {
  url="not found"});
  return url;
 }
sub.on('message', async (channel, message) => {
  //redisClient.hset('values', message,await fibb(parseInt(message))
  const foodmess=await edfood(message)
  await redisClient.hset('values', message,foodmess)
})
sub.subscribe('insert');
