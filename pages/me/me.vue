<template>
  <view>
    <view class="user">
      <view class="user-background">
        <c-solar-system />
      </view>
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
      <view class="user-member" v-if="member">
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
      </view>
    </view>

    <u-grid :col="3" class="balance">
      <u-grid-item @click="navTo('/pages/top-up/top-up')">
        <view class="balance-number">
          {{
            $numberFormat(
              $getValue(this.member, 'user.__metadata.balance.amount')
            )
          }}
        </view>
        <view>余额</view>
      </u-grid-item>
      <u-grid-item>
        <view class="balance-number">
          {{
            $numberFormat(
              $getValue(this.member, 'user.__metadata.balance.point')
            )
          }}
        </view>
        <view>积分</view>
      </u-grid-item>
      <u-grid-item>
        <view class="balance-number">0</view>
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
          <u-icon :name="item.icon" :color="item.color" size="60"></u-icon>
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
            size="50"
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
        { name: '待发货', status: '2', icon: 'bag' },
        { name: '待收货', status: '3', icon: 'car' },
        { name: '待评价', status: '4', icon: 'edit-pen' },
        {
          name: '退款/售后',
          status: '5',
          icon: 'server-man',
        },
      ],
      menuList: [
        { title: '拼团', icon: 'man-add', color: '#ff0000' },
        { title: '砍价', icon: 'tags', color: '#ff6700' },
        { title: '推荐', icon: 'thumb-up', color: '#ff9f00' },
        { title: '账户与安全', icon: 'setting', color: '#51bbe0' },
      ],
    }
  },
  computed: {
    ...mapGetters(['profile', 'user', 'member']),
  },
  onShow() {
    this.$store.dispatch('store/setBadge')
  },
  methods: {
    navTo(path) {
      if (!path) {
        uni.showToast({
          title: '功能维护中~',
          icon: 'none',
        })
        return
      }
      uni.navigateTo({ url: path })
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
        },
      })
    },
  },
}
</script>
<style lang='scss'>
page {
  background-color: $c-background;
}
.user {
  position: relative;
  height: 500rpx;
  &-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &-info {
    padding: 200rpx 40rpx 0;
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