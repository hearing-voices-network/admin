<template>
  <gov-body>
    Loading<span v-for="(dot, index) in dots" :key="index">.</span>
  </gov-body>
</template>

<script>
import GovBody from '~/components/gov/Body.vue'

export default {
  components: {
    GovBody
  },

  data() {
    return {
      dots: 0,
      interval: null
    }
  },

  mounted() {
    this.interval = setInterval(() => {
      this.dots === 3 ? (this.dots = 0) : this.dots++
    }, 300)
  },

  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>
