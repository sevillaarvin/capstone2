const pkg = require('./package')
const bodyParser = require("body-parser")

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: "Club Seville International" || pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      /*
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      */
      {
        rel: 'apple-touch-icon',
        sizes: "180x180",
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        sizes: "32x32",
        type: 'image/png',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        sizes: "16x16",
        type: 'image/png',
        href: '/favicon-16x16.png'
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest'
      },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons|Charm' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  // TODO: Setup Loading
  loading: { color: '#fff' },
  // loading: {color: "#333", failedColor: "#666", height: "4px", duration: 5000}

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    "@/plugins/store-items",
    "@/plugins/utilities",
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    "@nuxtjs/auth"
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: "http://localhost:3000/api",
    // proxy: true
  },

  /*
  proxy: {
    "/api": "http://localhost:3000"
  },
  */

  middleware: [],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },

    watch: ["api", "db"]
  },

  serverMiddleware: [
    bodyParser.json(),
    bodyParser.urlencoded({extended: false}),
    "~/api",
  ],

  vue: {
    config: {
      productionTip: false
    }
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/signin",
            method: "post",
            propertyName: "token"
          },
          logout: false,
          user: {
            url: "/user",
            method: "get",
            propertyName: "user"
          }
        }
      }
    },
    // redirect: false
    redirect: {
    /*
      login: "/signin",
      // user: "/dashboard",
      callback: "/",
    */
      login: "/signin",
      callback: false,
      logout: "/",
      home: "/"
    },
    resetOnError: true,
  }
}
