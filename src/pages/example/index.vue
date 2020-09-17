<template>
  <view class="content">
    <view class="demo_btn" @tap="nav('/pages/example/form')">表单DEMO</view>
    <view class="demo_btn" @tap="nav('/pages/example/qrcodeAndBrcode')">
      二维码/条形码DEMO
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  onLoad () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.demo_btn {
  background: green;
  margin-top: 30rpx;
}
.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
