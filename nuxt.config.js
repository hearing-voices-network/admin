require('dotenv').config()

export default {
  mode: 'universal',
  /*
   ** Environment variables
   */
  env: {
    appName: 'Connecting Voices',
    contactEmail: process.env.CONTACT_EMAIL || 'mailto:hello@example.com',
    apiBaseUrl: process.env.API_BASE_URL
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Connecting Voices',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    htmlAttrs: {
      class: 'govuk-template'
    },
    bodyAttrs: {
      class: 'govuk-template__body js-enabled'
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/vue-api-query'],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://auth.nuxtjs.org
    '@nuxtjs/auth',
    // Doc: https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Auth module configuration
   ** See https://auth.nuxtjs.org/guide/setup.html
   */
  auth: {
    strategies: {
      'laravel.passport': {
        url: process.env.API_OAUTH_URL,
        client_id: process.env.API_OAUTH_CLIENT_ID,
        client_secret: process.env.API_OAUTH_CLIENT_SECRET,
        userinfo_endpoint: `${process.env.API_BASE_URL}/admins/me`
      }
    }
  },
  /*
   ** Moment module configuration
   ** See https://github.com/nuxt-community/moment-module
   */
  moment: {
    locales: ['en-gb'],
    defaultLocale: 'en-gb'
  },
  /*
   ** Router configuration
   */
  router: {
    middleware: ['auth']
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
