import Model from './Model'

export default class EndUser extends Model {
  resource() {
    return 'admins'
  }

  get optionalFields() {
    return {
      create: [],
      update: ['password']
    }
  }
}
