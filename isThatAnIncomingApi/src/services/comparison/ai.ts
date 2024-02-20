import 'dotenv/config';
import OpenAI from "openai";

const secretKey = process.env.OPEN_API_KEY;
const openai = new OpenAI({
  apiKey: secretKey,
});
async function compareWeather(loc1, loc2, weather1, weather2, survey) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",   
    messages: [
      { role: "user", content: `I strongly like an average temperature of ${survey.temp} and prefer ${survey.description} days. If its below freezing and raining, that counts as snow. Assume all temperatures are in fahrenheit. Will I like ${loc1.name}: ${JSON.stringify(weather1)} or ${loc2.name}: ${JSON.stringify(weather2)} better and why?` },
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    n: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
}

export default compareWeather;