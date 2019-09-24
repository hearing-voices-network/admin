<script>
export default {
  props: {
    tag: {
      type: String,
      required: true
    }
  },

  /* eslint-disable object-shorthand */
  /* eslint-disable prettier/prettier */
  render: function (createElement) {
    return createElement(
      this.tag,
      { attrs: { class: 'govuk-fieldset__heading' } },
      this.$slots.default
    )
  }
  /* eslint-enable object-shorthand */
  /* eslint-enable prettier/prettier */
}
</script>
