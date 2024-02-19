import './assets/main.css'

import { createApp, provide, h  } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import store from './stores/index'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import apolloProvider  from './apollo/index.js'

const app = createApp({
  render: () => h(App),
})

app.use(store);
app.use(router);
app.use(apolloProvider);

const vuetify = createVuetify({
  components,
  directives,
})

app.use(vuetify)

app.mount('#app')