export const formFieldMixin = {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: [String, Number]
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  },
  computed: {
    // prevent @input conflict with parent $listeners
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  }
}
