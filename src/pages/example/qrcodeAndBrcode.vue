<template>
  <view class="m_page">
    <view class="member-card">
      <view class="black_close_icon card_close" @tap="close" />
      <view class="title">此会员码可累计积分</view>
      <view class="content">
        <view class="card_text">会员卡号：8564719</view>
        <view class="t_code">
          <uni-barcode
            ref="code39"
            cid="code39"
            :load-make="true"
            format="code39"
            val="FB19A1650-100S"
            @result="code39"
          />
          <!-- <image class="img" /> -->
        </view>
        <view class="qr_code">
          <uni-qrcode
            cid="qrcode"
            text="test"
            background-color="rgba(255,255,255,0)"
            :make-on-load="true"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import uniQrcode from '@/components/uni-qrcode/uni-qrcode'
import uniBarcode from '@/components/uni-barcode/uni-barcode'
export default {
  components: { uniQrcode, uniBarcode },
  data () {
    return {}
  },
  onLoad () {},
  mounted () {},
  methods: {
    code39 (v) {
      // console.log('code39:', v)
    }
  }
}
</script>

<style lang="scss" scoped>
.m_page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.member-card {
  width: 578rpx;
  background: #000000;
  padding: 10rpx;
  position: relative;
  .card_close {
    width: 68rpx;
    height: 68rpx;
    position: absolute;
    right: 0;
    top: -80rpx;
  }
  .title {
    font-size: 42rpx;
    color: #000000;
    line-height: 58rpx;
  }
  .content {
    background: white;
    padding: 24rpx 60rpx 70rpx;
    border-bottom-left-radius: 16rpx;
    border-bottom-right-radius: 16rpx;
    overflow: hidden;
    .card_text {
      font-size: 42rpx;
      color: #000000;
      text-align: center;
      line-height: 58rpx;
    }
    .t_code {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 24rpx;
      margin-bottom: 20rpx;
      .img {
        width: 462rpx;
        height: 222rpx;
        background: grey;
      }
    }
    .qr_code {
      display: flex;
      justify-content: center;
      align-items: center;
      .img {
        width: 360rpx;
        height: 360rpx;
        background: grey;
      }
    }
  }
}
</style>
