<template>
  <uni-popup ref="popup" type="center" @change="change">
    <view class="m_page">
      <view class="bd_wrap">
        <view class="good_close_wrap" @tap="close">
          <view class="black_close_icon card_close" />
        </view>
        <view class="inner">
          <view class="title">重要提示</view>
          <view class="text">请不要随意更换手机号。</view>
          <view class="text">以后请使用新手机号登录。</view>
          <view class="form">
            <view class="phone_item">
              <view class="q_code">+ 86</view>
              <view class="line">|</view>
              <view class="phone_input_wrap">
                <input class="form_input" placeholder="请填写有效手机号码" />
              </view>
            </view>
            <view class="code_item top_mg">
              <view class="code_item_left">
                <input class="form_input_code" placeholder="6位数字验证码" />
              </view>
              <view v-if="show" class="code_cown" @tap="getCode">
                获取验证码
              </view>
              <view v-else class="code_cown grey"> {{ count }} s </view>
            </view>
            <view class="footer">
              <view class="submit_btn"></view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default {
  components: { uniPopup },
  data () {
    return {
      show: true,
      count: '',
      timer: null
    }
  },
  onLoad () {},
  methods: {
    open () {
      this.$refs['popup'].open()
    },
    close () {
      this.$refs['popup'].close()
    },
    change ({ show }) {
      this.$emit('change', show)
    },
    getCode () {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.good_close_wrap {
  width: 80rpx;
  height: 80rpx;
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 10rpx;
  padding-right: 10rpx;
  display: flex;
  justify-content: flex-end;
}
.card_close {
  width: 68rpx;
  height: 68rpx;
}
.top_mg {
  margin-top: 18rpx;
}
.code_item {
  display: flex;
  justify-content: center;
  align-items: center;
  .code_item_left {
    width: 276rpx;
    height: 50rpx;
    border-bottom: 2rpx solid rgba(0, 0, 0, 0.1);
    margin-right: 30rpx;
    .form_input_code {
      font-size: 29rpx;
      color: rgba(0, 0, 0, 0.25);
      font-weight: 400;
    }
  }
  .code_cown {
    width: 154rpx;
    height: 50rpx;
    background: #d4a864;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24rpx;
    font-family: 'taier';
    color: #ffffff;
  }
  .grey {
    background: rgba(0, 0, 0, 0.25);
  }
}
.phone_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2rpx solid rgba(0, 0, 0, 0.25);
  padding-bottom: 6rpx;
  .q_code {
    font-size: 29rpx;
    color: rgba(0, 0, 0, 0.25);
  }
  .line {
    padding-left: 24rpx;
    color: rgba(0, 0, 0, 0.25);
  }
  .phone_input_wrap {
    padding-left: 24rpx;
    flex: 1;
    .form_input {
      font-weight: 400;
      font-size: 29rpx;
      color: rgba(0, 0, 0, 0.25);
    }
  }
}
.m_page {
}
.bd_wrap {
  width: 660rpx;
  border: 10rpx solid #000000;
  position: relative;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inner {
  background: white;
}
.title {
  font-size: 60rpx;
  font-family: 'taier';
  color: #000000;
  text-align: center;
  margin-bottom: 24rpx;
  margin-top: 68rpx;
}
.text {
  font-size: 24rpx;
  color: rgba(0, 0, 0, 0.85);
  text-align: center;
}
.submit_btn {
  width: 286rpx;
  height: 138rpx;
  background: url('/static/image/common/submit_btn.png');
  background-size: cover;
  background-repeat: no-repeat;
}
.form {
  margin-top: 100rpx;
  margin-bottom: 64rpx;
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 64rpx;
  }
}
</style>
