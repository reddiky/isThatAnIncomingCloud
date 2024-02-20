import { fetchWeatherApi } from 'openmeteo';
import { weatherInterpretationCodes } from './interpretationCodes.js';	
import { Current, Forecast } from './interfaces'

// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

async function getWeather(lat, long) {
		const params = {
		latitude: [lat],
		longitude: [long],
		current: "temperature_2m,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m",
		daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max",
		temperature_unit: "fahrenheit",
		wind_speed_unit: "mph",
		precipitation_unit: "inch",
		forecast_days: 5
	};

	const url = 'https://api.open-meteo.com/v1/forecast';
	const responses = await fetchWeatherApi(url, params);
	const response = responses[0];
	const utcOffsetSeconds = response.utcOffsetSeconds();

	const current = response.current()!;
	const daily = response.daily()!;

	return {
		current:  getCurrentWeather(current, utcOffsetSeconds) ,
		forecast:  getForecast(daily, utcOffsetSeconds) 
	}
}

function getCurrentWeather(current: any, utcOffsetSeconds: any): Current {
	return {
    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
		temperature: current.variables(0)!.value(), // Current is only 1 value, therefore `.value()`
    precipitation: current.variables(1)!.value(),
    rain: current.variables(2)!.value(),
    showers: current.variables(3)!.value(),
    snowfall: current.variables(4)!.value(),
    weatherCode: current.variables(5)!.value(),
    weatherDescription: weatherInterpretationCodes[current.variables(5)!.value()],
    cloudCover: current.variables(6)!.value(),
    windSpeed: current.variables(7)!.value(),
    windGusts: current.variables(8)!.value()
	}
}

function getForecast(daily: any, utcOffsetSeconds): Array<Forecast> {
	let forecast = new Array<Forecast>;
	let forecastData = {
			time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
					(t) => new Date((t + utcOffsetSeconds) * 1000)
			),
			weatherCode: daily.variables(0)!.valuesArray()!,
			weatherDescription: daily.variables(0)!.valuesArray()!,
			maxTemp: daily.variables(1)!.valuesArray()!,
			minTemp: daily.variables(2)!.valuesArray()!,
			precipitationSum: daily.variables(3)!.valuesArray()!,
			precipitationLength: daily.variables(4)!.valuesArray()!,
			precipitationChance: daily.variables(5)!.valuesArray()!,
			windSpeed: daily.variables(6)!.valuesArray()!,
			windGusts: daily.variables(7)!.valuesArray()!
	}

	for (let i = 0; i < forecastData.time.length; i ++) {
		forecast.push({
			time: forecastData.time[i],
			weatherCode: forecastData.weatherCode[i],
			weatherDescription: weatherInterpretationCodes[forecastData.weatherDescription[i]],
			maxTemp: forecastData.maxTemp[i],
			minTemp: forecastData.minTemp[i],
			precipitationSum: forecastData.precipitationSum[i],
			precipitationLength: forecastData.precipitationLength[i],
			precipitationChance: forecastData.precipitationChance[i],
			windSpeed: forecastData.windSpeed[i],
			windGusts: forecastData.windGusts[i],
		});
	}
	return forecast;
}

export default getWeather;