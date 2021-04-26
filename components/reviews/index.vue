<template>
  <view class="reviews-container">
    <view class="review" v-for="(item, index) in list" :key="index">
      <view>
        <u-avatar
          :src="$getValue(item, '__metadata.user.__metadata.profile.avatarUrl')"
        ></u-avatar>
      </view>
      <view class="detail">
        <view>{{ $getValue(item, '__metadata.user.__toString') }}</view>
        <view class="content">{{ $getValue(item, '__metadata.content') }}</view>
        <!-- <view v-for="(note, index) in item.notes" :key="index" class="note">
          <span>{{ item.user.__toString }}：</span>
          <span>{{ item.__metadata.content }}</span>
        </view> -->
        <view>
          {{ $u.timeFormat(item.__metadata.modifiedTime, 'yyyy-mm-dd hh:MM') }}
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    list: { type: Array, default: () => [] }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang='scss'>
.reviews-container {
  padding: 20rpx;
  .review {
    padding-top: 20rpx;
    display: grid;
    grid-template-columns: 20% 80%;
    place-content: center;
    place-items: center;
    border-bottom: 1px solid #e0e0e0;
    .detail {
      view:last-child {
        color: #999;
      }
      .content {
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