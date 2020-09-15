<template>
  <view class="cus_swiper_wrap">
    <slot />
    <view
      v-if="bannerList.length && dotType == 'theme_one'"
      class="swiper_dots"
    >
      <view
        v-for="(item, idx) in bannerList"
        :key="idx"
        class="swiper_dots_item_wrap"
      >
        <view
          :class="
            current === idx ? 'swiper_dots_item_active' : 'swiper_dots_item'
          "
        />
      </view>
    </view>
    <view
      v-if="bannerList.length && dotType == 'theme_two'"
      class="swiper_dots_theme_two"
    >
      <view class="swiper_dots_item_wrap_theme_two">
        {{ current + 1 }}/{{ bannerList.length }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CustomSwiper',
  props: {
    bannerList: {
      type: Array,
      require: false,
      default: () => []
    },
    dotType: {
      type: String,
      require: false,
      default: 'theme_one'
    },
    current: {
      type: Number,
      require: true,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.cus_swiper_wrap {
  position: relative;
}
.swiper_dots {
  position: absolute;
  bottom: 12rpx;
  width: 100%;
  text-align: center;
  .swiper_dots_item_wrap {
    padding: 0 5rpx;
    display: inline-block;
  }
  .swiper_dots_item {
    width: 20rpx;
    height: 8rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 4rpx;
    opacity: 0.4;
  }
  .swiper_dots_item_active {
    width: 36rpx;
    height: 8rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 4rpx;
  }
}
.swiper_dots_theme_two {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 84rpx;
  height: 40rpx;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 26rpx;
  bottom: 24rpx;
  right: 24rpx;
  .swiper_dots_item_wrap_theme_two {
    font-size: 28rpx;
    font-family: 'taier';
    color: rgba(0, 0, 0, 1);
    line-height: 28rpx;
  }
}
</style>
