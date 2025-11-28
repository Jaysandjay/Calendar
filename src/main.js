import { createApp, ref } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createAuth0 } from '@auth0/auth0-vue'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
})

app.use(
  createAuth0({
    domain: "jaysandjay.ca.auth0.com",
    clientId: "gHMgVOtzLe7PXhbQqiDQRbhTHkUXcpbM",
    authorizationParams: {
      //redirect_uri: window.location.origin,
      redirect_uri: 'http://localhost:5173',
      audience: "https://jaysandjay.calendarapi.com"

    }
  })
)
app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
