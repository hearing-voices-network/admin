import { Model } from 'vue-api-query'

export default function(context, inject) {
  Model.$http = context.$axios
}
