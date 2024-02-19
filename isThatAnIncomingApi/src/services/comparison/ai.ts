import 'dotenv/config';
import OpenAI from "openai";

const secretKey = process.env.OPEN_API_KEY;
console.log
const openai = new OpenAI({
  apiKey: secretKey,
});
async function compareWeather(loc1, loc2, weather1, weather2, survey) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",   
    messages: [
      { role: "user", content: `I like an average temperature of ${survey.temp} and ${survey.description} days. Will I like ${loc1.name}: ${JSON.stringify(weather1)} or ${loc2.name}: ${JSON.stringify(weather2)} better and why?` },
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