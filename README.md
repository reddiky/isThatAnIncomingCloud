# isThatAnIncomingCloud

Here is my entry into the [weatherproj](https://github.com/rachitshukla/weatherproj/wiki/Weather-Dashboard-Application-with-Comparison-Mode) coding challenge. I built a Vue SPA on the frontend and a Node backend. The projects communicate via GraphQL and a working example can be found on the [github page](https://reddiky.github.io/isThatAnIncomingCloud/)

## Technical Justifications

- Vue3
  - I have long history with Vue and historically the template api has made building apps very quick. For this project I began working in the composition, but soon found learning this new framework given the time constraints I had placed on myself was not going well. I backed off and utilized the templates framework for most of my components
- Pinia
  - This is a new state management library recommended by Vue. I have traditionally worked with Redux or Vuex in the past, but Pinia was a joy to work with. This allowed me to save user input without having to interact with the server.
- Vuetify
  - Vuetify is a component library / design system that I used to build the frontend. While my Frontend skills will never, ever impress anyone, Vuetify is a double edged sword. It gives me a lot for free, but also holds me hostage if I don't know the API for a particular component. So much time was lost trying to arrange list items inside of cards.
- Node
  - Given the size of the project I probably should have just interacted with the weather api directly, but that wouldn't have been as much fun
- GraphQL
  - This framework allows both the server and client to know all available options when they are requesting data. It provides a window into the interactions by surfacing a contract in the way that rest endpoints don't.
- OpenAI / ChatGPT
  - I wanted to do something fun to `compare` the two locations. I decided to give ChatGPT all of the information and let it decide which location the user would like better.

## Things to Improve

- ChatGPT
  - I am just dumping the weather response and a couple of statements about user preference into the OpenAI model. I could do a much better job prompt engineering
- Testing
  - I haven't written any tests. I will probably continue to work on this project and that is one of the first things I will do, but given the scope of work I wanted to accomplish, these did not happen
- Accessibility / Responsiveness
  - Vuetify gives this project some of that for free, but I haven't intentionally worked adding / testing
- Latitude and Longitude
  - The [open-meteo](https://open-meteo.com/en/docs/geocoding-api) geocoding API does not take latitude and longitude as an input. I had already built my form fields before realizing that and never bothered to account for that input. So, location name and zip are the only things currently being used to search for a geocode.
- Build Process
  - This was my first time using [Vite](https://vitejs.dev/) for frontend tooling. I am still struggling with images being compiled where they are supposed to be, this is down to my lack of familiarity with the tool. This is also why things like the back button don't work in `production`. I can assure you they work `on my machine` but I need to do more research to understand how Vite handles the code splitting I'm doing in the router.
