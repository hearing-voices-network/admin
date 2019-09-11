<template>
  <div>
    <gov-heading-m>Tags</gov-heading-m>

    <gov-body>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
      voluptate. Quae eius, fuga excepturi enim quam veritatis quidem nesciunt
      omnis aliquam dicta provident laboriosam alias suscipit? Soluta ducimus
      incidunt delectus?
    </gov-body>

    <gov-button type="button" @click="onAddTag">Add tag</gov-button>

    <!-- Parent tags -->
    <gov-list bullet>
      <li
        v-for="(parentTag, parentIndex) in tags"
        :key="`page::settings::tags::parentTag::${parentIndex}`"
      >
        {{ parentTag.name }}
        <gov-link no-visited-state title="Edit">
          <font-awesome-icon icon="edit" class="custom-icon" title="Edit" />
        </gov-link>

        <!-- Chil tags -->
        <gov-list v-if="parentTag.children !== undefined" bullet>
          <li
            v-for="(childTag, childIndex) in parentTag.children"
            :key="
              `page::settings::tags::parentTag::${parentIndex}::childTag::${childIndex}`
            "
          >
            {{ childTag.name }}
            <gov-link no-visited-state title="Edit">
              <font-awesome-icon icon="edit" class="custom-icon" title="Edit" />
            </gov-link>
          </li>
        </gov-list>
      </li>
    </gov-list>
  </div>
</template>

<script>
import GovBody from '~/components/gov/Body.vue'
import GovButton from '~/components/gov/Button.vue'
import GovHeadingM from '~/components/gov/HeadingM.vue'
import GovLink from '~/components/gov/Link.vue'
import GovList from '~/components/gov/List.vue'
import Tag from '~/models/Tag'

export default {
  authenticated: true,

  components: {
    GovBody,
    GovButton,
    GovHeadingM,
    GovLink,
    GovList
  },

  async asyncData() {
    return {
      tags: await Tag.hierarchy()
    }
  },

  methods: {
    onAddTag() {
      this.$router.push({ name: 'settings-tags-create' })
    }
  }
}
</script>
