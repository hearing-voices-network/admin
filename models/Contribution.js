import Model from './Model'

export default class Contribution extends Model {
  resource() {
    return 'contributions'
  }

  approve() {
    return this.request({
      method: 'PUT',
      url: `${this.endpoint()}/approve`
    }).then((response) => {
      const self = Object.assign(this, response.data)
      return self
    })
  }

  reject(changesRequested) {
    return this.request({
      method: 'PUT',
      url: `${this.endpoint()}/reject`,
      data: {
        changes_requested: changesRequested
      }
    }).then((response) => {
      const self = Object.assign(this, response.data)
      return self
    })
  }
}
