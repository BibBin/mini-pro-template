<template>
  <view class="actions">
    <template v-if="!materialsBtn">
      <image
        v-if="number"
        src="/static/image/common/circle_minus.png"
        class="minus-btn"
        @tap="minus"
      />
      <view v-show="number" class="number">
        {{ number }}
      </view>
      <image
        src="/static/image/common/circle_add.png"
        class="add-btn"
        @tap="add"
      />
    </template>
    <template v-else>
      <view class="materials-box">
        <button
          type="primary"
          size="mini"
          class="materials-btn"
          @tap="$emit('materials')"
        >
          选规格
        </button>
        <view v-show="number" class="number-badge">
          <view class="number">
            {{ number }}
          </view>
        </view>
      </view>
    </template>
  </view>
</template>

<script>
export default {
  name: 'Actions',
  props: {
    number: {
      type: Number,
      default: 0
    },
    materialsBtn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    add () {
      this.$emit('add')
    },
    minus () {
      this.$emit('minus')
    }
  }
}
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  align-items: center;
  height: 52rpx;
  .add-btn,
  .minus-btn {
    width: 40rpx;
    height: 40rpx;
    // background: rgba(222, 222, 222, 1);
  }

  .number {
    width: 54rpx;
    height: 52rpx;
    // border-top: 2rpx solid rgba(238, 238, 238, 1);
    // border-bottom: 2rpx solid rgba(238, 238, 238, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: $font-size-lg;
    color: $text-color-base;
  }

  .materials-box {
    position: relative;
    display: flex;

    .materials-btn {
      border-radius: 50rem !important;
    }

    .number-badge {
      z-index: 4;
      position: absolute;
      right: -16rpx;
      top: -14rpx;
      background-color: $bg-color-white;
      border-radius: 100%;
      width: 1.1rem;
      height: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;

      .number {
        font-size: 20rpx;
        flex-shrink: 0;
        background-color: $color-primary;
        color: $bg-color-white;
        width: 0.9rem;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 100%;
      }
    }
  }
}
</style>
