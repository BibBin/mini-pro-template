<template>
	<view class="content">
		<view>
			<text>状态管理demo</text>
		</view>
		<view>
			<text @click="updateUserName" class="title">点击改名：</text>
			<text class="title">{{info.name}}</text>
		</view>
	</view>
</template>

<script>
import { mapActions,mapMutations,mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters('user', {
			info: 'userInFnfo',
			})
		},
		data() {
			return {
				title: '个人中心'
			}
		},
		onLoad() {
			this.$store.dispatch('user/getUserInfo')
		},
		methods: {
			...mapMutations('user', [
				'setUserInfo'
			]),
			updateUserName(){
				this.setUserInfo({name:'酱紫'});
				this.toast('修改成功！')
			}
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
