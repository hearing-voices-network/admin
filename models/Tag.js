import Model from './Model'

export default class Tag extends Model {
  resource() {
    return 'tags'
  }

  static async hierarchy() {
    let tags = await this.$get()

    tags.forEach((childTag, index, tags) => {
      const parentTag = tags.find(
        (parentTag) => parentTag.id === childTag.parent_tag_id
      )

      if (parentTag === undefined) {
        return
      }

      if (parentTag.children === undefined) {
        parentTag.children = []
      }

      parentTag.children.push(childTag)
    })

    tags = tags.filter((tag) => tag.parent_tag_id === null)

    return tags
  }
}
