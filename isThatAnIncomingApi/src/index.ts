import { FloatValueNode } from './../node_modules/graphql/language/ast.d';
import { float32 } from './../node_modules/flatbuffers/ts/utils';
import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import resolvers from './resolvers/index.js';
import indexRouter from './routes/index.js';
import weatherRouter from './routes/weather.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const httpServer = http.createServer(app);

interface MyContext {
  token?: String;
}

const typeDefs = `#graphql
  type Geocode {
    name: String,
    admin1: String
    admin2: String
    latitude: String
    longitude: String
  }

  type Current {
    time: String
    temperature: Float
    precipitation: Float
    rain: Float
    showers: Float
    snowfall: Float
    weatherCode: Float
    weatherDescription: String
    cloudCover: Float
    windSpeed: Float
    windGusts: Float
  }

  type Forecast {
    time: String
    weatherCode: Int
    weatherDescription: String
    maxTemp: Float
    minTemp: Float
    precipitationSum: Float
    precipitationLength: Float
    precipitationChance: Float
    windSpeed: Float
    windGusts: Float
  }



  type Weather {
    current: Current
    forecast: [Forecast]
  }

  type Comparison {
    location1: Geocode
    weather1: Weather
    location2: Geocode
    weather2: Weather
    prediction: String
  }

  input GeoInput {
    name: String
    lat: Float
    long: Float
  }
  
  input SurveyInput {
    temp: Float
    description: String
  }

  type Query {
    location(name: String, lat: Float, long: Float): [Geocode]
    weather(lat: Float, long: Float): Weather
    comparison(loc1: GeoInput, loc2: GeoInput, survey: SurveyInput): Comparison
  }
`;



const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/weather',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

app.use('/', indexRouter);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);

export default app;
