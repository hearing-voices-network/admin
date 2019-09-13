import { Model as BaseModel } from 'vue-api-query'

export default class Model extends BaseModel {
  constructor(...attributes) {
    super(...attributes)

    this._submitting = false
    this._errors = {}
  }

  get optionalFields() {
    return {
      create: [],
      update: []
    }
  }

  get fieldParsers() {
    return {
      create: {},
      update: {}
    }
  }

  _create() {
    // Get a copy of the current data.
    const data = Object.assign({}, this)

    // Remove fields.
    for (const field in data) {
      // Remove private fields.
      if (field.charAt(0) === '_') {
        delete data[field]
      }

      // Remove empty optional fields.
      if (
        this.optionalFields.create.includes(field) &&
        [null, ''].includes(data[field])
      ) {
        delete data[field]
        continue
      }

      // Parse any fields.
      if (
        data[field] === undefined &&
        this.fieldParsers.create.hasOwnProperty(field)
      ) {
        switch (this.fieldParsers.create[field]) {
          case 'int':
          case 'integer':
            data[field] = parseInt(data[field])
            break
          case 'bool':
          case 'boolean':
            data[field] = !!data[field]
            break
        }
      }
    }

    // Overridden to use nested data object in response.
    return this.request({
      method: 'POST',
      url: this.endpoint(),
      data
    }).then((response) => {
      const self = Object.assign(this, response.data.data)
      return self
    })
  }

  _update() {
    const data = Object.assign({}, this)
    for (const field in data) {
      if (
        this.optionalFields.update.includes(field) &&
        [null, ''].includes(data[field])
      ) {
        delete data[field]
      }
    }

    // Overridden to use nested data object in response.
    return this.request({
      method: 'PUT',
      url: this.endpoint(),
      data
    }).then((response) => {
      const self = Object.assign(this, response.data.data)
      return self
    })
  }

  softDelete() {
    if (!this.hasId()) {
      throw new Error('This model has a empty ID.')
    }

    return this.request({
      url: this.endpoint(),
      method: 'DELETE',
      data: {
        type: 'soft_delete'
      }
    }).then((response) => response)
  }

  forceDelete() {
    if (!this.hasId()) {
      throw new Error('This model has a empty ID.')
    }

    return this.request({
      url: this.endpoint(),
      method: 'DELETE',
      data: {
        type: 'force_delete'
      }
    }).then((response) => response)
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
