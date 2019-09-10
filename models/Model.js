import { Model as BaseModel } from 'vue-api-query'

export default class Model extends BaseModel {
  constructor(...attributes) {
    super(...attributes)

    this._submitting = false
    this._errors = {}
  }

  get submitting() {
    return this._submitting
  }

  baseURL() {
    return process.env.apiBaseUrl
  }

  request(config) {
    this._submitting = true

    return new Promise((resolve, reject) => {
      this.$http
        .request(config)
        .then((response) => {
          // Set the submitting status.
          this._submitting = false

          resolve(response)
        })
        .catch((error) => {
          // Set the submitting status.
          this._submitting = false

          // If the request failed validation.
          if (error.response && error.response.status === 422) {
            this._errors = error.response.data.errors
          }

          reject(error)
        })
    })
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

  hasErrors(...fields) {
    for (const field of fields) {
      if (this._errors.hasOwnProperty(field)) {
        return true
      }
    }

    return false
  }

  anyErrors() {
    return Object.keys(this._errors).length > 0
  }

  getErrors(field) {
    if (this.errors.hasOwnProperty(field)) {
      return this.errors[field]
    }

    return null
  }

  getError(field) {
    const errors = this.getErrors(field)

    return errors === null ? null : errors[0]
  }

  get errors() {
    return this._errors
  }

  clearErrors(...fields) {
    if (fields.length === 0) {
      this._errors = {}

      return
    }

    for (const field of fields) {
      delete this.errors[field]
    }
  }
}
