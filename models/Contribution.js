import Model from '~/models/ModelsWithSoftDeletes'

export default class Contribution extends Model {
  /**
   * @returns {string}
   */
  static get $resourceUrl() {
    return `${process.env.apiBaseUrl}/contributions`
  }
}
