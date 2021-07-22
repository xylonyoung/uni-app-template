import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['ORDER_STATUS'])
  },
  methods: {
    getOrderStatus(status) {
      const result = this.ORDER_STATUS.find((e) => e.value === status)
      return result ? result.label : '未知状态'
    }
  }
}
