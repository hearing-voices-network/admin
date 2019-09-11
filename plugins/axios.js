export default function({ $axios, store }) {
  $axios.onRequest((config) => {
    if (store.state.oauth.accessToken) {
      config.headers.common.Authorization = `Bearer ${store.state.oauth.accessToken}`
    }
  })
}
