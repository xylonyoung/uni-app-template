import { ORDER_STATUS } from '@/config/constants'

export default {
  methods: {
    getOrderStatus(status) {
      const result = ORDER_STATUS.find((e) => e.value === status)
      return result ? result.label : '未知状态'
    }
  }
}
