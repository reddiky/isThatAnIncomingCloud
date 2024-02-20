import Geocode from './interfaces'

// TODO: Right now we can only look up by name, the open-meteo api doesn't allow look up by lat / long because
// it assumes that is what you are searching for anyway.  Need a way to resolve this.
async function getGeocode(name1: string, lat: number, long: number): Promise<Array<Geocode>> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${name1}&count=10&language=en&format=json`
    try {
      const response = await fetch(url);
      let data: any;
      data = await response.json();
      const results: Array<Geocode> = new Array();
      for (let i = 0; i < data.results.length; i++) {
        const { name, latitude, longitude, admin1, admin2 } = data.results[i];  
        results.push({ name, latitude, longitude, admin1, admin2 });
  
      }
      return results;
    } catch (error) {
      console.log(error, 'request was aborted');
      return error
    }
  };

export default getGeocode;