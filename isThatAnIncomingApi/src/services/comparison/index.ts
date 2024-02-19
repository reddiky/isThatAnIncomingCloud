import getWeather from '../weather/index.js';
import compareWeather from './ai.js';

async function compareLocations(loc1, loc2, survey) {
  const weather1 = await getWeather(loc1.lat, loc1.long)
  const weather2 = await getWeather(loc2.lat, loc2.long)
  const response = await compareWeather(loc1, loc2, weather1, weather2, survey);
  return {     
    location1: loc1,
    weather1,
    location2: loc2,
    weather2,
    prediction: response
  }
}

export default compareLocations
