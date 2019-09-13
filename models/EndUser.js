import Model from './Model'

export default class EndUser extends Model {
  resource() {
    return 'end-users'
  }

  get optionalFields() {
    return {
      create: ['country', 'birth_year', 'gender', 'ethnicity'],
      update: ['country', 'birth_year', 'gender', 'ethnicity']
    }
  }

  get fieldParsers() {
    return {
      create: {
        birth_year: 'int'
      },
      update: {
        birth_year: 'int'
      }
    }
  }
}
