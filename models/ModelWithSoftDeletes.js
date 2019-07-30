import Model from '~/models/Model'

export default class ModelWithSoftDeletes extends Model {
  /**
   * @returns {string}
   */
  static get softDelete() {
    return 'soft_delete'
  }

  /**
   * @returns {string}
   */
  static get forceDelete() {
    return 'force_delete'
  }

  /**
   * Delete the resource.
   * @param {string} type
   * @returns {this}
   */
  async delete(type = this.softDelete) {
    await this.$axios.delete(`${this.$resourceUrl}/${this.$model.id}`)

    return this
  }

  /**
   * Delete the resource.
   * @returns {this}
   */
  softDelete() {
    return this.delete(this.softDelete)
  }

  /**
   * Delete the resource.
   * @returns {this}
   */
  forceDelete() {
    return this.delete(this.forceDelete)
  }
}
