import { Model as BaseModel } from 'vue-api-query'

export default class Model extends BaseModel {
  baseURL() {
    return process.env.apiBaseUrl
  }

  request(config) {
    return this.$http.request(config)
  }

  parameterNames() {
    return {
      include: 'include',
      filter: 'filter',
      sort: 'sort',
      fields: 'fields',
      append: 'append',
      page: 'page',
      limit: 'per_page'
    }
  }
}
