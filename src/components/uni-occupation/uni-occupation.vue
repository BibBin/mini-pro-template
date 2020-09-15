<template>
  <view class="gpp-datePicker" @click.stop="open">
    <slot />
    <view
      class="g-dp-mask"
      :class="{ show: pipkerShowFlag }"
      catchtouchmove="true"
      @click.stop="close"
      @touchmove.stop.prevent
    ></view>
    <view
      class="g-dp-content"
      :class="{ show: pipkerShowFlag }"
      catchtouchmove="true"
      @touchmove.stop.prevent
    >
      <view class="g-dp-ctt-head">
        <view class="g-dp-ctt-hd-btn cancel" @click.stop="onCancel"></view>
        <view class="g-dp-ctt-hd-btn confirm" @click.stop="onConfirm"> </view>
      </view>
      <view class="g-dp-ctt-wrapper">
        <picker-view
          :indicator-style="indicatorStyle"
          :value="selectedValue"
          @change="wrapperChange"
        >
          <picker-view-column>
            <view
              v-for="(item, index) in ocuList"
              :key="index"
              class="g-dp-ctt-wp-item"
            >
              {{ item }}
            </view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    themeColor: {
      type: String,
      default () {
        return '#6ba1ff'
      }
    },
    defaultValue: {
      type: String,
      default: '办公室白领'
    },
    ocu: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      pipkerShowFlag: false,
      indicatorStyle: `height: ${uni.upx2px(88)}px;`,
      selectedValue: [],
      ocuList: [
        '办公室白领',
        '办公室金领',
        '学生',
        '从商',
        '服务行业',
        '销售行业',
        '自由职业者',
        '自媒体从业者',
        '医护工作者',
        '教育工作者',
        '机关单位工作者',
        '科技行业工作者',
        '艺术类从业者',
        '影视类从业者',
        '高级技术人才',
        '其他'
      ]
    }
  },
  watch: {
    defaultValue: function (newVal, oldVal) {
      this.init()
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.propsCheck()) {
        return
      }
      if (this.defaultValue) {
        this.selectedValue = [this.defaultValue]
      }
    },
    /**
     * props值校验
     */
    propsCheck () {
      let flag = false
      if (flag) {
        uni.showToast({
          title: '时间选择器参数错误',
          icon: 'none'
        })
      }
      return flag
    },

    open () {
      this.pipkerShowFlag = true
    },
    close () {
      this.pipkerShowFlag = false
    },
    onCancel () {
      this.pipkerShowFlag = false
      this.$emit('onCancel', {
        value: this.getDateValue(this.selectedValue),
        dateValueIndex: this.selectedValue
      })
    },
    onConfirm () {
      this.pipkerShowFlag = false
      this.$emit('onConfirm', {
        value: this.getDateValue(this.selectedValue),
        dateValueIndex: this.selectedValue
      })
    },
    wrapperChange (e) {
      this.selectedValue = e.detail.value
    },
    getDateValue (pikerValue) {
      return this.ocuList[pikerValue[0]]
    }
  }
}
</script>

<style lang="scss">
.gpp-datePicker {
  position: relative;
  z-index: 999;
  .g-dp-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s ease;
  }
  .g-dp-mask.show {
    visibility: visible;
    opacity: 1;
  }
  .g-dp-content {
    position: fixed;
    z-index: 1001;
    bottom: 0;
    right: 0;
    width: 100%;
    transition: all 0.3s ease;
    transform: translateY(100%);
    .g-dp-ctt-head {
      height: 88upx;
      background-color: #ffffff;
      border-bottom: 1px solid #e5e5e5;
      padding: 0 40upx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .g-dp-ctt-hd-btn {
        width: 123rpx;
        height: 53rpx;
      }
      .cancel {
        background: url('/static/image/common/dia_cancel.png');
        background-size: cover;
        background-repeat: no-repeat;
      }
      .confirm {
        background: url('/static/image/common/dia_confirm.png');
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
    .g-dp-ctt-wrapper {
      height: 480upx;
      width: 100%;
      background-color: #ffffff;
      .g-dp-ctt-wp-item {
        text-align: center;
        width: 100%;
        height: 88upx;
        line-height: 88upx;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 30upx;
      }
    }
  }
  .g-dp-content.show {
    transform: translateY(0);
  }
  picker-view-column {
    height: 480rpx !important;
  }
}
</style>
