export default {
  data() {
    return {
      couponList: [],
      userCouponList: []
    }
  },
  methods: {
    getUserCoupons() {
      this.$api.get('/api/user-coupons').then((res) => {
        this.userCouponList = res?.data ?? []
      })
    },
    async receiveCoupon(id) {
      await this.$api.post('/api/user-coupons', { coupon: id })
      await this.getUserCoupons()
      uni.showToast({
        title: '领取成功',
        duration: 2000
      })
    },
    hasCoupon(item) {
      const { id, userLimit } = item
      let count = 0
      this.userCouponList.forEach((e) => {
        if (e.coupon.id === id) {
          count++
        }
      })
      return userLimit === count
    }
  }
}
