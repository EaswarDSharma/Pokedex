const axios = require('axios');
const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();


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
    attack: " agility",
    speed: " atk",
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
  const pokemon= await poke(message)
  string=getAbilityString(pokemon.abilities)+getStatsString(pokemon.stats)
  console.log("poke datb ois "+string)
  await redisClient.hset("values", message,string)
})
sub.subscribe('insert');