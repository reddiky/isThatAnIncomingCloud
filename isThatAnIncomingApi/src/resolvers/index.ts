import getGeocode from '../services/geocoding/index.js'
import getWeather from '../services/weather/index.js'
import compareLocations from '../services/comparison/index.js'

const resolvers = {
  Query: {
    location: (obj, args, context, info) => getGeocode(args.name, args.lat, args.long),
    weather: (obj, args, context, info) => getWeather(args.lat, args.long),
    comparison:  (obj, args, context, info) => compareLocations(args.loc1, args.loc2, args.survey)
  },
};

export default resolvers;