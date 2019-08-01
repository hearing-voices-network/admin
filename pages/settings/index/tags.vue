<template>
  <div>
    <gov-heading-m>Tags</gov-heading-m>

    <gov-body>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
      voluptate. Quae eius, fuga excepturi enim quam veritatis quidem nesciunt
      omnis aliquam dicta provident laboriosam alias suscipit? Soluta ducimus
      incidunt delectus?
    </gov-body>

    <gov-list bullet>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>
        Item 3
        <gov-list bullet>
          <li>Item 1</li>
          <li>Item 2</li>
        </gov-list>
      </li>
      <li>Item 4</li>
    </gov-list>
  </div>
</template>

<script>
import GovBody from '~/components/gov/Body.vue'
import GovHeadingM from '~/components/gov/HeadingM.vue'
import GovList from '~/components/gov/List.vue'

export default {
  components: {
    GovBody,
    GovHeadingM,
    GovList
  }
}
</script>
