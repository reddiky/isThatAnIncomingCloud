export interface MyContext {
  token?: String;
}

export interface Current {
  time: Date;
  temperature: Number;
  precipitation: Number;
  rain: Number;
  showers: Number;
  snowfall: Number;
  weatherCode: Number;
  weatherDescription: String;
  cloudCover: Number;
  windSpeed: Number;
  windGusts: Number;
}

export interface Forecast {
  time: Date;
  weatherCode: Number;
  weatherDescription: String;
  maxTemp: Number;
  minTemp: Number;
  precipitationSum: Number;
  precipitationLength: Number;
  precipitationChance: Number;
  windSpeed: Number;
  windGusts: Number;
}
