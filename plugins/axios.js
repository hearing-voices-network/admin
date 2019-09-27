export default function({ $axios, store, redirect }) {
  $axios.onRequest((config) => {
    if (store.state.oauth.accessToken) {
      config.headers.common.Authorization = `Bearer ${store.state.oauth.accessToken}`
    }
  })

  $axios.onError((error) => {
    if (error.response && error.response.status === 401) {
      redirect(`/auth/logout?redirect-url=${encodeURIComponent('/')}`)
    }
  })
}
