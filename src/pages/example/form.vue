<template>
  <view class="info">
    <view class="innner">
      <!-- 表单区域 -->
      <view class="form_block">
        <view class="form_item">
          <view class="form_label">
            昵称：
          </view>
          <view class="form_content">
            <input
              v-model="formData.nickName"
              class="form_input"
              placeholder="请输入昵称"
            />
          </view>
        </view>
        <view class="form_item">
          <view class="form_label">
            手机：
          </view>
          <view class="form_content form_content_sp">
            <view>
              <input
                v-model="formData.telNumber"
                class="form_input"
                placeholder="请输入手机号码"
              />
            </view>
            <view
              :style="formData.telNumber ? '' : 'display:none;'"
              class="update_tell"
              @tap="showDatePicker('update-phone-number')"
            >
              更换手机
            </view>
          </view>
        </view>
        <view class="form_item">
          <view class="form_label">
            性别：
          </view>
          <view class="form_content">
            <view class="sex_block">
              <view
                :class="formData.gender == 1 ? 'sex_item active' : 'sex_item'"
                @tap="formData.gender = 1"
              >
                男
              </view>
              <view
                :class="formData.gender == 0 ? 'sex_item active' : 'sex_item'"
                @tap="formData.gender = 0"
              >
                女
              </view>
            </view>
          </view>
        </view>
        <view class="form_item">
          <view class="form_label">
            生日：
          </view>
          <view class="form_content">
            <view
              class="other_select_input"
              @tap="showDatePicker('date-picker')"
            >
              {{ formData.birthDate || '生日当天可能有惊喜哦！' }}
            </view>
          </view>
        </view>
        <view class="form_item">
          <view class="form_label">
            职业：
          </view>
          <view class="form_content">
            <view
              class="other_select_input"
              @tap="showDatePicker('occupation')"
            >
              {{ formData.occupation || '请选择' }}
            </view>
          </view>
        </view>
      </view>
      <!-- 提交按钮 -->
      <view class="footer">
        <view class="submit_btn" @tap="submitForm">提交表单</view>
      </view>
    </view>
    <!-- 生日弹窗 -->
    <date-picker
      ref="date-picker"
      :start-date="startDate"
      :end-date="endDate"
      @onCancel="onCancel"
      @onConfirm="onConfirm"
    />
    <!-- 职业选择弹窗 -->
    <uni-occupation
      ref="occupation"
      @onCancel="onCancel"
      @onConfirm="onConfirmOcu"
    />
    <!-- 更换手机号码 -->
    <update-phoneNumber ref="update-phone-number" />
  </view>
</template>

<script>
import datePicker from '@/components/uni-datePicker/datePicker.vue'
import uniOccupation from '@/components/uni-occupation/uni-occupation.vue'
import updatePhoneNumber from '@/components/UpdatePhoneNumber.vue'
import { mapGetters } from 'vuex'
import { getNowDate } from '@/utils/format.js'
import MinValidate from '@/utils/MinProValidate.js'
export default {
  components: { datePicker, uniOccupation, updatePhoneNumber },
  data () {
    const rules = {
      nickName: {
        required: true
      },
      telNumber: {
        required: true,
        tel: true
      },
      gender: {
        required: true
      },
      birthDate: {
        required: true
      },
      occupation: {
        required: true
      }
    }
    const messages = {
      nickName: {
        required: '请填写昵称'
      },
      telNumber: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },
      gender: {
        required: '请选择性别'
      },
      birthDate: {
        required: '请选择生日'
      },
      occupation: {
        required: '请选择职业'
      }
    }
    this.WxValidate = new MinValidate(rules, messages)
    return {
      startDate: '1990-01-01',
      endDate: getNowDate(),
      formData: {
        nickName: '',
        gender: null,
        birthDate: '',
        occupation: '',
        telNumber: ''
      }
    }
  },
  computed: {
    ...mapGetters('user', {
      userInfo: 'userInfo'
    })
  },
  onLoad () {
    let { nickName, gender, telNumber } = this.userInfo
    console.log(this.userInfo)
    this.formData = {
      ...this.formData,
      nickName: nickName || '',
      gender: gender || 0,
      telNumber: telNumber || ''
    }
  },
  methods: {
    onCancel (e) {
      console.log(e)
    },
    onConfirm (e) {
      this.formData.birthDate = e.dateValue
    },
    onConfirmOcu (e) {
      this.formData.occupation = e.value
    },
    showDatePicker (ref) {
      this.$refs[ref].open()
    },
    submitForm () {
      if (!this.WxValidate.checkForm(this.formData)) {
        const error = this.WxValidate.errorList[0]
        console.log(error)
        return false
      }
      this.toast('接口正在路上')
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  min-height: 100vh;
  background: #eaeaea;
  display: flex;
  justify-content: center;
  padding-top: 100rpx;
}
.head_img {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 55rpx;
}
.img_block {
  width: 194rpx;
  height: 194rpx;
  position: relative;
  .bg_img {
    width: 194rpx;
    height: 194rpx;
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
  }
  .user_bg_wrap {
    width: 140rpx;
    height: 134rpx;
    background: #e4f2f2;
    position: absolute;
    z-index: 1;
    left: 16rpx;
    top: 11rpx;
  }
  .user_img {
    width: 145rpx;
    height: 132rpx;
    overflow: hidden;
    position: absolute;
    z-index: 1;
    left: 13rpx;
    top: 13rpx;
  }
}
.form_block {
  margin-top: 140rpx;
  .form_item {
    display: flex;
    align-items: center;
    margin-bottom: 42rpx;
    .form_label {
      font-size: 48rpx;
      font-family: 'taier';
      color: #000000;
      line-height: 48rpx;
    }
    .form_content {
      position: relative;
      .other_select_input {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 400rpx;
        height: 60rpx;
        background: #ffffff;
        box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.2);
        border-radius: 6rpx;
        font-size: 28rpx;
        font-family: 'taier';
        color: rgba(0, 0, 0, 0.5);
        line-height: 28rpx;
      }
      .form_input {
        height: 56rpx;
        width: 400rpx;
        display: flex;
        font-size: 28rpx;
        font-family: 'taier';
        color: #000000;
        line-height: 28rpx;
        justify-content: center;
        align-items: center;
        border-bottom: 2rpx solid #040000;
      }
    }
    .form_content_sp {
      display: flex;
      width: 400rpx;
      height: 60rpx;
      border-bottom: 2rpx solid #040000;
      .form_input {
        width: 290rpx;
        border-bottom: none;
      }
      .update_tell {
        width: 100rpx;
        height: 40rpx;
        border: 2rpx solid #000000;
        font-size: 20rpx;
        font-family: 'taier';
        color: #000000;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .sex_block {
    display: flex;
    width: 400rpx;
    justify-content: space-between;
    .sex_item {
      width: 180rpx;
      height: 60rpx;
      background: #ffffff;
      box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.2);
      border-radius: 6rpx;
      font-size: 32rpx;
      font-family: 'taier';
      color: #000000;
      line-height: 32rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      &.active {
        background: rgba(35, 36, 34, 1);
        color: #ffffff;
      }
    }
  }
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
