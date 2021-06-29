export default {
  data() {
    return {
      couponList: [],
      userCouponList: [],
    }
  },
  created() {
    this.getCoupons()
    this.getUserCoupons()
  },
  methods: {
    getCoupons(){
      this.$api.get('/api/coupons').then((res) => {
        this.couponList = res?.data ?? []
      })
    },
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
    checkCoupon(id){
      this.userCouponList.forEach(e=>{
      })
    }
  }
}
