export const getters = {
  loggedIn(state) {
    return state.oauth.accessToken
  }
}
