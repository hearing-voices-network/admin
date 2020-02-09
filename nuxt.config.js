import axios from 'axios'
require('dotenv').config()

export default {
  rootDir: __dirname,
  mode: 'universal',
  /*
   ** Environment variables
   */
  env: {
    appName: 'Connecting Voices',
    contactEmail: process.env.CONTACT_EMAIL || 'mailto:hello@example.com',
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
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
  plugins: [
    '~plugins/axios',
    '~plugins/vue-api-query',
    '~plugins/font-awesome',
    '~plugins/showdown'
  ],
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
    // Doc: https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment',
    // Doc: https://github.com/SohoHouse/nuxt-oauth
    'nuxt-oauth'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** OAuth module configuration
   ** See https://github.com/SohoHouse/nuxt-oauth
   */
  oauth: {
    sessionName: 'oauthSession',
    secretKey: process.env.API_OAUTH_SECRET_KEY,
    oauthHost: process.env.API_OAUTH_URL,
    oauthClientID: process.env.API_OAUTH_CLIENT_ID,
    oauthClientSecret: process.env.API_OAUTH_CLIENT_SECRET,
    fetchUser: (accessToken) => {
      const userInfoEndpoint = `${process.env.API_BASE_URL}/admins/me`
      return axios
        .get(userInfoEndpoint, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(({ data: { data: user } }) => {
          return user
        })
    }
  },
  /*
   ** Moment module configuration
   ** See https://github.com/nuxt-community/moment-module
   */
  moment: {
    locales: ['en-gb'],
    defaultLocale: 'gb'
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
