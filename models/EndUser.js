import Model from './Model'

export default class EndUser extends Model {
  resource() {
    return 'end-users'
  }

  _create() {
    const optionalFields = ['country', 'birth_year', 'gender', 'ethnicity']
    const data = Object.assign({}, this)
    for (const field in data) {
      if (optionalFields.includes(field) && data[field] === '') {
        delete data[field]
      }
    }

    if (data.birth_year !== undefined) {
      data.birth_year = parseInt(data.birth_year)
    }

    return this.request({
      method: 'POST',
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
}
