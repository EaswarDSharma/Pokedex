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
 function getAbilityString(abilities) {
  const abilityNames = abilities.map((ability) => ability.ability.name);
  
  if (abilityNames.length === 1) {
    return `The ability is ${abilityNames[0]}.`;
  } else {
    const lastTwoAbilities = abilityNames.slice(-2).join(" and ");
    return `The abilities are ${abilityNames.slice(0, -2)} ${lastTwoAbilities}.`;
  }
}
function getStatsString(stats) {
  const statNames = {
    hp: "hp",
    attack: "agility",
    speed: "atk",
  };

  const statValues = stats.reduce((result, stat) => {
    if (stat.stat.name in statNames) {
      result[stat.stat.name] = stat.base_stat;
    }
    return result;
  }, {});

  const formattedStats = Object.entries(statValues).map(([name, value]) => `${statNames[name]}: ${value}`);
  return ` Stats are as ${formattedStats}.`;
}

 async function poke(query){
  url="temporary";
 
   await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`)
  .then((response) => {
    url=response.data;
  })
  .catch((error) => {
  url="not found"});
  return url;
 }

sub.on('message', async (channel, message) => {
  //redisClient.hset('values', message,await fibb(parseInt(message))
  const foodmess=await edfood(message)
  const pokemon= await poke(message)
  abilities=getAbilityString(pokemon.abilities)
  stats=getStatsString(pokemon.stats)
  string=getAbilityString(pokemon.abilities)+getStatsString(pokemon.stats)
  console.log(string)
  await redisClient.hset(channel, message,string)
})
sub.subscribe('insert');
