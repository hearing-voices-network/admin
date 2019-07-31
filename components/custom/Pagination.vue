<template>
  <gov-body>
    Showing page {{ currentPage }} of {{ totalPages }}
    <gov-link v-if="currentPage > 1" @click="onPrevious">Previous</gov-link>
    <!---->&nbsp;<!---->
    <gov-link v-if="currentPage < totalPages" @click="onNext">Next</gov-link>
  </gov-body>
</template>

<script>
import GovBody from '~/components/gov/Body.vue'
import GovLink from '~/components/gov/Link.vue'

export default {
  components: {
    GovBody,
    GovLink
  },

  props: {
    currentPage: {
      type: Number,
      required: true
    },

    totalPages: {
      type: Number,
      required: true
    }
  },

  methods: {
    onPrevious() {
      this.$emit('previous')
    },

    onNext() {
      this.$emit('next')
    }
  }
}
</script>
