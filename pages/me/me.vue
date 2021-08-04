<template>
  <view class="me-container">
    <!-- <view class="background">
      <c-solar-system />
    </view> -->
    <view class="user">
      <view class="user-info">
        <u-avatar :src="profile.avatarUrl" @click="getUserProfile"></u-avatar>
        <view class="user-info-name">
          <view v-if="profile.nickname">{{ profile.nickname }}</view>
          <view v-else>
            <u-button type="default" @click="getUserProfile" ripple>
              授权登陆
            </u-button>
          </view>
        </view>
      </view>
      <!-- <view class="user-member" v-if="member">
        <text>{{ member.level.__toString }}</text>
        <text class="user-member-btn" @click="navTo('/pages/top-up/top-up')">
          会员充值
        </text>
      </view>
      <view class="user-member" v-else>
        <text>获取会员专享权益</text>
        <text class="user-member-btn" @click="navTo('/pages/member/member')">
          立即申请
        </text>
      </view> -->
    </view>

    <u-grid :col="3" class="balance">
      <u-grid-item @click="navTo()">
        <view class="balance-number">
          {{ $numberFormat($getValue(user, 'balance.amount')) }}
        </view>
        <view>余额</view>
      </u-grid-item>
      <u-grid-item @click="navTo()">
        <view class="balance-number">
          {{ $numberFormat($getValue(user, 'balance.point')) }}
        </view>
        <view>积分</view>
      </u-grid-item>
      <u-grid-item @click="navTo('me/coupon')">
        <view class="balance-number">
          {{ $numberFormat(couponList.length) }}
        </view>
        <view>优惠券</view>
      </u-grid-item>
    </u-grid>

    <view class="order">
      <u-cell-group>
        <u-cell-item
          title="订单信息"
          value="查看全部订单"
          @click="navToOrder"
        ></u-cell-item>
      </u-cell-group>
      <u-grid :col="5">
        <u-grid-item
          v-for="(item, index) in orderList"
          :key="index"
          @click="navToOrder(item.status)"
        >
        <u-badge v-if="item.count" :count="item.count" :offset="[20, 20]"></u-badge>
          <u-icon :name="item.icon" color="#999" size="56"></u-icon>
          <view>{{ item.name }}</view>
        </u-grid-item>
      </u-grid>
    </view>

    <view class="menu">
      <u-cell-group>
        <u-cell-item
          :title="item.title"
          v-for="(item, index) in menuList"
          :key="index"
          @click="navTo(item.path)"
        >
          <u-icon
            style="margin-right: 10rpx"
            slot="icon"
            size="56"
            :name="item.icon"
            :color="item.color"
          ></u-icon>
        </u-cell-item>
      </u-cell-group>
    </view>
  </view>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      orderList: [
        { name: '待付款', status: '1', icon: 'rmb-circle' },
        { name: '待发货', status: '2', icon: 'gift' },
        { name: '待收货', status: '3', icon: 'car' },
        { name: '待评价', status: '4', icon: 'edit-pen' },
        {
          name: '退款/售后',
          status: '5',
          icon: 'server-man'
        }
      ],
      menuList: [
        { title: '收藏', icon: 'star-fill', color: '#ee883b',path:'me/favorite' },
        // { title: '砍价', icon: 'tags', color: '#9789f7' },
        // { title: '分享', icon: 'zhuanfa', color: '#5fcda2' },
        // { title: '设置', icon: 'setting-fill', color: '#54b4ef' }
      ],
      couponList: []
    }
  },
  computed: {
    ...mapGetters(['profile', 'user'])
  },
  onShow() {
    this.$store.dispatch('cart/setBadge')
    this.getCoupon()
    this.getOrders()
  },
  methods: {
      getOrders() {
      this.$api.get('/api/orders').then((res) => {
        const countList = []
        res.data.forEach((item) => {
          if (item.status > 0) {
            if (!countList[item.status]) countList[item.status] = 0
            countList[item.status] += 1
          }
        })

        this.orderList = this.orderList.map((item, index) => {
          const result = { ...item }
          result.count = countList[index + 1] ?? 0
          return result
        })
      })
    },
    getCoupon() {
      this.$api
        .get('/api/user-coupons', {
          '@filter': `entity.getIsUsed() == false && entity.getExpiredTime() > datetime.get('${new Date().toISOString()}')`
        })
        .then((res) => {
          this.couponList = res.data
        })
    },
    navTo(path) {
      if (!path) {
        uni.showToast({
          title: '功能尚未开通~',
          icon: 'none'
        })
        return
      }
      uni.navigateTo({ url: '/pages/' + path })
    },
    navToOrder(status) {
      let url = '/pages/order/order'
      if (status) url += `?status=${status}`
      uni.navigateTo({ url })
    },
    getUserProfile() {
      uni.getUserProfile({
        desc: '用于完善会员资料',
        success: (res) => {
          const { userInfo } = res
          this.$api.put('/api/user-profile', userInfo).then(() => {
            this.$store.dispatch('user/getUserInformation')
          })
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.me-container {
  min-height: 100vh;
  background-image: linear-gradient(
    to right bottom,
    #d99ec9,
    #f5abba,
    #ffc0b0,
    #ffd8b2,
    #f6f0c4
  );
}
// .background {
//   position: fixed;
//   top: -80vh;
//   left: 0;
//   width: 100%;
//   height: 200vh;
//   z-index: -1;
// }
.user {
  position: relative;
  height: 500rpx;
  &-info {
    padding: 244rpx 40rpx 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-name {
      margin-left: 50rpx;
      color: #fff;
      font-size: 40rpx;
    }
  }
  &-member {
    position: absolute;
    left: 100rpx;
    bottom: 18rpx;
    width: 80%;
    display: flex;
    justify-content: space-between;
    color: #fff;
    &-btn {
      padding: 0 10rpx;
      border: 1px solid #fff;
      border-radius: 100rpx;
    }
  }
}

.balance {
  &-number {
    font-size: 40rpx;
    font-weight: bold;
  }
}

.order {
  margin-top: 20rpx;
  u-icon {
    color: $c-gray;
  }
}

.menu {
  margin-top: 20rpx;
}
</style>