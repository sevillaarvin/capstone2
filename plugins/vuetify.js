import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    // primary: '#121212', // a color that is not in the material colors palette
    // secondary: colors.amber.darken3,
    // accent: colors.grey.darken3,
    // info: colors.teal.lighten1,
    // warning: colors.amber.base,
    // error: colors.deepOrange.accent4,
    // success: colors.green.accent3
    primary: colors.yellow.base,
    secondary: colors.purple.base,
    accent: colors.purple.base,
    error: colors.red.base,
    warning: colors.yellow.base,
    info: colors.blue.base,
    success: colors.green.base,
    light: "#fff",
    dark: "#333",
  },
  options: {
    customProperties: true,
  },
})
