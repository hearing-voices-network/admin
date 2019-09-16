import Model from './Model'

export default class Settings extends Model {
  resource() {
    return 'settings'
  }

  async $get() {
    return (await super.$get())[0]
  }

  save() {
    return this.request({
      method: 'PUT',
      url: this.endpoint(),
      data: this
    }).then((response) => {
      const self = Object.assign(this, response.data.data)
      return self
    })
  }
}
