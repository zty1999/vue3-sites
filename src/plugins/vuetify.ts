// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { App } from 'vue'

const vuetify = createVuetify({
  components,
  directives,
})

export function setUpVuetify(app: App<Element>){
  app.use(vuetify)
}