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
              v-for="(item, index) in years"
              :key="index"
              class="g-dp-ctt-wp-item"
            >
              {{ item }}年
            </view>
          </picker-view-column>
          <picker-view-column>
            <view
              v-for="(item, index) in months"
              :key="index"
              class="g-dp-ctt-wp-item"
            >
              {{ dateFormate(item) }}月
            </view>
          </picker-view-column>
          <picker-view-column>
            <view
              v-for="(item, index) in days"
              :key="index"
              class="g-dp-ctt-wp-item"
            >
              {{ dateFormate(item) }}日
            </view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </view>
</template>

<script>
function getNowDate () {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month < 10 ? 0 + '' + month : month
  let day = date.getDate()
  day = day < 10 ? 0 + '' + day : day
  return year + '-' + month + '-' + day
}
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
      default () {
        return getNowDate()
      }
    },
    startDate: {
      type: String,
      default () {
        return '1900-01-01'
      }
    },
    endDate: {
      type: String,
      default () {
        return '2100-12-31'
      }
    }
  },
  data () {
    return {
      pipkerShowFlag: false,
      indicatorStyle: `height: ${uni.upx2px(88)}px;`,

      selectedValue: [],

      years: [],
      months: [],
      days: []
    }
  },
  watch: {
    defaultValue: function (newVal, oldVal) {
      this.init()
    },
    startDate: function (newVal, oldVal) {
      this.init()
    },
    endDate: function (newVal, oldVal) {
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
      this.getYears()
      this.getMonths(this.defaultValue)
      this.getDays(this.defaultValue)
      this.getPickerValue(this.defaultValue)
    },
    /**
     * props值校验
     */
    propsCheck () {
      let flag = false
      let start = new Date(this.startDate).getTime()
      let end = new Date(this.endDate).getTime()
      let now = new Date(this.defaultValue).getTime()
      if (isNaN(start) || isNaN(end) || isNaN(now)) {
        flag = true
      }
      if (start > end || now > end || now < start) {
        flag = true
      }

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
        dateValue: this.getDateValue(this.selectedValue),
        dateValueIndex: this.selectedValue
      })
    },
    onConfirm () {
      this.pipkerShowFlag = false
      this.$emit('onConfirm', {
        dateValue: this.getDateValue(this.selectedValue),
        dateValueIndex: this.selectedValue
      })
    },

    /**
     * picker change时间触发
     * @param {Object} e
     */
    wrapperChange (e) {
      let detailValue = e.detail.value
      let selectedDate =
        this.years[detailValue[0]] +
        '-' +
        this.months[detailValue[1]] +
        '-' +
        this.days[detailValue[2]]
      if (this.selectedValue[0] != detailValue[0]) {
        this.getMonths(selectedDate)
        selectedDate =
          this.years[detailValue[0]] +
          '-' +
          this.months[detailValue[1]] +
          '-' +
          this.days[detailValue[2]]
        this.getDays(selectedDate)
      }
      if (this.selectedValue[1] != detailValue[1]) {
        this.getDays(selectedDate)
      }
      this.selectedValue = detailValue
    },
    /**
     * 获取年
     */
    getYears () {
      let startDateArray = this.startDate.split('-')
      let endDateArray = this.endDate.split('-')
      let startYear = Number(startDateArray[0])
      let endYear = Number(endDateArray[0])

      let newYears = []
      for (let i = startYear; i <= endYear; i++) {
        newYears.push(i)
      }
      this.years = newYears
    },
    /**
     * 获取月
     * @param {Object} nowDate 当前选中的日期（判断当前年有多少个月）
     */
    getMonths (nowDate) {
      let startDateArray = this.startDate.split('-')
      let endDateArray = this.endDate.split('-')
      let nowDateArray = nowDate.split('-')
      let startYear = Number(startDateArray[0])
      let endYear = Number(endDateArray[0])
      let startMonth = Number(startDateArray[1])
      let endMonth = Number(endDateArray[1])

      let newMonths = []
      if (startYear == Number(nowDateArray[0])) {
        if (endYear == Number(nowDateArray[0])) {
          // 起始年份,末尾年份一样时
          for (let i = startMonth; i <= endMonth; i++) {
            newMonths.push(i)
          }
        } else {
          for (let i = startMonth; i <= 12; i++) {
            newMonths.push(i)
          }
        }
      } else if (endYear == Number(nowDateArray[0])) {
        for (let i = 1; i <= endMonth; i++) {
          newMonths.push(i)
        }
      } else {
        for (let i = 1; i <= 12; i++) {
          newMonths.push(i)
        }
      }
      this.months = newMonths
    },
    /**
     * 获取日
     * @param {Object} nowDate 当前选中的日期（判断当前年月有多少个日）
     */
    getDays (nowDate) {
      let startDateArray = this.startDate.split('-')
      let endDateArray = this.endDate.split('-')
      let nowDateArray = nowDate.split('-')
      let startYear = Number(startDateArray[0])
      let endYear = Number(endDateArray[0])
      let startMonth = Number(startDateArray[1])
      let endMonth = Number(endDateArray[1])
      let startDay = Number(startDateArray[2])
      let endDay = Number(endDateArray[2])
      let totalDays = new Date(nowDateArray[0], nowDateArray[1], 0).getDate()

      let newDays = []
      if (
        startYear == Number(nowDateArray[0]) &&
        startMonth == Number(nowDateArray[1])
      ) {
        if (
          endYear == Number(nowDateArray[0]) &&
          endMonth == Number(nowDateArray[1])
        ) {
          for (let i = startDay; i <= endDay; i++) {
            newDays.push(i)
          }
        } else {
          for (let i = startDay; i <= totalDays; i++) {
            newDays.push(i)
          }
        }
      } else if (
        endYear == Number(nowDateArray[0]) &&
        endMonth == Number(nowDateArray[1])
      ) {
        for (let i = 1; i <= endDay; i++) {
          newDays.push(i)
        }
      } else {
        for (let i = 1; i <= totalDays; i++) {
          newDays.push(i)
        }
      }
      this.days = newDays
    },

    dateFormate (val) {
      if (Number(val) > 9) {
        return val
      }
      return '0' + val
    },
    getPickerValue (showDate) {
      let showArray = [0, 0, 0]
      let showDateArray = showDate.split('-')
      this.years.forEach((el, index) => {
        if (Number(showDateArray[0]) == el) {
          showArray[0] = index
          return false
        }
      })
      this.months.forEach((el, index) => {
        if (Number(showDateArray[1]) == el) {
          showArray[1] = index
          return false
        }
      })
      this.days.forEach((el, index) => {
        if (Number(showDateArray[2]) == el) {
          showArray[2] = index
          return false
        }
      })
      this.$nextTick(() => {
        this.selectedValue = showArray
      })
    },
    getDateValue (pikerValue) {
      return (
        this.years[pikerValue[0]] +
        '-' +
        this.dateFormate(this.months[pikerValue[1]]) +
        '-' +
        this.dateFormate(this.days[pikerValue[2]])
      )
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
