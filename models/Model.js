export default class Model {
  /**
   * @returns {string}
   */
  static get $resourceUrl() {
    return ''
  }

  /**
   *
   * @param {object} axios
   */
  constructor(axios) {
    this.$axios = axios
    this.$model = null
  }

  /**
   * Get all of the resource.
   * @param {object} filters
   * @param {string[]} sorts
   * @returns {array}
   */
  async all(filters = {}, sorts = []) {
    const {
      data: { data }
    } = await this.$axios.get(this.$resourceUrl, {
      ...this.$parseFilters(filters),
      ...this.$parseSorts(sorts)
    })

    return data
  }

  /**
   * Paginate the resource.
   * @param {number} page
   * @param {number} perPage
   * @param {object} filters
   * @param {string[]} sorts
   * @returns {array}
   */
  async paginate(
    page = 1,
    perPage = process.env.defaultPerPage,
    filters = {},
    sorts = []
  ) {
    const {
      data: { data }
    } = await this.$axios.get(this.$resourceUrl, {
      page,
      per_page: perPage,
      ...this.$parseFilters(filters),
      ...this.$parseSorts(sorts)
    })

    return data
  }

  /**
   * Create a resource.
   * @param {object} request
   * @returns {this}
   */
  async create(request) {
    const {
      data: { data }
    } = await this.$axios.post(this.$resourceUrl, request)

    this.$model = data

    return this
  }

  /**
   * Update the resource.
   * @param {object} request
   * @returns {this}
   */
  async update(request) {
    const {
      data: { data }
    } = await this.$axios.put(`${this.$resourceUrl}/${this.$model.id}`, request)

    this.$model = data

    return this
  }

  /**
   * Delete the resource.
   * @returns {this}
   */
  async delete() {
    await this.$axios.delete(`${this.$resourceUrl}/${this.$model.id}`)

    return this
  }

  /**
   * Parse the filters into an object for querying the API.
   * @param {object} filters
   * @returns {object}
   */
  $parseFilters(filters) {
    const parsedFilters = {}

    Object.keys(filters).forEach((key) => {
      parsedFilters[`filter[${key}]`] = filters[key]
    })

    return parsedFilters
  }

  /**
   * Parse the sorts into a string for querying the API.
   * @param {string[]} sorts
   * @returns string
   */
  $parseSorts(sorts) {
    return { sort: sorts.join(',') }
  }
}
