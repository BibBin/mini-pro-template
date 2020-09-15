<template>
  <!-- 获取一个数组，结构为[{date:'时间',info:'内容内容'}] -->
  <!-- @click事件返回点击标签元素的索引值 第一项为0 -->
  <view class="bg">
    <view class="steps">
      <view v-for="(i, index) in infoList" :key="index" class="steps_item">
        <view class="s_r">
          <!-- <view
            class="line"
            :style="{
              backgroundColor: index != 0 ? backgroundColor : 'rgba(0,0,0,0)'
            }"
          ></view> -->
          <view
            class="index"
            :style="{
              backgroundColor: index != 0 ? backgroundColor : activeColor,
              color: color
            }"
          />

          <view
            class="line"
            :style="{
              backgroundColor:
                index != infoList.length - 1 ? backgroundColor : 'rgba(0,0,0,0)'
            }"
          ></view>
        </view>
        <view class="s_l">
          <view
            class="info_item"
            :class="{ active: index === 0 }"
            @tap="topage(index)"
          >
            <view :style="{ WebkitLineClamp: lineNum != 0 ? lineNum : '' }">
              {{ i.info }}
            </view>
            <text>{{ i.date }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'YSteps',
  props: {
    infoList: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: '#fff'
    },
    backgroundColor: {
      type: String,
      default: '#ff3838'
    },
    activeColor: {
      type: String,
      default: '#D4A864'
    },
    lineNum: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  },
  onLoad (e) {
    //获取列表
  },
  methods: {
    topage (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  margin: 20upx 0;
  display: flex;
}

.steps {
  display: flex;
  flex-direction: column;

  .steps_item {
    display: flex;

    .s_r {
      padding: 0 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;

      .line {
        flex: 1;
        width: 5rpx;
        background-color: #fff;
      }

      .index {
        width: 24rpx;
        height: 24rpx;
        border-radius: 12rpx;
      }
    }

    .s_l {
      display: flex;
      flex-direction: column;
      padding-bottom: 40rpx;

      .info_item {
        margin-right: 30rpx;
        border-radius: 10rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text {
          font-size: 20rpx;
          color: #999999;
        }

        view {
          font-size: 24rpx;
          color: #cccccc;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;

          flex-direction: column;
        }
        &.active {
          view {
            color: #d4a864;
          }
        }
      }

      .info_item:active {
        background-color: #f4f4f4;
      }
    }
  }
}
</style>
