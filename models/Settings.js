import Model from './Model'

export default class Settings extends Model {
  resource() {
    return 'settings'
  }

  async $get() {
    return (await super.$get())[0]
  }
}
