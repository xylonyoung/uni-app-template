<template>
  <view class="reviews-container">
    <view class="review" v-for="(item, index) in reviewList" :key="index">
      <view>
        <u-avatar
          :src="$getValue(item, 'user.__metadata.profile.avatarUrl')"
        ></u-avatar>
      </view>
      <view class="detail">
        <view class="name">
          {{ $getValue(item, 'user.__metadata.profile.nickname') }}
        </view>
        <view class="content">{{ $getValue(item, 'content') }}</view>
        <!-- <view v-for="(note, index) in item.notes" :key="index" class="note">
          <span>{{ item.user.__toString }}：</span>
          <span>{{ item.__metadata.content }}</span>
        </view> -->
        <view>
          {{ $u.date(item.modifiedTime, 'yyyy-mm-dd hh:MM') }}
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    list: { type: Array, default: () => [] },
    limit: { type: Number, default: 0 }
  },
  data() {
    return {
      reviewList: []
    }
  },
  watch: {
    list: {
      handler(val) {
        if (this.limit === 0) {
          this.reviewList = [...val]
        } else {
          this.reviewList = [...val.slice(0, this.limit)]
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {}
}
</script>
<style lang='scss' scoped>
.reviews-container {
  background-color: #fff;
  .review + .review {
    margin-top: 24rpx;
  }
  .review {
    padding: 24rpx;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    .detail {
      padding-left: 24rpx;
      view:last-child {
        color: #999;
      }
      .name {
        font-weight: bold;
      }
      .content {
        padding: 12rpx 0;
        word-break: break-all;
      }
      .note {
        padding: 10rpx;
        background-color: #f4f8fb;
        span:first-child {
          color: #2979ff;
        }
      }
    }
  }
}
</style>