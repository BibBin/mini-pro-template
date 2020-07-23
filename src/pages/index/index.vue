<template>
  <view class="content">
    <image
      class="logo"
      src="/static/image/logo.png"
    />
    <view class="border-1px-bottom">
      <text class="title">
        环境：{{ version }}
      </text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '首页',
      version: '1111'
    }
  },
  onLoad() {
    this.version = process.env.NODE_ENV
    console.log(process.env)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		 align-items: center;
		justify-content: center;
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
